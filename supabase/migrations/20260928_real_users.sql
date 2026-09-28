-- 真人會員、配對與房間在線狀態。
-- 請只在 Supabase SQL Editor 或 Supabase CLI migration 中執行一次。

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '新會員' check (char_length(trim(display_name)) between 2 and 40),
  avatar_url text,
  bio text not null default '' check (char_length(bio) <= 400),
  city text check (char_length(city) <= 80),
  age smallint check (age between 18 and 80),
  occupation text check (char_length(occupation) <= 80),
  height smallint check (height between 120 and 230),
  education text check (char_length(education) <= 40),
  zodiac text check (char_length(zodiac) <= 40),
  interests text[] not null default '{}',
  gender_preference text not null default '不限' check (char_length(gender_preference) <= 40),
  age_min smallint check (age_min between 18 and 80),
  age_max smallint check (age_max between 18 and 80),
  smoking text check (char_length(smoking) <= 40),
  drinking text check (char_length(drinking) <= 40),
  relationship_goal text check (char_length(relationship_goal) <= 80),
  visibility boolean not null default false,
  last_seen_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_age_range check (age_min is null or age_max is null or age_min <= age_max)
);

create index if not exists profiles_visible_recent_idx
  on public.profiles (visibility, last_seen_at desc nulls last);

create table if not exists public.swipes (
  actor_id uuid not null references public.profiles (id) on delete cascade,
  target_id uuid not null references public.profiles (id) on delete cascade,
  action text not null check (action in ('pass', 'like', 'superlike')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (actor_id, target_id),
  constraint swipes_no_self_target check (actor_id <> target_id)
);

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles (id) on delete cascade,
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'blocked')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint friendships_no_self_request check (requester_id <> recipient_id)
);

create unique index if not exists friendships_unique_pair_idx
  on public.friendships (least(requester_id, recipient_id), greatest(requester_id, recipient_id));

create table if not exists public.room_presence (
  session_id text primary key check (char_length(session_id) between 1 and 160),
  user_id uuid not null references public.profiles (id) on delete cascade,
  room_id text not null check (char_length(room_id) between 1 and 80),
  device text not null default 'web' check (device in ('mobile', 'tablet', 'desktop', 'web')),
  voice_joined boolean not null default false,
  voice_muted boolean not null default false,
  updated_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz not null default timezone('utc', now()) + interval '2 minutes',
  constraint room_presence_short_ttl check (expires_at <= updated_at + interval '5 minutes')
);

create index if not exists room_presence_active_idx
  on public.room_presence (expires_at desc, room_id);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles (id) on delete cascade,
  reported_id uuid not null references public.profiles (id) on delete cascade,
  reason text not null check (char_length(trim(reason)) between 3 and 160),
  details text not null default '' check (char_length(details) <= 1200),
  created_at timestamptz not null default timezone('utc', now()),
  constraint reports_no_self_report check (reporter_id <> reported_id)
);

-- Public social feed. A post is only visible when its author has elected to
-- appear in the member directory; private profiles never leak into the feed.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 800),
  tag text not null default '生活' check (char_length(trim(tag)) between 1 and 40),
  image_url text check (image_url is null or char_length(image_url) <= 2000),
  visibility text not null default 'public' check (visibility = 'public'),
  like_count integer not null default 0 check (like_count >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists posts_visible_recent_idx
  on public.posts (visibility, created_at desc);

create table if not exists public.post_likes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (post_id, user_id)
);

create index if not exists post_likes_user_idx
  on public.post_likes (user_id, post_id);

create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 280),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists post_comments_recent_idx
  on public.post_comments (post_id, created_at asc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- A member may keep a private draft profile before verifying email, but cannot
-- enter public discovery or publish social content until Auth confirms email.
create or replace function public.require_confirmed_email_for_public_profile()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if new.visibility = true and not exists (
    select 1
    from auth.users auth_user
    where auth_user.id = new.id and auth_user.email_confirmed_at is not null
  ) then
    raise exception 'Email verification is required before making a profile public';
  end if;
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists require_confirmed_email_for_public_profile on public.profiles;
create trigger require_confirmed_email_for_public_profile
before insert or update of visibility on public.profiles
for each row execute function public.require_confirmed_email_for_public_profile();

drop trigger if exists set_swipes_updated_at on public.swipes;
create trigger set_swipes_updated_at
before update on public.swipes
for each row execute function public.set_updated_at();

drop trigger if exists set_friendships_updated_at on public.friendships;
create trigger set_friendships_updated_at
before update on public.friendships
for each row execute function public.set_updated_at();

drop trigger if exists set_room_presence_updated_at on public.room_presence;
create trigger set_room_presence_updated_at
before update on public.room_presence
for each row execute function public.set_updated_at();

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists set_post_comments_updated_at on public.post_comments;
create trigger set_post_comments_updated_at
before update on public.post_comments
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      nullif(left(trim(new.raw_user_meta_data ->> 'display_name'), 40), ''),
      nullif(left(split_part(coalesce(new.email, ''), '@', 1), 40), ''),
      '新會員'
    ),
    nullif(left(trim(new.raw_user_meta_data ->> 'avatar_url'), 2000), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- A secure RPC records the current user's decision without exposing another
-- member's private swipe history. A mutual positive swipe creates a friendship.
create or replace function public.record_swipe(target_user_id uuid, decision text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_user_id uuid := auth.uid();
  is_mutual boolean := false;
  existing_friendship_id uuid;
begin
  if actor_user_id is null then
    raise exception 'Authentication required';
  end if;

  if target_user_id is null or target_user_id = actor_user_id then
    raise exception 'A different member is required';
  end if;

  if decision not in ('pass', 'like', 'superlike') then
    raise exception 'Invalid decision';
  end if;

  if not exists (
    select 1 from public.profiles
    where id = target_user_id and visibility = true
  ) then
    raise exception 'Profile unavailable';
  end if;

  insert into public.swipes (actor_id, target_id, action)
  values (actor_user_id, target_user_id, decision)
  on conflict (actor_id, target_id)
  do update set action = excluded.action, updated_at = timezone('utc', now());

  if decision in ('like', 'superlike') then
    select exists (
      select 1 from public.swipes
      where actor_id = target_user_id
        and target_id = actor_user_id
        and action in ('like', 'superlike')
    ) into is_mutual;
  end if;

  if is_mutual then
    select id into existing_friendship_id
    from public.friendships
    where least(requester_id, recipient_id) = least(actor_user_id, target_user_id)
      and greatest(requester_id, recipient_id) = greatest(actor_user_id, target_user_id)
    limit 1;

    if existing_friendship_id is null then
      insert into public.friendships (requester_id, recipient_id, status)
      values (actor_user_id, target_user_id, 'accepted');
    else
      update public.friendships
      set status = 'accepted', updated_at = timezone('utc', now())
      where id = existing_friendship_id;
    end if;
  end if;

  return jsonb_build_object('matched', is_mutual);
end;
$$;

-- Likes go through an RPC so a browser can learn its own like state and the
-- aggregate count without being able to browse who liked a particular post.
create or replace function public.toggle_post_like(target_post_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_user_id uuid := auth.uid();
  is_liked boolean := false;
  total_likes integer := 0;
begin
  if actor_user_id is null then
    raise exception 'Authentication required';
  end if;

  perform 1
  from public.posts post
  where post.id = target_post_id
    and (
      post.author_id = actor_user_id
      or (
        post.visibility = 'public'
        and exists (
          select 1 from public.profiles author
          where author.id = post.author_id and author.visibility = true
        )
      )
    )
  for update;

  if not found then
    raise exception 'Post unavailable';
  end if;

  if exists (
    select 1 from public.post_likes
    where post_id = target_post_id and user_id = actor_user_id
  ) then
    delete from public.post_likes
    where post_id = target_post_id and user_id = actor_user_id;

    update public.posts
    set like_count = greatest(like_count - 1, 0)
    where id = target_post_id
    returning like_count into total_likes;
  else
    insert into public.post_likes (post_id, user_id)
    values (target_post_id, actor_user_id);

    update public.posts
    set like_count = like_count + 1
    where id = target_post_id
    returning like_count into total_likes;

    is_liked := true;
  end if;

  return jsonb_build_object('liked', is_liked, 'like_count', total_likes);
end;
$$;

alter table public.profiles enable row level security;
alter table public.swipes enable row level security;
alter table public.friendships enable row level security;
alter table public.room_presence enable row level security;
alter table public.reports enable row level security;
alter table public.posts enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_comments enable row level security;

drop policy if exists "profiles visible to signed-in members" on public.profiles;
create policy "profiles visible to signed-in members"
on public.profiles for select to authenticated
using (visibility or auth.uid() = id);

drop policy if exists "members create their own profile" on public.profiles;
create policy "members create their own profile"
on public.profiles for insert to authenticated
with check (auth.uid() = id);

drop policy if exists "members update their own profile" on public.profiles;
create policy "members update their own profile"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "members read their own swipes" on public.swipes;
create policy "members read their own swipes"
on public.swipes for select to authenticated
using (actor_id = auth.uid());

drop policy if exists "members write their own swipes" on public.swipes;
create policy "members write their own swipes"
on public.swipes for insert to authenticated
with check (actor_id = auth.uid());

drop policy if exists "members update their own swipes" on public.swipes;
create policy "members update their own swipes"
on public.swipes for update to authenticated
using (actor_id = auth.uid())
with check (actor_id = auth.uid());

drop policy if exists "members see their friendships" on public.friendships;
create policy "members see their friendships"
on public.friendships for select to authenticated
using (requester_id = auth.uid() or recipient_id = auth.uid());

drop policy if exists "members can request friendships" on public.friendships;
create policy "members can request friendships"
on public.friendships for insert to authenticated
with check (
  requester_id = auth.uid()
  and status = 'pending'
  and exists (
    select 1 from public.profiles requester
    where requester.id = auth.uid() and requester.visibility = true
  )
  and exists (
    select 1 from public.profiles recipient
    where recipient.id = friendships.recipient_id and recipient.visibility = true
  )
);

drop policy if exists "recipients respond to friendships" on public.friendships;
create policy "recipients respond to friendships"
on public.friendships for update to authenticated
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

drop policy if exists "members can remove their friendships" on public.friendships;
create policy "members can remove their friendships"
on public.friendships for delete to authenticated
using (requester_id = auth.uid() or recipient_id = auth.uid());

drop policy if exists "members see active room presence" on public.room_presence;
create policy "members see active room presence"
on public.room_presence for select to authenticated
using (expires_at > timezone('utc', now()));

drop policy if exists "members create their own room presence" on public.room_presence;
create policy "members create their own room presence"
on public.room_presence for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "members update their own room presence" on public.room_presence;
create policy "members update their own room presence"
on public.room_presence for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "members remove their own room presence" on public.room_presence;
create policy "members remove their own room presence"
on public.room_presence for delete to authenticated
using (user_id = auth.uid());

drop policy if exists "members create reports" on public.reports;
create policy "members create reports"
on public.reports for insert to authenticated
with check (reporter_id = auth.uid());

drop policy if exists "members see their reports" on public.reports;
create policy "members see their reports"
on public.reports for select to authenticated
using (reporter_id = auth.uid());

drop policy if exists "members read visible posts" on public.posts;
create policy "members read visible posts"
on public.posts for select to authenticated
using (
  author_id = auth.uid()
  or (
    visibility = 'public'
    and exists (
      select 1 from public.profiles author
      where author.id = posts.author_id and author.visibility = true
    )
  )
);

drop policy if exists "members create public posts" on public.posts;
create policy "members create public posts"
on public.posts for insert to authenticated
with check (
  author_id = auth.uid()
  and visibility = 'public'
  and exists (
    select 1 from public.profiles author
    where author.id = auth.uid() and author.visibility = true
  )
);

drop policy if exists "members update their posts" on public.posts;
create policy "members update their posts"
on public.posts for update to authenticated
using (author_id = auth.uid())
with check (author_id = auth.uid());

drop policy if exists "members delete their posts" on public.posts;
create policy "members delete their posts"
on public.posts for delete to authenticated
using (author_id = auth.uid());

drop policy if exists "members read their own post likes" on public.post_likes;
create policy "members read their own post likes"
on public.post_likes for select to authenticated
using (user_id = auth.uid());

drop policy if exists "members read visible post comments" on public.post_comments;
create policy "members read visible post comments"
on public.post_comments for select to authenticated
using (
  author_id = auth.uid()
  or exists (
    select 1
    from public.posts post
    where post.id = post_comments.post_id
      and (
        post.author_id = auth.uid()
        or (
          post.visibility = 'public'
          and exists (
            select 1 from public.profiles author
            where author.id = post.author_id and author.visibility = true
          )
        )
      )
  )
);

drop policy if exists "members create comments on visible posts" on public.post_comments;
create policy "members create comments on visible posts"
on public.post_comments for insert to authenticated
with check (
  author_id = auth.uid()
  and exists (
    select 1 from public.profiles author
    where author.id = auth.uid() and author.visibility = true
  )
  and exists (
    select 1
    from public.posts post
    join public.profiles post_author on post_author.id = post.author_id
    where post.id = post_comments.post_id
      and post.visibility = 'public'
      and post_author.visibility = true
  )
);

drop policy if exists "members update their post comments" on public.post_comments;
create policy "members update their post comments"
on public.post_comments for update to authenticated
using (author_id = auth.uid())
with check (author_id = auth.uid());

drop policy if exists "members delete their post comments" on public.post_comments;
create policy "members delete their post comments"
on public.post_comments for delete to authenticated
using (author_id = auth.uid());

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.swipes to authenticated;
grant select, insert, update, delete on public.friendships to authenticated;
grant select, insert, update, delete on public.room_presence to authenticated;
grant select, insert on public.reports to authenticated;
grant select, insert, update, delete on public.posts to authenticated;
grant select on public.post_likes to authenticated;
grant select, insert, update, delete on public.post_comments to authenticated;
grant execute on function public.record_swipe(uuid, text) to authenticated;
grant execute on function public.toggle_post_like(uuid) to authenticated;
