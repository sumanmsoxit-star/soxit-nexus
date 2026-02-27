export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string
          entity_type: string
          id: string
          performed_by: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          performed_by?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          performed_by?: string | null
        }
        Relationships: []
      }
      candidates: {
        Row: {
          ai_score: number | null
          application_status: Database["public"]["Enums"]["application_status"]
          applied_date: string
          candidate_profile_id: string
          certifications: string[] | null
          created_at: string
          current_ctc: string | null
          domain_exposure: string | null
          email: string
          expected_ctc: string | null
          experience: string | null
          id: string
          job_post_id: string
          linkedin_url: string | null
          location: string | null
          name: string
          notice_period: string | null
          phone: string | null
          portfolio_url: string | null
          primary_skills: string[] | null
          recommended_interview_stage:
            | Database["public"]["Enums"]["interview_round"]
            | null
          relevant_experience: string | null
          resume_builder_data: Json | null
          resume_url: string | null
          secondary_skills: string[] | null
          skill_gap_summary: string | null
          updated_at: string
          work_authorization: string | null
        }
        Insert: {
          ai_score?: number | null
          application_status?: Database["public"]["Enums"]["application_status"]
          applied_date?: string
          candidate_profile_id: string
          certifications?: string[] | null
          created_at?: string
          current_ctc?: string | null
          domain_exposure?: string | null
          email: string
          expected_ctc?: string | null
          experience?: string | null
          id?: string
          job_post_id: string
          linkedin_url?: string | null
          location?: string | null
          name: string
          notice_period?: string | null
          phone?: string | null
          portfolio_url?: string | null
          primary_skills?: string[] | null
          recommended_interview_stage?:
            | Database["public"]["Enums"]["interview_round"]
            | null
          relevant_experience?: string | null
          resume_builder_data?: Json | null
          resume_url?: string | null
          secondary_skills?: string[] | null
          skill_gap_summary?: string | null
          updated_at?: string
          work_authorization?: string | null
        }
        Update: {
          ai_score?: number | null
          application_status?: Database["public"]["Enums"]["application_status"]
          applied_date?: string
          candidate_profile_id?: string
          certifications?: string[] | null
          created_at?: string
          current_ctc?: string | null
          domain_exposure?: string | null
          email?: string
          expected_ctc?: string | null
          experience?: string | null
          id?: string
          job_post_id?: string
          linkedin_url?: string | null
          location?: string | null
          name?: string
          notice_period?: string | null
          phone?: string | null
          portfolio_url?: string | null
          primary_skills?: string[] | null
          recommended_interview_stage?:
            | Database["public"]["Enums"]["interview_round"]
            | null
          relevant_experience?: string | null
          resume_builder_data?: Json | null
          resume_url?: string | null
          secondary_skills?: string[] | null
          skill_gap_summary?: string | null
          updated_at?: string
          work_authorization?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["job_post_id"]
          },
        ]
      }
      interviews: {
        Row: {
          candidate_id: string
          created_at: string
          id: string
          interview_date: string | null
          interview_mode: string | null
          interview_round: Database["public"]["Enums"]["interview_round"]
          job_post_id: string
          meeting_link: string | null
          notes: string | null
          panel_assigned: string[] | null
          status: string
          updated_at: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          id?: string
          interview_date?: string | null
          interview_mode?: string | null
          interview_round: Database["public"]["Enums"]["interview_round"]
          job_post_id: string
          meeting_link?: string | null
          notes?: string | null
          panel_assigned?: string[] | null
          status?: string
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          id?: string
          interview_date?: string | null
          interview_mode?: string | null
          interview_round?: Database["public"]["Enums"]["interview_round"]
          job_post_id?: string
          meeting_link?: string | null
          notes?: string | null
          panel_assigned?: string[] | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_job_post_id_fkey"
            columns: ["job_post_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["job_post_id"]
          },
        ]
      }
      jobs: {
        Row: {
          closing_date: string | null
          created_at: string
          created_by: string | null
          ctc_range: string | null
          department: string
          description: string | null
          eligibility: string | null
          employment_type: string
          experience_range: string | null
          id: string
          job_post_id: string
          location: string
          openings_fte: number | null
          openings_intern: number | null
          posting_date: string
          qualifications: string | null
          required_skills: string[] | null
          status: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at: string
        }
        Insert: {
          closing_date?: string | null
          created_at?: string
          created_by?: string | null
          ctc_range?: string | null
          department: string
          description?: string | null
          eligibility?: string | null
          employment_type?: string
          experience_range?: string | null
          id?: string
          job_post_id: string
          location?: string
          openings_fte?: number | null
          openings_intern?: number | null
          posting_date?: string
          qualifications?: string | null
          required_skills?: string[] | null
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at?: string
        }
        Update: {
          closing_date?: string | null
          created_at?: string
          created_by?: string | null
          ctc_range?: string | null
          department?: string
          description?: string | null
          eligibility?: string | null
          employment_type?: string
          experience_range?: string | null
          id?: string
          job_post_id?: string
          location?: string
          openings_fte?: number | null
          openings_intern?: number | null
          posting_date?: string
          qualifications?: string | null
          required_skills?: string[] | null
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_recruiter_or_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "recruiter"
      application_status:
        | "applied"
        | "ai_screened"
        | "shortlisted"
        | "interview_scheduled"
        | "technical_round"
        | "hr_round"
        | "offered"
        | "hired"
        | "rejected"
      interview_round: "screening" | "technical" | "hr" | "final"
      job_status: "open" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "recruiter"],
      application_status: [
        "applied",
        "ai_screened",
        "shortlisted",
        "interview_scheduled",
        "technical_round",
        "hr_round",
        "offered",
        "hired",
        "rejected",
      ],
      interview_round: ["screening", "technical", "hr", "final"],
      job_status: ["open", "closed"],
    },
  },
} as const
