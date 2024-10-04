import React, { useState } from 'react'
import { DynamicForm } from './DynamicForm'
import { useFormStore } from './formStore'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { useForm } from 'react-hook-form'

export function Stepper() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { steps, isStepValid } = useFormStore()
  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
  })
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const currentStep = steps[currentStepIndex]

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit((data) => console.log("submitted", data))}>

        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={step.name}
              className={`flex items-center ${index <= currentStepIndex ? 'text-blue-600' : 'text-gray-400'
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStepIndex ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
              >
                {index + 1}
              </div>
              <span className="ml-2">{step.label}</span>
              {index < steps.length - 1 && (
                <div className="w-10 h-1 bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            {currentStep?.label && <h2 className="text-2xl font-bold">{currentStep.label}</h2>}
          </CardHeader>
          <CardBody>
            {currentStep?.groups && <DynamicForm groups={currentStep.groups} control={control} />}
          </CardBody>
        </Card>

        <div className="flex justify-between mt-4">
          <Button onClick={handlePrevious} disabled={currentStepIndex === 0}>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!!currentStep?.name && (!isStepValid(currentStep.name) || currentStepIndex === steps.length - 1)}
          >
            {currentStepIndex === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>

        <input type='submit' value='' className='hidden' />
      </form>
    </div>
  )
}
