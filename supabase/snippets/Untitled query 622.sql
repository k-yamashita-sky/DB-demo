create table public.courses (
  course_id character varying(16) not null,
  course_name character varying(128) not null,
  teacher_id bigint null,
  constraint courses_pkey primary key (course_id),
  constraint courses_teacher_id_fkey foreign KEY (teacher_id) references teachers (teacher_id)
) TABLESPACE pg_default;

INSERT INTO "public"."courses" ("course_id", "course_name", "teacher_id") VALUES ('1', 'ITのための基礎知識', '101'), ('2', 'UNIX入門', '102'), ('3', 'Cプログラミング演習', '101');

create table public.student_courses (
  course_id character varying(16) not null,
  student_id bigint not null,
  score integer null,
  constraint student_courses_pkey primary key (course_id, student_id),
  constraint student_courses_course_id_fkey foreign KEY (course_id) references courses (course_id),
  constraint student_courses_student_id_fkey foreign KEY (student_id) references students (student_id)
) TABLESPACE pg_default;

INSERT INTO "public"."student_courses" ("course_id", "student_id", "score") VALUES ('1', '301', '60'), ('1', '302', '30'), ('1', '303', null), ('1', '306', null), ('1', '307', null), ('1', '308', null), ('1', '310', null), ('2', '301', null), ('2', '309', null), ('3', '310', null);

