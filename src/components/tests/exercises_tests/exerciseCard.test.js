import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ExerciseCard from "../../exercises/ExerciseCard";
import { capitilize } from "../../../helpers/helpers";

// Mocking the capitilize function
// jest.mock("../../helpers/helpers", () => ({
//   capitilize: jest.fn((text) => text.charAt(0).toUpperCase() + text.slice(1))
// }));

describe("ExerciseCard Component", () => {
  const mockExercise = {
    name: "Push Up",
    target: "chest",
    secondaryMuscles: ["triceps", "shoulders"],
    instructions: ["Get in plank position", "Lower your body", "Push back up"]
  };

  it("renders ExerciseCard component with exercise details", () => {
    render(<ExerciseCard exercise={mockExercise} />);

    expect(screen.getByText(/Push Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Target Muscles:/i)).toBeInTheDocument();
    expect(screen.getByText(/Chest, Triceps, Shoulders/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions:/i)).toBeInTheDocument();
    mockExercise.instructions.forEach(instruction => {
      expect(screen.getByText(instruction)).toBeInTheDocument();
    });
  });

  it("renders the 'Add to Workout' button when add prop is provided", () => {
    const mockAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} add={mockAdd} />);

    const addButton = screen.getByRole("button", { name: /Add to Workout/i });
    expect(addButton).toBeInTheDocument();
  });

  it("does not render the 'Add to Workout' button when add prop is not provided", () => {
    render(<ExerciseCard exercise={mockExercise} />);

    const addButton = screen.queryByRole("button", { name: /Add to Workout/i });
    expect(addButton).toBeNull();
  });
});
