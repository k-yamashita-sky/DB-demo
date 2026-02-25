-- =========================================
-- teachers テーブル
-- =========================================
CREATE TABLE public.teachers (
    teacher_id BIGINT NOT NULL,
    teacher_name VARCHAR(64) NULL,
    CONSTRAINT teachers_pkey PRIMARY KEY (teacher_id)
) TABLESPACE pg_default;

INSERT INTO public.teachers (teacher_id, teacher_name) VALUES
    (101, '寺内鞍'),
    (102, '田尻朋美'),
    (103, '内村海凪');

-- =========================================
-- students テーブル
-- =========================================
CREATE TABLE public.students (
    student_id BIGINT NOT NULL,
    student_name VARCHAR(64) NULL,
    CONSTRAINT students_pkey PRIMARY KEY (student_id)
) TABLESPACE pg_default;

INSERT INTO public.students (student_id, student_name) VALUES
    (301, '黒沢春馬'),
    (302, '新垣愛留'),
    (303, '柴崎春花'),
    (304, '森下風凛'),
    (305, '河口菜恵子'),
    (306, '河田咲奈'),
    (307, '織田柚夏'),
    (308, '永田悦子'),
    (309, '相沢吉夫'),
    (310, '吉川伽羅');

-- =========================================
-- courses テーブル
-- =========================================
CREATE TABLE public.courses (
    course_id VARCHAR(16) NOT NULL,
    course_name VARCHAR(128) NOT NULL,
    teacher_id BIGINT NULL,
    CONSTRAINT courses_pkey PRIMARY KEY (course_id),
    CONSTRAINT courses_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id)
) TABLESPACE pg_default;

INSERT INTO public.courses (course_id, course_name, teacher_id) VALUES
    ('1', 'ITのための基礎知識', 101),
    ('2', 'UNIX入門', 102),
    ('3', 'Cプログラミング演習', 101);

-- =========================================
-- student_courses テーブル
-- =========================================
CREATE TABLE public.student_courses (
    course_id VARCHAR(16) NOT NULL,
    student_id BIGINT NOT NULL,
    score INTEGER NULL,
    CONSTRAINT student_courses_pkey PRIMARY KEY (course_id, student_id),
    CONSTRAINT student_courses_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses (course_id),
    CONSTRAINT student_courses_student_id_fkey FOREIGN KEY (student_id) REFERENCES students (student_id)
) TABLESPACE pg_default;

INSERT INTO public.student_courses (course_id, student_id, score) VALUES
    ('1', 301, NULL),
    ('1', 302, NULL),
    ('1', 303, NULL),
    ('1', 306, NULL),
    ('1', 307, NULL),
    ('1', 308, NULL),
    ('1', 310, NULL),
    ('2', 301, NULL),
    ('2', 309, NULL),
    ('3', 310, NULL);