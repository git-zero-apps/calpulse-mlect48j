"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EditAvailabilityWindowPage() {
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
        .from("availability_windows")
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
      day_of_week: formData.get("day_of_week") ? Number(formData.get("day_of_week")) : null,
      start_time: formData.get("start_time"),
      end_time: formData.get("end_time"),
      is_active: formData.get("is_active") === "on",
    };

    const { error: updateError } = await supabase
      .from("availability_windows")
      .update(updates)
      .eq("id", params.id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push("/dashboard/availability-windows");
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
        <p className="text-sm text-red-700">Availability Window not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard/availability-windows" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Availability Windows
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Availability Window</h1>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="event_type_id" className="label">Event Type Id</label>
          <input id="event_type_id" name="event_type_id" type="text" className="input" defaultValue={String(record.event_type_id ?? "")} />
        </div>
        <div>
          <label htmlFor="day_of_week" className="label">Day Of Week</label>
          <input id="day_of_week" name="day_of_week" type="number" className="input" defaultValue={String(record.day_of_week ?? "")} required />
        </div>
        <div>
          <label htmlFor="start_time" className="label">Start Time</label>
          <input id="start_time" name="start_time" type="text" className="input" defaultValue={String(record.start_time ?? "")} required />
        </div>
        <div>
          <label htmlFor="end_time" className="label">End Time</label>
          <input id="end_time" name="end_time" type="text" className="input" defaultValue={String(record.end_time ?? "")} required />
        </div>
        <div className="flex items-center gap-3">
          <input id="is_active" name="is_active" type="checkbox" defaultChecked={!!record.is_active} className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Is Active</label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Saving..." : "Update Availability Window"}
          </button>
          <Link href="/dashboard/availability-windows" className="btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
