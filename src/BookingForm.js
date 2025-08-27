import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Mail, MessageSquare, ChevronDown, X } from 'lucide-react';
import './App.css';

const BookingForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    dinners: '',
    occasion: '',
    seating: 'standard',
    name: '',
    email: '',
    request: ''
  });
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const occasions = [
    'Birthday', 'Anniversary', 'Date Night', 'Business Meal',
    'Special Celebration', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.dinners) newErrors.dinners = 'Number of dinners is required';
    if (!formData.occasion) newErrors.occasion = 'Occasion is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSuccess();
    } else {
      setErrors(newErrors);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="modal-header">
        <h2>Book a Table</h2>
        <button onClick={onClose} className="modal-close-btn">
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label>Date</label>
          <div className="form-input-icon">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={today}
              className={errors.date ? 'form-input form-input--error' : 'form-input'}
            />
            <Calendar className="form-icon" />
          </div>
          {errors.date && <p className="form-error">{errors.date}</p>}
        </div>

        <div className="form-group">
          <label>Time</label>
          <div className="form-input-icon">
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className={errors.time ? 'form-input form-input--error' : 'form-input'}
            >
              <option value="">Choose the booking time</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <ChevronDown className="form-icon" />
          </div>
          {errors.time && <p className="form-error">{errors.time}</p>}
        </div>

        <div className="form-group">
          <label>Number of dinners</label>
          <div className="form-input-icon">
            <select
              name="dinners"
              value={formData.dinners}
              onChange={handleInputChange}
              className={errors.dinners ? 'form-input form-input--error' : 'form-input'}
            >
              <option value="">Choose number of dinners</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
            <ChevronDown className="form-icon" />
          </div>
          {errors.dinners && <p className="form-error">{errors.dinners}</p>}
        </div>

        <div className="form-group">
          <label>Occasion</label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            className={errors.occasion ? 'form-input form-input--error' : 'form-input'}
          >
            <option value="">Choose the occasion</option>
            {occasions.map(occ => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
          {errors.occasion && <p className="form-error">{errors.occasion}</p>}
        </div>

        <div className="form-group">
          <label>Seating option</label>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="seating"
                value="standard"
                checked={formData.seating === 'standard'}
                onChange={handleInputChange}
              />
              <span>Standard</span>
            </label>
            <label>
              <input
                type="radio"
                name="seating"
                value="outside"
                checked={formData.seating === 'outside'}
                onChange={handleInputChange}
              />
              <span>Outside</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Name</label>
          <div className="form-input-icon">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={errors.name ? 'form-input form-input--error' : 'form-input'}
            />
            <User className="form-icon" />
          </div>
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="form-input-icon">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'form-input form-input--error' : 'form-input'}
            />
            <Mail className="form-icon" />
          </div>
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Optional request</label>
          <div className="form-input-icon">
            <textarea
              name="request"
              value={formData.request}
              onChange={handleInputChange}
              placeholder="Type in additional request here"
              rows={4}
              className="form-input"
            />
            <MessageSquare className="form-icon" />
          </div>
        </div>

        <button
          type="submit"
          className="btn"
        >
          Make Your Reservation
        </button>
      </form>
    </>
  );
};

export default BookingForm;