// Auto-generated database types from ZERO Builder
// Do not edit manually
export interface Profiles {
  id: string;
  full_name: string;
  email: string;
  role: string;
  timezone: string;
  photo_url: string | null;
  calendar_provider: string | null;
  calendar_connected: boolean;
  calendar_access_token: string | null;
  calendar_refresh_token: string | null;
  subscription_plan: string;
  subscription_status: string;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfilesInsert {
  full_name: string;
  email: string;
  role?: string;
  timezone?: string;
  photo_url: string | null;
  calendar_provider: string | null;
  calendar_connected?: boolean;
  calendar_access_token: string | null;
  calendar_refresh_token: string | null;
  subscription_plan?: string;
  subscription_status?: string;
  stripe_customer_id: string | null;
}

export interface BookingPages {
  id?: string;
  user_id: string;
  slug: string;
  title: string;
  description: string | null;
  logo_url: string | null;
  theme_color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingPagesInsert {
  user_id: string;
  slug: string;
  title: string;
  description: string | null;
  logo_url: string | null;
  theme_color?: string;
  is_active?: boolean;
}

export interface EventTypes {
  id?: string;
  user_id: string;
  name: string;
  duration_minutes: number;
  description: string | null;
  location: string | null;
  meeting_link: string | null;
  color: string;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
  max_bookings_per_day: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventTypesInsert {
  user_id: string;
  name: string;
  duration_minutes: number;
  description: string | null;
  location: string | null;
  meeting_link: string | null;
  color?: string;
  buffer_before_minutes?: number;
  buffer_after_minutes?: number;
  max_bookings_per_day: number | null;
  is_active?: boolean;
}

export interface AvailabilityWindows {
  id?: string;
  user_id: string;
  event_type_id: string | null;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AvailabilityWindowsInsert {
  user_id: string;
  event_type_id: string | null;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active?: boolean;
}

export interface Bookings {
  id?: string;
  event_type_id: string;
  user_id: string;
  booker_name: string;
  booker_email: string;
  booker_timezone: string;
  scheduled_at: string;
  status: string;
  notes: string | null;
  meeting_link: string | null;
  calendar_event_id: string | null;
  cancellation_reason: string | null;
  reminder_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingsInsert {
  event_type_id: string;
  user_id: string;
  booker_name: string;
  booker_email: string;
  booker_timezone?: string;
  scheduled_at: string;
  status?: string;
  notes: string | null;
  meeting_link: string | null;
  calendar_event_id: string | null;
  cancellation_reason: string | null;
  reminder_sent_at: string | null;
}

export interface TeamMembers {
  id?: string;
  owner_id: string;
  member_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMembersInsert {
  owner_id: string;
  member_id: string;
  is_active?: boolean;
}
