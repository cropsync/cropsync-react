import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Card, Tab, Nav, Badge } from 'react-bootstrap';
import { FaSeedling, FaCalendarAlt, FaChartLine, FaBookOpen, FaCloudSun } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { 
  getCropsByCategory, 
  calculateCropTimeline, 
  getCropGuide 
} from '../data/cropData';
import { CropCategory, CropTimeline } from '../types';
import './CropTool.scss';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CropTool = () => {
  const [category, setCategory] = useState<CropCategory>('kharif');
  const [crop, setCrop] = useState('');
  const [startDate, setStartDate] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline');
  const [cropTimeline, setCropTimeline] = useState<CropTimeline | null>(null);

  // Set current date as default
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setStartDate(formattedDate);
  }, []);

  // Generate crop options based on category
  const getCropOptions = useCallback(() => {
    return getCropsByCategory(category).map(crop => ({
      value: crop.id,
      label: crop.name
    }));
  }, [category]);

  // Set initial crop when category changes
  useEffect(() => {
    const crops = getCropOptions();
    if (crops.length > 0) {
      setCrop(crops[0].label);
    }
  }, [category, getCropOptions]);

  const handleCalculate = () => {
    if (!startDate) {
      return;
    }
    
    const timeline = calculateCropTimeline(crop, new Date(startDate));
    setCropTimeline(timeline);
    setShowResult(true);
    setActiveTab('timeline');
  };

  const handleShowGuide = () => {
    setShowGuide(true);
    setActiveTab('guide');
  };

  // Chart data for timeline visualization
  const getChartData = (): ChartData<'pie', number[], string> | null => {
    if (!cropTimeline) return null;
    
    return {
      labels: ['Land Preparation', 'Growing Period', 'Harvest Window'],
      datasets: [
        {
          data: [15, cropTimeline.daysTillHarvest - 30, 15],
          backgroundColor: ['#8bc34a', '#4caf50', '#ff9800'],
          borderColor: ['#7cb342', '#43a047', '#f57c00'],
          borderWidth: 1,
        },
      ],
    };
  };

  const renderTimeline = () => {
    if (!cropTimeline) return null;
    
    return (
      <div className="timeline-container p-3">
        <h5 className="text-primary mb-4">Crop Timeline for {crop}</h5>
        
        <Row>
          <Col md={6}>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-label">Planning Start:</span>
                <span className="timeline-date">{new Date(startDate).toLocaleDateString()}</span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Land Preparation:</span>
                <span className="timeline-date">
                  {cropTimeline.landPreparationDate.toLocaleDateString()}
                </span>
                <div className="timeline-days">
                  {cropTimeline.daysTillLandPreparation} days from now
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Sowing Date:</span>
                <span className="timeline-date">
                  {cropTimeline.sowingDate.toLocaleDateString()}
                </span>
                <div className="timeline-days">
                  {cropTimeline.daysTillSowing} days from now
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Expected Harvest:</span>
                <span className="timeline-date">
                  {cropTimeline.harvestDate.toLocaleDateString()}
                </span>
                <div className="timeline-days">
                  {cropTimeline.daysTillHarvest} days from now
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <div className="chart-container" style={{ width: '250px', height: '250px' }}>
              {getChartData() && <Pie data={getChartData() as ChartData<'pie', number[], string>} />}
            </div>
          </Col>
        </Row>
        
        <div className="mt-4">
          <h6 className="mb-3">Recommended Actions:</h6>
          <ul className="recommended-actions">
            <li>Begin soil testing and preparation soon.</li>
            <li>Order seeds and necessary supplies.</li>
            <li>Plan your irrigation schedule based on local weather patterns.</li>
            <li>Check for optimal fertilizer requirements for {crop}.</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderGuide = () => {
    const cropId = getCropsByCategory(category).find(c => c.name === crop)?.id;
    const guide = cropId ? getCropGuide(cropId) : null;
    
    if (!guide) return (
      <div className="p-3">
        <p>Growing guide for {crop} is not available yet.</p>
      </div>
    );
    
    return (
      <div className="guide-container p-3">
        <h5 className="text-primary mb-4">{guide.title}</h5>
        
        {guide.steps.map((step, index) => (
          <div key={index} className="guide-step mb-4">
            <h6 className="step-title d-flex align-items-center">
              <Badge bg="primary" className="me-2">{index + 1}</Badge>
              {step.title}
            </h6>
            <p className="step-description">{step.description}</p>
            <ul className="step-tasks">
              {step.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="crop-tool" className="crop-tool-section py-5">
      <Container>
        <h2 className="section-title text-center mb-5">
          <FaSeedling className="me-2" />
          Advanced Crop Planning Tool
        </h2>
        <Row>
          <Col lg={5} className="mb-4">
            <Card className="tool-card p-4 h-100">
              <h4 className="mb-4 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-primary" />
                Calculate Growing Timeline
              </h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Crop Category</Form.Label>
                  <Form.Select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CropCategory)}
                  >
                    <option value="kharif">Kharif (Monsoon)</option>
                    <option value="rabi">Rabi (Winter)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Crop</Form.Label>
                  <Form.Select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                  >
                    {getCropOptions().map((cropOption) => (
                      <option key={cropOption.value} value={cropOption.label}>
                        {cropOption.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    onClick={handleCalculate}
                    className="mb-2"
                  >
                    <FaChartLine className="me-2" />
                    Calculate Timeline
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleShowGuide}
                  >
                    <FaBookOpen className="me-2" />
                    View Growing Guide
                  </Button>
                </div>
                
                <div className="weather-tip mt-4">
                  <div className="d-flex align-items-center mb-2">
                    <FaCloudSun className="me-2 text-primary" />
                    <strong>Weather Tip:</strong>
                  </div>
                  <p className="small mb-0">
                    {category === 'kharif' 
                      ? 'Kharif crops thrive during monsoon season with high temperatures and humidity.'
                      : 'Rabi crops perform best in cool temperatures and moderate rainfall.'}
                  </p>
                </div>
              </Form>
            </Card>
          </Col>
          
          <Col lg={7}>
            <Card className="result-card h-100">
              {(showResult || showGuide) && (
                <Tab.Container activeKey={activeTab}>
                  <Card.Header>
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link 
                          eventKey="timeline" 
                          onClick={() => setActiveTab('timeline')}
                          className={!showResult ? 'disabled' : ''}
                        >
                          <FaChartLine className="me-1" /> Timeline
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link 
                          eventKey="guide" 
                          onClick={() => setActiveTab('guide')}
                          className={!showGuide ? 'disabled' : ''}
                        >
                          <FaBookOpen className="me-1" /> Growing Guide
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  <Card.Body>
                    <Tab.Content>
                      <Tab.Pane eventKey="timeline">
                        {showResult && renderTimeline()}
                      </Tab.Pane>
                      <Tab.Pane eventKey="guide">
                        {showGuide && renderGuide()}
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Tab.Container>
              )}
              
              {!showResult && !showGuide && (
                <Card.Body className="d-flex align-items-center justify-content-center text-center">
                  <div className="empty-state p-4">
                    <FaSeedling className="display-1 text-primary mb-3" />
                    <h5>Plan Your Crop Cycle</h5>
                    <p className="text-muted">
                      Select a crop and start date, then calculate timeline or view the growing guide.
                    </p>
                  </div>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CropTool; 