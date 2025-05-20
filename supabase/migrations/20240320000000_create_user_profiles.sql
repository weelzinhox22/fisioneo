-- Drop existing objects
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists set_updated_at on public.user_profiles;
drop function if exists public.handle_new_user();
drop function if exists public.handle_updated_at();
drop policy if exists "Users can view their own profile" on public.user_profiles;
drop policy if exists "Users can update their own profile" on public.user_profiles;
drop policy if exists "Users can insert their own profile" on public.user_profiles;

-- Create the user_profiles table if it doesn't exist
drop table if exists public.user_profiles;
create table public.user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null unique,
  username text unique,
  email_preferences jsonb default '{"marketing": false, "updates": true, "security": true}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint fk_user
    foreign key (user_id)
    references auth.users(id)
    on delete cascade
);

-- Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- Create policies
create policy "Enable read access for own profile"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "Enable insert access for own profile"
  on public.user_profiles for insert
  with check (auth.uid() = user_id);

create policy "Enable update access for own profile"
  on public.user_profiles for update
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists user_profiles_user_id_idx on public.user_profiles(user_id);
create index if not exists user_profiles_username_idx on public.user_profiles(username);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for updated_at
create trigger set_updated_at
  before update on public.user_profiles
  for each row
  execute function public.handle_updated_at();

-- Create function to handle new user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (user_id)
  values (new.id);
  return new;
exception
  when others then
    -- Log the error (you can view this in Supabase logs)
    raise log 'Error in handle_new_user: %', SQLERRM;
    -- Still return the new user even if profile creation fails
    return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user(); 