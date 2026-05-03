// frontend/src/components/__tests__/Profile.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile';

const mockStore = configureStore([]);

describe('Profile Component', () => {
  let store;
  
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'BUYER',
    phone: '123-456-7890',
    location: 'New York'
  };

  beforeEach(() => {
    store = mockStore({
      auth: { user: mockUser }
    });
  });

  const renderProfile = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Profile />
        </BrowserRouter>
      </Provider>
    );
  };

  test('displays user information', () => {
    renderProfile();
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument();
  });

  test('allows editing profile information', async () => {
    renderProfile();
    
    const editButton = screen.getByText(/edit profile/i);
    fireEvent.click(editButton);
    
    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: 'John Smith' } });
    
    const saveButton = screen.getByText(/save changes/i);
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('John Smith')).toBeInTheDocument();
    });
  });

  test('displays role-specific sections', () => {
    renderProfile();
    
    expect(screen.getByText(/buyer information/i)).toBeInTheDocument();
    expect(screen.getByText(/adoption history/i)).toBeInTheDocument();
  });

  test('shows breeder stats for breeder role', () => {
    const breederUser = { ...mockUser, role: 'BREEDER' };
    store = mockStore({ auth: { user: breederUser } });
    
    renderProfile();
    
    expect(screen.getByText(/breeder statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/total pets listed/i)).toBeInTheDocument();
    expect(screen.getByText(/total requests received/i)).toBeInTheDocument();
  });
});