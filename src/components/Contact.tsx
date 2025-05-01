import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';
import './Contact.scss';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [validated, setValidated] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // In a real application, you would send the form data to a server here
    console.log('Form data submitted:', formData);
    
    // Show success message
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setValidated(false);
  };

  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        <h2 className="section-title text-center mb-5">Contact Us</h2>
        <Row>
          <Col lg={5} className="mb-4 mb-lg-0">
            <div className="contact-info">
              <h3 className="mb-4">Get In Touch</h3>
              <p>
                Have questions about our services or need personalized assistance with your farming operations?
                Fill out the form and our team will get back to you as soon as possible.
              </p>
              
              <div className="contact-method mb-3">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <div>
                  <h5>Location</h5>
                  <p>123 Farm Road, Himachal Pradesh, India</p>
                </div>
              </div>
              
              <div className="contact-method mb-3">
                <i className="fas fa-envelope contact-icon"></i>
                <div>
                  <h5>Email</h5>
                  <p>not_working@cropsync.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <i className="fas fa-phone-alt contact-icon"></i>
                <div>
                  <h5>Phone</h5>
                  <p>+91 80085580008</p>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <Card className="contact-form-card">
              <Card.Body className="p-4">
                <h4 className="mb-4">Send us a Message</h4>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="contactName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Muthu"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="contactEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="muthu@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="contactSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a subject.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="contactMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a message.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact; 