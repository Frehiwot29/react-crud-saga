import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TravelerForm from './components/TravelerForm';
import FloatingTraveButton from './components/FloatingButton';
import Header from './components/Header';
import Home from './components/Home';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      {/* <FloatingTraveButton /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/traveler" element={<TravelerForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
