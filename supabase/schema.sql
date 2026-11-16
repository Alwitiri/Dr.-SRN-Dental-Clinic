-- Optional: run this in the Supabase SQL editor to store appointment requests.
-- Then set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the hosting environment.

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  treatment text,
  preferred_date date,
  preferred_time text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'rescheduled', 'cancelled', 'completed')),
  staff_notes text
);

create index if not exists appointment_requests_created_idx on public.appointment_requests (created_at desc);
create index if not exists appointment_requests_status_idx on public.appointment_requests (status);

-- Lock the table down: only the server (service role) can read/write.
alter table public.appointment_requests enable row level security;
