"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewEventTypePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const record: Record<string, unknown> = {
      user_id: user?.id,
      name: formData.get("name"),
      duration_minutes: formData.get("duration_minutes") ? Number(formData.get("duration_minutes")) : null,
      description: formData.get("description"),
      location: formData.get("location"),
      meeting_link: formData.get("meeting_link"),
      color: formData.get("color"),
      buffer_before_minutes: formData.get("buffer_before_minutes") ? Number(formData.get("buffer_before_minutes")) : null,
      buffer_after_minutes: formData.get("buffer_after_minutes") ? Number(formData.get("buffer_after_minutes")) : null,
      max_bookings_per_day: formData.get("max_bookings_per_day") ? Number(formData.get("max_bookings_per_day")) : null,
      is_active: formData.get("is_active") === "on",
    };

    const { error: insertError } = await supabase.from("event_types").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/event-types");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/event-types" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Event Types
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Event Type</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="name" className="label">Name</label>
          <input id="name" name="name" type="text" className="input" placeholder="Enter name" required />
        </div>
        <div>
          <label htmlFor="duration_minutes" className="label">Duration Minutes</label>
          <input id="duration_minutes" name="duration_minutes" type="number" className="input" placeholder="Enter duration minutes" required />
        </div>
        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea id="description" name="description" rows={4} className="input" placeholder="Enter description" />
        </div>
        <div>
          <label htmlFor="location" className="label">Location</label>
          <input id="location" name="location" type="text" className="input" placeholder="Enter location" />
        </div>
        <div>
          <label htmlFor="meeting_link" className="label">Meeting Link</label>
          <input id="meeting_link" name="meeting_link" type="text" className="input" placeholder="Enter meeting link" />
        </div>
        <div>
          <label htmlFor="color" className="label">Color</label>
          <input id="color" name="color" type="text" className="input" placeholder="Enter color" />
        </div>
        <div>
          <label htmlFor="buffer_before_minutes" className="label">Buffer Before Minutes</label>
          <input id="buffer_before_minutes" name="buffer_before_minutes" type="number" className="input" placeholder="Enter buffer before minutes" />
        </div>
        <div>
          <label htmlFor="buffer_after_minutes" className="label">Buffer After Minutes</label>
          <input id="buffer_after_minutes" name="buffer_after_minutes" type="number" className="input" placeholder="Enter buffer after minutes" />
        </div>
        <div>
          <label htmlFor="max_bookings_per_day" className="label">Max Bookings Per Day</label>
          <input id="max_bookings_per_day" name="max_bookings_per_day" type="number" className="input" placeholder="Enter max bookings per day" />
        </div>
        <div className="flex items-center gap-3">
          <input id="is_active" name="is_active" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Is Active</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Event Type"}
          </button>
          <Link href="/dashboard/event-types" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
