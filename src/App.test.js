import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  newFunction()
})
function newFunction() {
  const linkElement = screen.getByText()
  expect(linkElement).toBeInTheDocument()
}
