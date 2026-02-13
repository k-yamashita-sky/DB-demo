import { useState } from 'react';
import StudentView from './StudentView';
import TeacherView from './TeacherView';

export default function App() {
  const [mode, setMode] = useState('student');

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>科目管理</h1>

      <button
        onClick={() => setMode(mode === 'student' ? 'teacher' : 'student')}
        style={{ marginBottom: '1rem' }}
      >
        {mode === 'student' ? '先生用画面へ切替' : '生徒用画面へ切替'}
      </button>

      {mode === 'student' ? <StudentView /> : <TeacherView />}
    </div>
  );
}
