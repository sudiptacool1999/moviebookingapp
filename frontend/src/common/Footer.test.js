import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the extra matchers like toBeInTheDocument
import Footer from './Footer'; // adjust the path as needed

test('renders the footer with the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const footerText = `© ${currentYear} Movie Booking App. All rights reserved`;
    const footerElement = screen.getByText(footerText);    
    expect(footerElement).toBeInTheDocument();
});
