create table public.teachers (
  teacher_id bigint not null,
  teacher_name character varying(64) null,
  constraint teachers_pkey primary key (teacher_id)
) TABLESPACE pg_default;