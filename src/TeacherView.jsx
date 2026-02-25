import { useEffect, useState } from 'react';
import supabase from './supabase';

// 最初にデータベースから全部情報をとってきてフロントで処理する方針
//データ量が少ないのでこっちの方が問合せ遅延がなくてよい　←勉強になった
export default function TeacherView() {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchAllCourses();
  }, []);

  const fetchTeachers = async () => {
    const { data } = await supabase.from('teachers').select('*');
    setTeachers(data || []);
  };

  const fetchAllCourses = async () => {
    const { data } = await supabase.from('courses').select('*');
    setAllCourses(data || []);
    setCourses(data || []);
  };

  const fetchStudentsByCourse = async (courseId) => {
    if (!courseId) {
      setStudents([]);
      return;
    }

    const { data } = await supabase
      .from('student_courses')
      .select('student_id, students(student_name), score')
      .eq('course_id', courseId);

    const list = data.map(sc => ({
      student_id: sc.student_id,
      student_name: sc.students.student_name,
      score: sc.score
    }));
    setStudents(list);
  };

  const handleScoreChange = (studentId, value) => {
    setStudents(prev =>
      prev.map(s => s.student_id === studentId ? { ...s, score: value } : s)
    );
  };

  const handleScoreSave = async (studentId, score) => {
    const { error } = await supabase
      .from('student_courses')
      .update({ score: score ? parseInt(score) : null })
      .eq('course_id', selectedCourseId)
      .eq('student_id', studentId);

    if (error) {
      console.error(error);
      alert('更新に失敗しました');
    } else {
      alert('更新成功');
    }
  };

  const handleTeacherChange = (teacherId) => {
    setSelectedTeacherId(teacherId);
    setSelectedCourseId('');
    setStudents([]);
    if (teacherId) {
      const filtered = allCourses.filter(c => c.teacher_id === parseInt(teacherId));
      setCourses(filtered);
    } else {
      setCourses(allCourses);
    }
  };

  return (
    <div>
      <h2>■ 先生用画面</h2>

      <h3>先生を選択</h3>
      <select
        value={selectedTeacherId}
        onChange={(e) => handleTeacherChange(e.target.value)}
      >
        <option value="">-- 先生を選択 --</option>
        {teachers.map(t => (
          <option key={t.teacher_id} value={t.teacher_id}>{t.teacher_name}</option>
        ))}
      </select>

      {courses.length > 0 && (
        <>
          <h3>科目を選択</h3>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              const courseId = e.target.value;
              setSelectedCourseId(courseId);
              fetchStudentsByCourse(courseId);
            }}
          >
            <option value="">-- 科目を選択 --</option>
            {courses.map(c => (
              <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
            ))}
          </select>
        </>
      )}

      {students.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>生徒名</th>
              <th>点数</th>
              <th>保存</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.student_id}>
                <td>{s.student_name}</td>
                <td>
                  <input
                    type="number"
                    value={s.score ?? ''}
                    onChange={(e) => handleScoreChange(s.student_id, e.target.value)}
                    style={{ width: '60px' }}
                  />
                </td>
                <td>
                  <button onClick={() => handleScoreSave(s.student_id, s.score)}>
                    保存
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}