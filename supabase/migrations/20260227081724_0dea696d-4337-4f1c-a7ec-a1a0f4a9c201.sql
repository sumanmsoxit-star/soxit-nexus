
-- Tighten public application insert: only allow inserting for open jobs
DROP POLICY "Allow public application insert" ON public.candidates;
CREATE POLICY "Allow public application insert" ON public.candidates 
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.jobs WHERE jobs.job_post_id = candidates.job_post_id AND jobs.status = 'open')
  );

-- Audit logs insert is intentionally permissive (append-only system logging)
-- Keep as is - it's a write-only table with admin-only read access
