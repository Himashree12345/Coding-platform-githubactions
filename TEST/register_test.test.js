import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

test('renders register form', () => {
  render(<Register />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('submits register form with valid data', () => {
  const mockOnSubmit = jest.fn();
  render(<Register onSubmit={mockOnSubmit} />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(nameInput, { target: { value: 'Test User' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  expect(mockOnSubmit).toHaveBeenCalledWith({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });
});

test('displays error message with invalid data', () => {
  const mockOnSubmit = jest.fn(() => Promise.reject(new Error('Invalid data')));
  render(<Register onSubmit={mockOnSubmit} />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(nameInput, { target: { value: '' } });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/invalid data/i);
  expect(errorMessage).toBeInTheDocument();
});



