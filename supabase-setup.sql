create table einkauf (
  id bigint generated always as identity primary key,
  name text not null,
  erledigt boolean default false,
  von text default '',
  created_at timestamptz default now()
);

create table aufgaben (
  id bigint generated always as identity primary key,
  text text not null,
  person text not null,
  erledigt boolean default false,
  erledigt_von text default '',
  created_at timestamptz default now()
);

create table kalender (
  id bigint generated always as identity primary key,
  datum text not null,
  text text not null,
  von text default '',
  created_at timestamptz default now()
);

create table notizen (
  id bigint generated always as identity primary key,
  titel text not null,
  inhalt text default '',
  farbe text default 'bg-yellow-100',
  von text default '',
  geaendert text default '',
  created_at timestamptz default now()
);

-- Öffentlichen Zugriff erlauben (keine Auth nötig)
alter table einkauf enable row level security;
alter table aufgaben enable row level security;
alter table kalender enable row level security;
alter table notizen enable row level security;

create policy "Alle lesen" on einkauf for select using (true);
create policy "Alle schreiben" on einkauf for insert with check (true);
create policy "Alle aktualisieren" on einkauf for update using (true);
create policy "Alle löschen" on einkauf for delete using (true);

create policy "Alle lesen" on aufgaben for select using (true);
create policy "Alle schreiben" on aufgaben for insert with check (true);
create policy "Alle aktualisieren" on aufgaben for update using (true);
create policy "Alle löschen" on aufgaben for delete using (true);

create policy "Alle lesen" on kalender for select using (true);
create policy "Alle schreiben" on kalender for insert with check (true);
create policy "Alle aktualisieren" on kalender for update using (true);
create policy "Alle löschen" on kalender for delete using (true);

create policy "Alle lesen" on notizen for select using (true);
create policy "Alle schreiben" on notizen for insert with check (true);
create policy "Alle aktualisieren" on notizen for update using (true);
create policy "Alle löschen" on notizen for delete using (true);
