-- Create the user_profiles table
create table public.user_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id text unique not null,
  username text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.user_profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on public.user_profiles for select
  using ( auth.uid()::text = user_id or auth.jwt()->>'email' = user_id );

create policy "Users can update their own profile"
  on public.user_profiles for update
  using ( auth.uid()::text = user_id or auth.jwt()->>'email' = user_id );

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  with check ( auth.uid()::text = user_id or auth.jwt()->>'email' = user_id );

-- Create indexes
create index user_profiles_user_id_idx on public.user_profiles(user_id);
create index user_profiles_username_idx on public.user_profiles(username);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger set_updated_at
  before update on public.user_profiles
  for each row
  execute function public.handle_updated_at(); 