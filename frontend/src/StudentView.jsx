import { useEffect, useState } from 'react';
import supabase from './supabase';

export default function StudentView() {
  const [teachers, setTeachers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchTeachers = async () => {
    const { data } = await supabase.from('teachers').select('*');
    setTeachers(data || []);
  };

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*');
    setAllCourses(data || []);
  };

  // 選択された先生の担当科目だけ抽出
  const coursesForSelectedTeacher = allCourses.filter(
    c => c.teacher_id === parseInt(selectedTeacherId)
  );

  return (
    <div>
      <h2>■ 生徒用画面</h2>

      <div>
        <label>先生を選択: </label>
        <select
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
        >
          <option value="">-- 先生を選択 --</option>
          {teachers.map(t => (
            <option key={t.teacher_id} value={t.teacher_id}>
              {t.teacher_name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3>担当科目</h3>
        {selectedTeacherId === '' ? (
          <p>先生を選択すると担当科目が表示されます</p>
        ) : coursesForSelectedTeacher.length === 0 ? (
          <p>担当科目はありません</p>
        ) : (
          <ul>
            {coursesForSelectedTeacher.map(c => (
              <li key={c.course_id}>{c.course_name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}