import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row className="py-5">
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="footer-heading mb-3">CropSync</h5>
            <p className="footer-text">
              Smart crop management system helping farmers optimize their growing
              cycles with data-driven insights and personalized growing plans.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
          
          <Col md={4} lg={2} className="mb-4 mb-md-0">
            <h5 className="footer-heading mb-3">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#crop-tool">Crop Tool</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
          
          <Col md={4} lg={3} className="mb-4 mb-md-0">
            <h5 className="footer-heading mb-3">Resources</h5>
            <ul className="footer-links">
              <li><a href="#">Growing Guides</a></li>
              <li><a href="#">Weather Forecasts</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </Col>
          
          <Col md={4} lg={3}>
            <h5 className="footer-heading mb-3">Contact</h5>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Farm Road, Agricultural District, India</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>support@cropsync.com</span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>+91 123 456 7890</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <div className="footer-bottom py-3">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0">
                &copy; {currentYear} CropSync. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <ul className="footer-bottom-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 