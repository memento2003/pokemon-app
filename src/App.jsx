import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

const App = () => { // налаштовування зв'язків між файлами
  return <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About/pokemon/:id" element={<About />} /> {/* створює шлях, по якому можна перейти, використовуємо у Link */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

export default App;