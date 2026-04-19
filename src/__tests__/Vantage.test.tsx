import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as geminiService from '../services/geminiService';

// Mock generation so we don't spam real API during tests
vi.mock('../services/geminiService', () => ({
  generateConciergeResponse: vi.fn(),
}));

describe('Vantage PWA Optimization Requirements', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('verifies the Venue Map renders correctly with A11y tags', () => {
    render(<App />);
    const map = screen.getByRole('img', { name: /Interactive map showing live crowd densities/i });
    expect(map).toBeInTheDocument();
    
    // Check specific structural elements exist within the SVG
    const sectionA = screen.getByRole('img', { name: /Section A is currently experiencing/i });
    expect(sectionA).toBeInTheDocument();
  });

  it('verifies the "Simulate High Traffic" button correctly toggles system status', async () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /Enable High Traffic Simulation|Disable High Traffic Simulation/i });
    
    // Initially optimal
    expect(screen.getByText(/Optimal/i)).toBeInTheDocument();
    
    // Toggle High Traffic
    fireEvent.click(toggleButton);
    
    // System should reflect strained UI layout
    expect(screen.getByText(/Strained/i)).toBeInTheDocument();
    
    // Toggle back
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Optimal/i)).toBeInTheDocument();
  });

  it('verifies the Chat component correctly displays messages via Gemini API', async () => {
    render(<App />);
    
    // Mocking the AI reply
    (geminiService.generateConciergeResponse as Mock).mockResolvedValue("Head towards Sec A for a safe exit.");
    
    const input = screen.getByRole('textbox', { name: /Type your message to AI/i });
    const sendBtn = screen.getByRole('button', { name: /Send message/i });

    // Type and Submit
    fireEvent.change(input, { target: { value: 'Where is the exit?' } });
    fireEvent.click(sendBtn);

    // Ensure user message appears instantly
    expect(screen.getByText('Where is the exit?')).toBeInTheDocument();

    // Verify AI response fulfills promise and prints
    await waitFor(() => {
        expect(screen.getByText('Head towards Sec A for a safe exit.')).toBeInTheDocument();
    });
  });

});
