// Hand-written to match supabase/migrations/*.sql. Regenerate with
// `supabase gen types typescript --local > src/lib/types/database.types.ts`
// once a real project is running, and this file becomes redundant.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "admin" | "customer";
          full_name: string;
          email: string;
          phone: string | null;
          company_name: string | null;
          client_type: "nri" | "family_business" | "sme" | "individual" | null;
          notify_service_updates: boolean;
          notify_announcements: boolean;
          notify_email: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: "admin" | "customer";
          full_name: string;
          email: string;
          phone?: string | null;
          company_name?: string | null;
          client_type?: "nri" | "family_business" | "sme" | "individual" | null;
          notify_service_updates?: boolean;
          notify_announcements?: boolean;
          notify_email?: boolean;
        };
        Update: {
          role?: "admin" | "customer";
          full_name?: string;
          email?: string;
          phone?: string | null;
          company_name?: string | null;
          client_type?: "nri" | "family_business" | "sme" | "individual" | null;
          notify_service_updates?: boolean;
          notify_announcements?: boolean;
          notify_email?: boolean;
        };
        Relationships: [];
      };
      service_catalog: {
        Row: {
          id: string;
          pillar: "nri" | "family_business" | "accounting_cfo";
          category: string;
          name: string;
          description: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          pillar: "nri" | "family_business" | "accounting_cfo";
          category: string;
          name: string;
          description?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: {
          pillar?: "nri" | "family_business" | "accounting_cfo";
          category?: string;
          name?: string;
          description?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
        Relationships: [];
      };
      client_services: {
        Row: {
          id: string;
          client_id: string;
          service_id: string;
          status: "not_started" | "in_progress" | "completed";
          notes: string | null;
          assigned_by: string | null;
          started_at: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          service_id: string;
          status?: "not_started" | "in_progress" | "completed";
          notes?: string | null;
          assigned_by?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          status?: "not_started" | "in_progress" | "completed";
          notes?: string | null;
          started_at?: string | null;
          completed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "client_services_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "client_services_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "service_catalog";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "client_services_assigned_by_fkey";
            columns: ["assigned_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      updates: {
        Row: {
          id: string;
          title: string;
          body: string;
          target_client_id: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body: string;
          target_client_id?: string | null;
          created_by: string;
        };
        Update: {
          title?: string;
          body?: string;
          target_client_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "updates_target_client_id_fkey";
            columns: ["target_client_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "updates_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_enquiries: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          interest:
            | "nri"
            | "family_business"
            | "accounting_cfo"
            | "other"
            | null;
          message: string;
          status: "new" | "contacted" | "closed";
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          interest?:
            | "nri"
            | "family_business"
            | "accounting_cfo"
            | "other"
            | null;
          message: string;
          status?: "new" | "contacted" | "closed";
        };
        Update: {
          status?: "new" | "contacted" | "closed";
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
