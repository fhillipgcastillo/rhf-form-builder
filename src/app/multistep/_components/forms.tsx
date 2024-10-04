"use client";

import React, { useRef } from 'react'
import Stepper from './Stepper'
import { type StepOption } from '../_states/useStepper';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function Forms() {
  const formSteps = useRef<StepOption[]>([
    {label: "Step 1", component: Step1}, 
    {label: "Step 2", component: Step2}, 
    {label: "Step 3", component: Step3}
  ]);
  return (
    <div className='flex justify-center w-full'>
      <Stepper steps={formSteps.current} />
    </div>
  )
}

export default Forms