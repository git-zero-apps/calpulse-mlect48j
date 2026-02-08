"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewAvailabilityWindowPage() {
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
      event_type_id: formData.get("event_type_id"),
      day_of_week: formData.get("day_of_week") ? Number(formData.get("day_of_week")) : null,
      start_time: formData.get("start_time"),
      end_time: formData.get("end_time"),
      is_active: formData.get("is_active") === "on",
    };

    const { error: insertError } = await supabase.from("availability_windows").insert(record);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/availability-windows");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/availability-windows" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Availability Windows
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add Availability Window</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="event_type_id" className="label">Event Type Id</label>
          <input id="event_type_id" name="event_type_id" type="text" className="input" placeholder="Enter event type id" />
        </div>
        <div>
          <label htmlFor="day_of_week" className="label">Day Of Week</label>
          <input id="day_of_week" name="day_of_week" type="number" className="input" placeholder="Enter day of week" required />
        </div>
        <div>
          <label htmlFor="start_time" className="label">Start Time</label>
          <input id="start_time" name="start_time" type="text" className="input" placeholder="Enter start time" required />
        </div>
        <div>
          <label htmlFor="end_time" className="label">End Time</label>
          <input id="end_time" name="end_time" type="text" className="input" placeholder="Enter end time" required />
        </div>
        <div className="flex items-center gap-3">
          <input id="is_active" name="is_active" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Is Active</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Create Availability Window"}
          </button>
          <Link href="/dashboard/availability-windows" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
