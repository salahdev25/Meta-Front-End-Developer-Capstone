import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockOnClose.mockClear();
    mockOnSuccess.mockClear();
    // Mock date to a known value for consistent tests
    const mockDate = new Date('2025-08-27T10:00:00Z');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test 1: Component Renders
  test('renders the booking form with all fields', () => {
    render(<BookingForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);

    // Check if the main elements are present
    expect(screen.getByText('Book a Table')).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of dinners/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  // Test 2: User Input Updates Form Data
  test('updates form data on user input', () => {
    render(<BookingForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);

    const dateInput = screen.getByLabelText(/Date/i);
    const timeSelect = screen.getByLabelText(/Time/i);
    const dinersSelect = screen.getByLabelText(/Number of dinners/i);
    const nameInput = screen.getByPlaceholderText(/Enter your full name/i);

    // Simulate user entering data
    fireEvent.change(dateInput, { target: { value: '2025-09-10' } });
    fireEvent.change(timeSelect, { target: { value: '19:30' } });
    fireEvent.change(dinersSelect, { target: { value: '4' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    // Assert that the values are updated correctly
    expect(dateInput).toHaveValue('2025-09-10');
    expect(timeSelect).toHaveValue('19:30');
    expect(dinersSelect).toHaveValue('4');
    expect(nameInput).toHaveValue('John Doe');
  });

  // Test 3: Form Submission with Invalid Data (Client-side Validation)
  test('shows validation errors and prevents submission when fields are empty', async () => {
    render(<BookingForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });

    // Try to submit the form without filling any fields
    await act(async () => {
        fireEvent.click(submitButton);
    });

    // Check that error messages are displayed
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(screen.getByText('Time is required')).toBeInTheDocument();
    expect(screen.getByText('Number of dinners is required')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();

    // Assert that the onSuccess function was NOT called
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  // Test 4: Form Submission with Valid Data
  test('calls onSuccess and submits the form with valid data', async () => {
    render(<BookingForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });

    // Fill the form with valid data
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-09-10' } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '19:30' } });
    fireEvent.change(screen.getByLabelText(/Number of dinners/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: 'john.doe@example.com' } });

    // Submit the form
    await act(async () => {
        fireEvent.click(submitButton);
    });

    // Assert that the onSuccess function was called
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });

  // Test 5: Close button functionality
  test('calls onClose function when close button is clicked', () => {
    render(<BookingForm onClose={mockOnClose} onSuccess={mockOnSuccess} />);
    const closeButton = screen.getByRole('button', { name: /close/i });

    fireEvent.click(closeButton);

    // Assert that the onClose function was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});