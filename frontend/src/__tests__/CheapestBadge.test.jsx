import { render, screen } from '@testing-library/react';
import CheapestBadge from '../components/CheapestBadge.jsx';
import { test, expect } from 'vitest';

test('renders best price label', () => {
  render(<CheapestBadge />);
  expect(screen.getByText('Best Price')).toBeInTheDocument();
});
