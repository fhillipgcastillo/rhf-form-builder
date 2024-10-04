"use client";

import React, { useEffect, useState } from 'react'
import { type FieldType, type FormField, useFormStore } from '@/components/formbuilder/formStore'
import { Input } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Button } from '@nextui-org/button'
export function StepBuilder() {
  const [stepName, setStepName] = useState('')
  const [stepLabel, setStepLabel] = useState('')
  const { steps, addStep, currentStepName, setCurrentStep } = useFormStore()

  const handleAddStep = () => {
    if (stepName && stepLabel) {
      addStep({ name: stepName, label: stepLabel })
      setStepName('')
      setStepLabel('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          label="Step Name"
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
        />
        <Input
          label="Step Label"
          value={stepLabel}
          onChange={(e) => setStepLabel(e.target.value)}
        />
        <Button onClick={handleAddStep}>Add Step</Button>
      </div>
      <div className="space-y-2">
        <Select
          label="Select Step"
          value={currentStepName}
          onChange={(e) => setCurrentStep(e.target.value)}
        >
          {steps.map((step) => (
            <SelectItem key={step.name} value={step.name}>
              {step.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}