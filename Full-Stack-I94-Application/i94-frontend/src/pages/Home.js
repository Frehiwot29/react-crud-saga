import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>I-94 Dashboard</h2>
      <button onClick={() => navigate('/new-i94')}>
        New I-94
      </button>
    </div>
  );
}