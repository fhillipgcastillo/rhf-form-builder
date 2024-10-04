import { Input } from '@nextui-org/input'
import React from 'react'
import { type Control, Controller, type FieldValues } from 'react-hook-form'
import { type InputField } from '../types'

function InputField({ field, control }: Readonly<{ field: InputField, control: Control<FieldValues> }>) {
  return <Controller
    name={field.name}
    control={control}
    rules={field.rules}
    render={
      ({ field: controllerField, fieldState, formState }) => {
        return <Input
          {...controllerField}
          label={field.required ? <>{field.label} <span className="text-danger">*</span></> : field.label}
          placeholder={field.placeholder}
          variant={field.variant}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          type={field.fieldType ?? 'text'}
        />
      }}
  />
}

export default InputField