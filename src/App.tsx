import React from 'react';
import Navbar from './components/Navbar';
import Weather from './components/Weather';
import CropTool from './components/CropTool';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ToastContainer from './components/common/ToastContainer';
import Hero from './components/Hero';
import './styles/main.scss';

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="weather-widget-container">
          <Weather location="Himalayas" />
        </div>
        <CropTool />
        <About />
        <Contact />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App; 