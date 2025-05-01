import React, { useState, useEffect } from 'react';
import { Container, Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { BsSun, BsMoon } from 'react-icons/bs';
import './Navbar.scss';
import logo from '../assets/cropsync.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark-theme');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      fixed="top" 
      className={scrolled ? 'navbar scrolled' : 'navbar'}
    >
      <Container>
        <BootstrapNavbar.Brand href="#home" className="navbar-brand">
          <img src={logo} alt="CropSync" className="navbar-logo" height="30" />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#crop-tool">Crop Tool</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Button 
              variant="outline-primary" 
              className="theme-toggle ms-2"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <BsSun /> : <BsMoon />}
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 