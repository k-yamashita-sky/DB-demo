create table public.students (
  student_id bigint not null,
  student_name character varying(64) null,
  constraint students_pkey primary key (student_id)
) TABLESPACE pg_default;

INSERT INTO "public"."students" ("student_id", "student_name") VALUES ('301', '黒沢春馬'), ('302', '新垣愛留'), ('303', '柴崎春花'), ('304', '森下風凛'), ('305', '河口菜恵子'), ('306', '河田咲奈'), ('307', '織田柚夏'), ('308', '永田悦子'), ('309', '相沢吉夫'), ('310', '吉川伽羅');