// frontend/src/components/__tests__/Pagination.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination buttons correctly', () => {
    render(
      <Pagination 
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
    render(
      <Pagination 
        currentPage={0}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(
      <Pagination 
        currentPage={9}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls onPageChange with correct page number', () => {
    render(
      <Pagination 
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );
    
    const pageButton = screen.getByText('5');
    fireEvent.click(pageButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(4); // 0-indexed
  });

  test('shows ellipsis for many pages', () => {
    render(
      <Pagination 
        currentPage={5}
        totalPages={20}
        onPageChange={mockOnPageChange}
      />
    );
    
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });
});