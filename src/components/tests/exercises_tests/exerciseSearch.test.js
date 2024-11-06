import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import ExerciseSearch from "../../exercises/ExerciseSearch";
import { findExercises } from "../../../helpers/helpers";

// Mocking findExercises function
jest.mock("../../../helpers/helpers", () => ({
  findExercises: jest.fn()
}));

describe("ExerciseSearch Component", () => {
  const mockExercises = [
    { id: 1, name: "Push Up" },
    { id: 2, name: "Pull Up" },
    { id: 3, name: "Squat" },
    { id: 4, name: "Deadlift" },
    { id: 5, name: "Bench Press" },
    { id: 6, name: "Overhead Press" }
  ];

  beforeEach(() => {
    findExercises.mockReturnValue(mockExercises);  // Mock findExercises return
  });

  it("renders search input", () => {
    render(
      <Router>
        <ExerciseSearch exercises={mockExercises} />
      </Router>
    );

    expect(screen.getByPlaceholderText(/Search for an exercise/i)).toBeInTheDocument();
  });

  it("displays a maximum of 5 exercise results based on search input", () => {
    render(
      <Router>
        <ExerciseSearch exercises={mockExercises} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search for an exercise/i), {
      target: { value: "P" }
    });

    expect(findExercises).toHaveBeenCalledWith(mockExercises, "P");
    const exerciseLinks = screen.getAllByRole("link");
    expect(exerciseLinks.length).toBeLessThanOrEqual(5);
  });

  it("displays exercise links correctly with names", () => {
    render(
      <Router>
        <ExerciseSearch exercises={mockExercises} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search for an exercise/i), {
      target: { value: "Push" }
    });

    expect(screen.getByText("Push Up")).toBeInTheDocument();
    expect(screen.getByText("Push Up").closest("a")).toHaveAttribute("href", "/exercises/1");
  });
});
