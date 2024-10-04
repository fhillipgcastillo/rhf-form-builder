"use client";

import { useEffect, useMemo } from "react";
import { type StepOption, useStepper } from "../_states/useStepper";
import { cn } from "@nextui-org/theme";
import { useFullSlicedStore } from "../_states/useFullSlicedStore";

const Stepper = ({ steps }: { steps: StepOption[] }) => {
  const { currentStepIndex, steps: _steps, currentStep, setCurrentStep, setSteps } = useStepper();
  const { studentCompleted, schoolCompleted, } = useFullSlicedStore();
  const cantSave = useMemo(() => !studentCompleted || !schoolCompleted, [studentCompleted, schoolCompleted]);

  useEffect(() => {
    setSteps(steps)
  }, [setSteps, steps]);

  return (
    <div className='flex flex-col gap-5 items-start border p-2 w-full max-w-screen-sm'>
      <h3 className="font-bold text-lg capitalize">stepper</h3>
      <div className='flex gap-5 border px-4 py-2'>
        {_steps.map((step, index) => (
          <label key={index} className={cn({
            'text-blue-500': index === currentStepIndex,
          })}>{step.label}</label>
        ))}
      </div>
      {currentStep && <currentStep.component />}
      <div className="flex gap-5 ">
        <button className="border rounded px-4 py-1 bg-blue-500 text-white" onClick={() => setCurrentStep(currentStepIndex - 1)}>Prev</button>
        <button
          className={cn("border rounded px-4 py-1", {
            'bg-gray-300': cantSave,
            'bg-blue-500 text-white': !cantSave
          })}
          onClick={() => setCurrentStep(currentStepIndex + 1)}
          disabled={cantSave}>Next</button>
      </div>
    </div>
  )
};


export default Stepper;