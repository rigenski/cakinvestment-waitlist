-- Allow anonymous/public inserts into waitlist
create policy if not exists "Allow public insert into waitlist"
on public.waitlist
for insert
to public
with check (true);




