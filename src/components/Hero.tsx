import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Hero.scss';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <Container className="text-center">
        <h1 className="hero-title">Smart Crop Management</h1>
        <p className="hero-subtitle">
          Optimize your farming with data-driven insights and personalized growing plans
        </p>
        <div className="hero-buttons">
          <Button 
            variant="primary" 
            size="lg" 
            href="#crop-tool"
            className="me-3"
          >
            Get Started
          </Button>
          <Button 
            variant="outline-light" 
            size="lg" 
            href="#about"
          >
            Learn More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Hero; 