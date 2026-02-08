"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditBookingPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) setError(error.message);
      else setRecord(data);
      setFetching(false);
    }
    fetchRecord();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    const updates: Record<string, unknown> = {
      event_type_id: formData.get("event_type_id"),
      booker_name: formData.get("booker_name"),
      booker_email: formData.get("booker_email"),
      booker_timezone: formData.get("booker_timezone"),
      scheduled_at: formData.get("scheduled_at"),
      status: formData.get("status"),
      notes: formData.get("notes"),
      meeting_link: formData.get("meeting_link"),
      calendar_event_id: formData.get("calendar_event_id"),
      cancellation_reason: formData.get("cancellation_reason"),
      reminder_sent_at: formData.get("reminder_sent_at"),
    };

    const { error: updateError } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/bookings");
      router.refresh();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-700">Booking not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/bookings" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Bookings
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Booking</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="event_type_id" className="label">Event Type Id</label>
          <input id="event_type_id" name="event_type_id" type="text" className="input" defaultValue={String(record.event_type_id ?? "")} required />
        </div>
        <div>
          <label htmlFor="booker_name" className="label">Booker Name</label>
          <input id="booker_name" name="booker_name" type="text" className="input" defaultValue={String(record.booker_name ?? "")} required />
        </div>
        <div>
          <label htmlFor="booker_email" className="label">Booker Email</label>
          <input id="booker_email" name="booker_email" type="email" className="input" defaultValue={String(record.booker_email ?? "")} required />
        </div>
        <div>
          <label htmlFor="booker_timezone" className="label">Booker Timezone</label>
          <input id="booker_timezone" name="booker_timezone" type="text" className="input" defaultValue={String(record.booker_timezone ?? "")} />
        </div>
        <div>
          <label htmlFor="scheduled_at" className="label">Scheduled At</label>
          <input id="scheduled_at" name="scheduled_at" type="datetime-local" className="input" defaultValue={String(record.scheduled_at ?? "")} required />
        </div>
        <div>
          <label htmlFor="status" className="label">Status</label>
          <input id="status" name="status" type="text" className="input" defaultValue={String(record.status ?? "")} />
        </div>
        <div>
          <label htmlFor="notes" className="label">Notes</label>
          <textarea id="notes" name="notes" rows={4} className="input" defaultValue={String(record.notes ?? "")} />
        </div>
        <div>
          <label htmlFor="meeting_link" className="label">Meeting Link</label>
          <input id="meeting_link" name="meeting_link" type="text" className="input" defaultValue={String(record.meeting_link ?? "")} />
        </div>
        <div>
          <label htmlFor="calendar_event_id" className="label">Calendar Event Id</label>
          <input id="calendar_event_id" name="calendar_event_id" type="text" className="input" defaultValue={String(record.calendar_event_id ?? "")} />
        </div>
        <div>
          <label htmlFor="cancellation_reason" className="label">Cancellation Reason</label>
          <input id="cancellation_reason" name="cancellation_reason" type="text" className="input" defaultValue={String(record.cancellation_reason ?? "")} />
        </div>
        <div>
          <label htmlFor="reminder_sent_at" className="label">Reminder Sent At</label>
          <input id="reminder_sent_at" name="reminder_sent_at" type="datetime-local" className="input" defaultValue={String(record.reminder_sent_at ?? "")} />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Booking"}
          </button>
          <Link href="/dashboard/bookings" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
