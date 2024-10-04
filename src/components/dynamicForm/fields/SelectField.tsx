import React from 'react'
import { type Control, Controller, type FieldValues } from 'react-hook-form'
import { type SelectField } from '../types'
import { Select, SelectItem } from '@nextui-org/select'

function SelectField({field: selectField, control}: Readonly<{field: SelectField, control: Control<FieldValues>}>) {
  return (
    <Controller
        name={selectField.name}
        control={control}
        rules={selectField.rules}
        render={
          ({ field: controllerField, fieldState, formState }) => (
            <Select    
              {...controllerField}
              label={selectField.required ? <>{selectField.label} <span className="text-danger">*</span></> : selectField.label}
              required={selectField.required}
              placeholder={selectField.placeholder}
              variant={selectField.variant}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState?.error?.message}
              items={selectField?.items as []}
            >
              {
                (item: {value: string; label: string}) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              }
            </Select>
          )}
      />
  )
}

export default SelectField