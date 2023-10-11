import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';

async function takeScreenshot(setImageData: any) {
  try {
    await window.screenshot.captureScreenShot();
    window.screenshot.screenShotCaptured((event: any, dataURL: any) => {
      setImageData(dataURL);
    });
  } catch (error) {
    console.error('Screenshot capture failed:', error);
  }
}

function Hello() {
  const [imageData, setImageData] = useState('');

  return (
    <div>
      <img width="100%" src={imageData} alt="" />
      <button type="button" onClick={() => takeScreenshot(setImageData)}>
        キャプチャー
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
