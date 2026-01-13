import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Pages
import Home from './pages/Home';
import LayoutSelection from './pages/LayoutSelection';
import Capture from './pages/Capture';
import Preview from './pages/Preview';
import Output from './pages/Output';

import Background from './components/Background';

function App() {
  const [photoData, setPhotoData] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  return (
    <Router>
      <div className="w-full min-h-screen text-white relative">
        
        <Background />

        {/* Page Content */}
        <div className="relative z-10"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layout" element={<LayoutSelection />} />
            <Route path="/capture" element={<Capture setPhotoData={setPhotoData} />} />
            <Route path="/preview" element={<Preview photoData={photoData} setFinalImage={setFinalImage} />} />
            <Route path="/output" element={<Output finalImage={finalImage} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;