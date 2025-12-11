-- Waitlist table for collecting early signups
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

-- Prevent duplicate signups on email/phone
create unique index if not exists waitlist_email_key on public.waitlist (lower(email));
create unique index if not exists waitlist_phone_key on public.waitlist (phone);

alter table public.waitlist enable row level security;

-- Open insert to anyone (adjust as needed)
create policy "Allow inserts to waitlist" on public.waitlist
  for insert
  with check (true);

