import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AdminHeader from './AdminHeader'; // Adjust the import path as necessary

describe('AdminHeader', () => {
  test('renders AdminHeader component', () => {
    render(
      <MemoryRouter>
        <AdminHeader />
      </MemoryRouter>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('navigates to /home when Home button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );

    userEvent.click(screen.getByText(/home/i));
    expect(history.location.pathname).toBe('/home');
  });

  test('navigates to /login when Logout button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <AdminHeader />
      </Router>
    );

    userEvent.click(screen.getByText(/logout/i));
    expect(history.location.pathname).toBe('/login');
  });
});
