"use client";
import { create } from "zustand";

export type StepperState = {
  currentStepIndex: number;
  steps: StepOption[];
  currentStep?: StepOption;
};
export type StepperActions = {
  setCurrentStep: (step: number) => void;
  setSteps: (steps: StepOption[]) => void;
};

export type StepOption = {
  label: string;
  component: React.FC;
};

export const useStepper = create<StepperState & StepperActions>((set, get) => ({
  currentStepIndex: -1,
  steps: [],
  currentStep: undefined,
  setCurrentStep: (step) => set((state) => {
    return step < state.steps.length && step >= 0 ? {
      currentStepIndex: step,
      currentStep: state.steps[step],
    } : {};
  }),
  setSteps: (steps) => set((_) => ({ steps, currentStepIndex: 0, currentStep: steps[0] })),
}));
