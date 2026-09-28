create table if not exists public.direct_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 1000),
  created_at timestamptz not null default timezone('utc', now()),
  read_at timestamptz,
  constraint direct_messages_no_self_message check (sender_id <> recipient_id)
);

create index if not exists direct_messages_sender_created_idx
  on public.direct_messages (sender_id, created_at desc);

create index if not exists direct_messages_recipient_created_idx
  on public.direct_messages (recipient_id, created_at desc);

alter table public.direct_messages enable row level security;

drop policy if exists "members see their own direct messages" on public.direct_messages;
create policy "members see their own direct messages"
on public.direct_messages for select to authenticated
using (
  sender_id = (select auth.uid())
  or recipient_id = (select auth.uid())
);

drop policy if exists "accepted friends can send direct messages" on public.direct_messages;
create policy "accepted friends can send direct messages"
on public.direct_messages for insert to authenticated
with check (
  sender_id = (select auth.uid())
  and recipient_id <> (select auth.uid())
  and exists (
    select 1
    from public.friendships friendship
    where friendship.status = 'accepted'
      and (
        (friendship.requester_id = (select auth.uid()) and friendship.recipient_id = direct_messages.recipient_id)
        or (friendship.recipient_id = (select auth.uid()) and friendship.requester_id = direct_messages.recipient_id)
      )
  )
);

drop policy if exists "recipients can mark direct messages read" on public.direct_messages;
create policy "recipients can mark direct messages read"
on public.direct_messages for update to authenticated
using (
  recipient_id = (select auth.uid())
  and read_at is null
)
with check (
  recipient_id = (select auth.uid())
  and sender_id <> (select auth.uid())
  and read_at is not null
);

drop policy if exists "profiles visible to signed-in members" on public.profiles;
create policy "profiles visible to signed-in members"
on public.profiles for select to authenticated
using (
  visibility
  or (select auth.uid()) = id
  or exists (
    select 1
    from public.friendships friendship
    where friendship.status = 'accepted'
      and (
        (friendship.requester_id = (select auth.uid()) and friendship.recipient_id = profiles.id)
        or (friendship.recipient_id = (select auth.uid()) and friendship.requester_id = profiles.id)
      )
  )
);

grant select, insert on public.direct_messages to authenticated;
grant update (read_at) on public.direct_messages to authenticated;

alter publication supabase_realtime add table public.direct_messages;
