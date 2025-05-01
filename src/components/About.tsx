import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.scss';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section py-5">
      <Container>
        <h2 className="section-title text-center mb-5">About CropSync</h2>
        <Row className="mb-5">
          <Col md={6} className="mb-4 mb-md-0">
            <div className="about-image-container">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Farmer working in field" 
                className="about-image img-fluid rounded"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="about-content">
              <h3 className="mb-4">Our Mission</h3>
              <p>
                CropSync is dedicated to empowering farmers with data-driven insights and personalized 
                growing plans to optimize crop yields and promote sustainable farming practices.
              </p>
              <p>
                We combine traditional farming knowledge with modern technology to help you make 
                better decisions about when to plant, how to care for your crops, and when to 
                harvest for maximum yield.
              </p>
              <p>
                Whether you're managing a small family farm or large agricultural operations, 
                our tools are designed to simplify crop planning and increase productivity.
              </p>
            </div>
          </Col>
        </Row>
        
        <h3 className="text-center mb-4">Why Choose CropSync</h3>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-seedling"></i>
                </div>
                <Card.Title>Personalized Growing Plans</Card.Title>
                <Card.Text>
                  Get custom crop timelines and growing guides tailored to your specific region and climate conditions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-cloud-sun-rain"></i>
                </div>
                <Card.Title>Weather Integration</Card.Title>
                <Card.Text>
                  Access real-time weather data and forecasts to make informed decisions about your farming activities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="feature-card h-100">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-book-open"></i>
                </div>
                <Card.Title>Comprehensive Growing Guides</Card.Title>
                <Card.Text>
                  Access detailed step-by-step guides for various crops, covering everything from land preparation to harvest.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About; 