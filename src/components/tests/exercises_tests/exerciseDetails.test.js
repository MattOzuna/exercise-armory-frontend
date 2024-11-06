import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useLocation } from "react-router-dom";
import ExerciseDetails from "../../exercises/ExerciseDetails";
import ExerciseCard from "../../exercises/ExerciseCard";

// Mock ExerciseCard to avoid rendering it fully in this test
jest.mock("../../exercises/ExerciseCard", () => () => <div data-testid="exercise-card"></div>);

// Mocking useLocation
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  Redirect: ({ to }) => <div>Redirected to {to}</div>
}));

describe("ExerciseDetails Component", () => {
  it("renders ExerciseCard when state is present", () => {
    const mockExerciseState = {
      name: "Push Up",
      target: "chest",
      secondaryMuscles: ["triceps", "shoulders"],
      instructions: ["Get in plank position", "Lower your body", "Push back up"]
    };
    
    useLocation.mockReturnValue({ state: mockExerciseState });
    
    render(<ExerciseDetails />);
    
    expect(screen.getByTestId("exercise-card")).toBeInTheDocument();
  });

  it("redirects to home when state is not present", () => {
    useLocation.mockReturnValue({ state: null });
    
    render(<ExerciseDetails />);
    
    expect(screen.getByText(/Redirected to \//i)).toBeInTheDocument();
  });
});
