import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import './App.css';
import BookingForm from './BookingForm'; // Import the new component

// Import all necessary images
import littleLemonLogo from './images/littlelemon_logo.png';
import restaurantFood from './images/restaurantFood.jpg';
import greekSalad from './images/greekSalad.jpg';
import bruschetta from './images/bruschetta.jpg';
import lemonDessert from './images/lemonDessert.jpg';
import restaurantInterior from './images/restaurantInterior.jpg';
import marioAdrian from './images/marioAdrian.jpg';
import smallLogo from './images/small_logo.png';

const LittleLemonApp = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const closeModal = () => {
    setShowReservationModal(false);
    setShowSuccessMessage(false);
  };
  
  const handleSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
        setShowReservationModal(false);
        setShowSuccessMessage(false);
    }, 3000);
  }

  useEffect(() => {
    const body = document.body;
    if (showReservationModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [showReservationModal]);
  
  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app-container">
      <header role="banner">
        <div className="container">
          <nav aria-label="Main Navigation">
            <div className="logo">
              <a href="/" aria-label="Little Lemon home">
                <img src={littleLemonLogo} alt="Little Lemon Restaurant Logo" />
              </a>
            </div>
            <ul className={`nav-links ${mobileMenuOpen ? 'show' : ''}`} id="navLinks" role="menu">
              <li role="none"><a href="#" role="menuitem">Home</a></li>
              <li role="none"><a href="#" role="menuitem">About</a></li>
              <li role="none"><a href="#" role="menuitem">Menu</a></li>
              <li role="none"><a href="#" role="menuitem">Reservations</a></li>
              <li role="none"><a href="#" role="menuitem">Order Online</a></li>
              <li role="none"><a href="#" role="menuitem">Login</a></li>
            </ul>
            <button
              className="mobile-menu"
              id="mobileMenu"
              aria-label="Open main menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="navLinks"
              onClick={handleMobileMenuClick}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 id="hero-heading">Little Lemon</h1>
                <h2>Chicago</h2>
                <p>We are a family-owned Mediterranean restaurant dedicated to traditional recipes with a modern twist. We take pride in using fresh ingredients to create vibrant and flavorful dishes for all to enjoy.</p>
                <a href="#" className="btn" role="button" onClick={() => setShowReservationModal(true)}>Reserve a Table</a>
              </div>
              <div className="hero-image" aria-hidden="true">
                <img src={restaurantFood} alt="A spread of Mediterranean food on a table." />
              </div>
            </div>
          </div>
        </section>

        <section className="specials" aria-labelledby="specials-title">
          <div className="container">
            <div className="specials-heading">
              <h2 className="section-title" id="specials-title">This Week's Specials</h2>
              <span className="btn-disabled" aria-disabled="true">Online Menu</span>
            </div>
            <div className="cards">
              {[
                {
                  title: 'Greek Salad',
                  price: '$12.99',
                  description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
                  image: greekSalad
                },
                {
                  title: 'Bruschetta',
                  price: '$7.99',
                  description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with fresh vegetables.',
                  image: bruschetta
                },
                {
                  title: 'Lemon Dessert',
                  price: '$5.99',
                  description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
                  image: lemonDessert
                }
              ].map((item, idx) => (
                <article key={idx} className="card">
                  <div className="card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="card-content">
                    <div className="card-title">
                      <h3>{item.title}</h3>
                      <span className="price">{item.price}</span>
                    </div>
                    <p>{item.description}</p>
                    <a href="#" className="order-delivery" aria-label={`Order ${item.title} for delivery`}>
                      Order a delivery <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        <section className="testimonials" aria-labelledby="testimonials-title">
            <div className="container">
                <h2 className="section-title" id="testimonials-title">Testimonials</h2>
                <div className="testimonial-cards">
                    <article className="testimonial-card" aria-label="John Doe's testimonial">
                        <div className="rating" role="img" aria-label="5 out of 5 stars">
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                        </div>
                        <div className="testimonial-content">
                            <div className="avatar">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Portrait of John Doe." />
                            </div>
                            <div className="testimonial-info">
                                <h4>John Doe</h4>
                                <p>Regular Customer</p>
                            </div>
                        </div>
                        <p>"The Mediterranean food here is absolutely incredible! I've been coming here for years and the quality never disappoints."</p>
                    </article>
                    <article className="testimonial-card" aria-label="Jane Smith's testimonial">
                        <div className="rating" role="img" aria-label="5 out of 5 stars">
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                        </div>
                        <div className="testimonial-content">
                            <div className="avatar">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Portrait of Jane Smith." />
                            </div>
                            <div className="testimonial-info">
                                <h4>Jane Smith</h4>
                                <p>Food Blogger</p>
                            </div>
                        </div>
                        <p>"I've tried Mediterranean restaurants all over the city, but Little Lemon stands out with its authentic flavors and cozy atmosphere."</p>
                    </article>
                    <article className="testimonial-card" aria-label="Michael Johnson's testimonial">
                        <div className="rating" role="img" aria-label="4.5 out of 5 stars">
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star" aria-hidden="true"></i>
                            <i className="fas fa-star-half-alt" aria-hidden="true"></i>
                        </div>
                        <div className="testimonial-content">
                            <div className="avatar">
                                <img src="https://randomuser.me/api/portraits/men/62.jpg" alt="Portrait of Michael Johnson." />
                            </div>
                            <div className="testimonial-info">
                                <h4>Michael Johnson</h4>
                                <p>First-time Visitor</p>
                            </div>
                        </div>
                        <p>"The service was exceptional and the food was even better. I'll definitely be back with friends and family soon!"</p>
                    </article>
                </div>
            </div>
        </section>
        
        <section className="about" aria-labelledby="about-title">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 id="about-title">Our Story</h2>
                <p>Little Lemon was founded in 2010 by brothers Mario and Adrian. Combining their expertise in culinary arts and hospitality, they created a unique dining experience that celebrates Mediterranean cuisine with a modern twist.</p>
                <p>Located in the heart of Chicago, our restaurant sources the freshest ingredients from local farmers markets to ensure every dish is bursting with flavor and nutrition.</p>
                <p>We take pride in our warm, family-friendly atmosphere where guests can enjoy authentic Mediterranean dishes that have been passed down through generations.</p>
              </div>
              <div className="about-us__images" aria-hidden="true">
                <img className="about-us__image about-us__image--1" src={restaurantInterior} alt="The warm and inviting interior of the Little Lemon restaurant." />
                <img className="about-us__image about-us__image--2" src={marioAdrian} alt="A photo of the two founding chefs, Mario and Adrian, standing side-by-side in their kitchen." />
              </div>
            </div>
          </div>
        </section>

        <section className="cta" aria-labelledby="cta-heading">
          <div className="container">
            <h2 id="cta-heading">Ready to experience the taste of the Mediterranean?</h2>
            <p>Book your table today and enjoy an unforgettable dining experience at Little Lemon. We can't wait to serve you!</p>
            <a href="#" className="btn" role="button" onClick={() => setShowReservationModal(true)}>Reserve Now</a>
          </div>
        </section>
      </main>

      <footer role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={smallLogo} alt="Little Lemon logo icon" aria-hidden="true" />
              <p>Authentic Mediterranean cuisine with a modern twist in the heart of Chicago.</p>
            </div>
            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Reservations</a></li>
                <li><a href="#">Order Online</a></li>
                <li><a href="#">Login</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contact</h4>
              <address>
                <ul>
                  <li>123 Lemon Street, Chicago, IL 60601</li>
                  <li><a href="tel:+13125557890">(312) 555-7890</a></li>
                  <li><a href="mailto:info@littlelemon.com">info@littlelemon.com</a></li>
                </ul>
              </address>
            </div>
            <div className="footer-links">
              <h4>Connect With Us</h4>
              <p>Follow us on social media for updates, special offers, and more!</p>
              <div className="social-links">
                <a href="#" aria-label="Follow us on Facebook"><i className="fab fa-facebook-f" aria-hidden="true"></i></a>
                <a href="#" aria-label="Follow us on Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
                <a href="#" aria-label="Follow us on Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a>
                <a href="#" aria-label="Follow us on TikTok"><i className="fab fa-tiktok" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Little Lemon Mediterranean Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showReservationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {showSuccessMessage ? (
              <div className="modal-success-message">
                <div className="modal-success-icon">
                  <Check />
                </div>
                <h2>Reservation Confirmed!</h2>
                <p>Your table has been successfully reserved. We'll send you a confirmation email shortly.</p>
              </div>
            ) : (
              <BookingForm 
                onClose={closeModal} 
                onSuccess={handleSuccess} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LittleLemonApp;