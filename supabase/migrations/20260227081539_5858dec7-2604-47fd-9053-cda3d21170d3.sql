
-- Create enums
CREATE TYPE public.app_role AS ENUM ('admin', 'recruiter');
CREATE TYPE public.job_status AS ENUM ('open', 'closed');
CREATE TYPE public.application_status AS ENUM ('applied', 'ai_screened', 'shortlisted', 'interview_scheduled', 'technical_round', 'hr_round', 'offered', 'hired', 'rejected');
CREATE TYPE public.interview_round AS ENUM ('screening', 'technical', 'hr', 'final');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_post_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  description TEXT,
  required_skills TEXT[],
  qualifications TEXT,
  eligibility TEXT,
  openings_fte INT DEFAULT 0,
  openings_intern INT DEFAULT 0,
  location TEXT NOT NULL DEFAULT 'Hyderabad',
  experience_range TEXT,
  ctc_range TEXT,
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  status job_status NOT NULL DEFAULT 'open',
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
  closing_date DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Candidates table
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_profile_id TEXT UNIQUE NOT NULL,
  job_post_id TEXT NOT NULL REFERENCES public.jobs(job_post_id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  experience TEXT,
  relevant_experience TEXT,
  current_ctc TEXT,
  expected_ctc TEXT,
  notice_period TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  primary_skills TEXT[],
  secondary_skills TEXT[],
  certifications TEXT[],
  domain_exposure TEXT,
  work_authorization TEXT,
  resume_url TEXT,
  resume_builder_data JSONB,
  ai_score INT,
  skill_gap_summary TEXT,
  recommended_interview_stage interview_round,
  application_status application_status NOT NULL DEFAULT 'applied',
  applied_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Interviews table
CREATE TABLE public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  job_post_id TEXT NOT NULL REFERENCES public.jobs(job_post_id),
  interview_date TIMESTAMPTZ,
  interview_mode TEXT,
  panel_assigned TEXT[],
  interview_round interview_round NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Audit logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  performed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper: is recruiter or admin
CREATE OR REPLACE FUNCTION public.is_recruiter_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role IN ('recruiter', 'admin')
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON public.candidates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON public.interviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Job post ID generation function
CREATE OR REPLACE FUNCTION public.generate_job_post_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  dept_code TEXT;
  year_month TEXT;
  seq INT;
BEGIN
  dept_code := UPPER(REPLACE(NEW.department, ' ', ''));
  year_month := TO_CHAR(CURRENT_DATE, 'YYYYMM');
  SELECT COALESCE(MAX(
    CAST(SPLIT_PART(job_post_id, '-', 4) AS INT)
  ), 0) + 1 INTO seq
  FROM public.jobs
  WHERE job_post_id LIKE 'JOB-' || dept_code || '-' || year_month || '-%';
  NEW.job_post_id := 'JOB-' || dept_code || '-' || year_month || '-' || LPAD(seq::TEXT, 3, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER generate_job_post_id_trigger
  BEFORE INSERT ON public.jobs
  FOR EACH ROW
  WHEN (NEW.job_post_id IS NULL OR NEW.job_post_id = '')
  EXECUTE FUNCTION public.generate_job_post_id();

-- Candidate profile ID generation
CREATE OR REPLACE FUNCTION public.generate_candidate_profile_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.candidate_profile_id := 'CAND-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER generate_candidate_profile_id_trigger
  BEFORE INSERT ON public.candidates
  FOR EACH ROW
  WHEN (NEW.candidate_profile_id IS NULL OR NEW.candidate_profile_id = '')
  EXECUTE FUNCTION public.generate_candidate_profile_id();

-- Auto-close expired jobs
CREATE OR REPLACE FUNCTION public.auto_close_expired_jobs()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  UPDATE public.jobs SET status = 'closed' WHERE closing_date < CURRENT_DATE AND status = 'open';
  RETURN NULL;
END;
$$;

-- RLS POLICIES

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_recruiter_or_admin());

-- User roles
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Jobs: public can read open jobs, recruiters/admins can do everything
CREATE POLICY "Anyone can view open jobs" ON public.jobs FOR SELECT USING (status = 'open');
CREATE POLICY "Recruiters can view all jobs" ON public.jobs FOR SELECT USING (public.is_recruiter_or_admin());
CREATE POLICY "Recruiters can insert jobs" ON public.jobs FOR INSERT WITH CHECK (public.is_recruiter_or_admin());
CREATE POLICY "Recruiters can update jobs" ON public.jobs FOR UPDATE USING (public.is_recruiter_or_admin());
CREATE POLICY "Recruiters can delete jobs" ON public.jobs FOR DELETE USING (public.is_recruiter_or_admin());

-- Candidates: only recruiters/admins can read; insert allowed via edge function (anon insert for applications)
CREATE POLICY "Recruiters can view candidates" ON public.candidates FOR SELECT USING (public.is_recruiter_or_admin());
CREATE POLICY "Recruiters can update candidates" ON public.candidates FOR UPDATE USING (public.is_recruiter_or_admin());
CREATE POLICY "Recruiters can delete candidates" ON public.candidates FOR DELETE USING (public.is_recruiter_or_admin());
CREATE POLICY "Allow public application insert" ON public.candidates FOR INSERT WITH CHECK (true);

-- Interviews
CREATE POLICY "Recruiters can manage interviews" ON public.interviews FOR ALL USING (public.is_recruiter_or_admin());

-- Audit logs
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- Resume storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

CREATE POLICY "Recruiters can view resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes' AND public.is_recruiter_or_admin());
CREATE POLICY "Anyone can upload resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Recruiters can delete resumes" ON storage.objects FOR DELETE USING (bucket_id = 'resumes' AND public.is_recruiter_or_admin());

-- Indexes for performance
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_department ON public.jobs(department);
CREATE INDEX idx_jobs_posting_date ON public.jobs(posting_date DESC);
CREATE INDEX idx_candidates_job_post_id ON public.candidates(job_post_id);
CREATE INDEX idx_candidates_ai_score ON public.candidates(ai_score DESC);
CREATE INDEX idx_candidates_application_status ON public.candidates(application_status);
CREATE INDEX idx_interviews_candidate_id ON public.interviews(candidate_id);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
