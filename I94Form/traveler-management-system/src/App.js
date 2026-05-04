import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TravelerForm from './components/TravelerForm';
import Header from './components/Header';
import Home from './components/Home';
import Announcement from './components/Announcement';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/traveler" element={<TravelerForm />} />
        <Route path="/announcement" element={<Announcement />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
