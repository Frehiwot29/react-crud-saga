// frontend/src/components/__tests__/CreatePetForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreatePetForm from '../CreatePetForm';

const mockStore = configureStore([]);

describe('CreatePetForm Component', () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    store = mockStore({
      auth: { user: { id: 1, role: 'BREEDER' } }
    });
    store.dispatch = mockDispatch;
  });

  const renderForm = () => {
    render(
      <Provider store={store}>
        <CreatePetForm />
      </Provider>
    );
  };

  test('renders all form fields', () => {
    renderForm();
    
    expect(screen.getByLabelText(/pet name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    renderForm();
    
    const nameInput = screen.getByLabelText(/pet name/i);
    fireEvent.change(nameInput, { target: { value: 'Max' } });
    expect(nameInput).toHaveValue('Max');
    
    const breedInput = screen.getByLabelText(/breed/i);
    fireEvent.change(breedInput, { target: { value: 'German Shepherd' } });
    expect(breedInput).toHaveValue('German Shepherd');
  });

  test('dispatches create action on form submission', async () => {
    renderForm();
    
    fireEvent.change(screen.getByLabelText(/pet name/i), { target: { value: 'Max' } });
    fireEvent.change(screen.getByLabelText(/breed/i), { target: { value: 'Labrador' } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'Boston' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Friendly dog' } });
    
    const submitButton = screen.getByRole('button', { name: /create pet/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CREATE_PET_REQUEST',
        payload: expect.objectContaining({
          name: 'Max',
          breed: 'Labrador',
          age: 3,
          location: 'Boston',
          description: 'Friendly dog'
        })
      });
    });
  });

  test('validates required fields', async () => {
    renderForm();
    
    const submitButton = screen.getByRole('button', { name: /create pet/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });
});