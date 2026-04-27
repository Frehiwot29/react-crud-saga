import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewI94 from './pages/NewI94';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-i94" element={<NewI94 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
