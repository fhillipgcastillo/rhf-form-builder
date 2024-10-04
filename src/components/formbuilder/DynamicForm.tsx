"use client";

import React from 'react'
import { Controller, type FieldValues, type Control } from 'react-hook-form'
import { type FormField, FormGroup, useFormStore } from './formStore'
import { Input, Textarea } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { Checkbox } from '@nextui-org/checkbox'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Accordion, AccordionItem } from '@nextui-org/accordion';

interface DynamicFormProps {
  groups: FormGroup[];
  control: Control<FieldValues>;
}

export function DynamicForm({ groups, control }: DynamicFormProps) {
  const { values, updateValue, updateErrors, currentGroupName, setCurrentGroup } = useFormStore()


  const renderField = (groupName: string, field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={values[groupName]?.[field.name] ?? ''}

            rules={field.validationRules}
            render={({ field: controllerField, fieldState }) => {
              return (
                <Input
                  {...controllerField}
                  label={field.label}
                  type={field.type}
                  value={controllerField.value as string}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                  onChange={(e) => {
                    controllerField.onChange(e)
                    updateValue(groupName, field.name, e.target.value)
                  }}
                  onInvalidCapture={() => {
                    updateErrors(groupName, field.name, fieldState.error?.message)
                  }}
                />
              )
            }}
          />
        )
      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={values[groupName]?.[field.name] ?? ''}
            rules={field.validationRules}
            render={({ field: controllerField, fieldState }) => (
              <Select
                value={controllerField.value as string}
                onChange={(e) => {
                  controllerField.onChange(e)
                  updateValue(groupName, field.name, e.target.value)
                  updateErrors(groupName, field.name, fieldState.error?.message)
                }}
              >
                {field.options?.length ? (
                  field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="empty" value="">
                    No options available
                  </SelectItem>
                )}
              </Select>
            )}
          />
        )
      case 'checkbox':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={values[groupName]?.[field.name] ?? false}
            rules={field.validationRules}
            render={({ field: controllerField, fieldState }) => (
              <Checkbox
                {...controllerField}
                isSelected={controllerField.value as boolean}
                onChange={(isSelected) => {
                  controllerField.onChange(isSelected)
                  updateValue(groupName, field.name, isSelected)
                  updateErrors(groupName, field.name, fieldState.error?.message)
                }}
              >
                {field.label}
              </Checkbox>
            )}
          />
        )
      case 'radio':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={values[groupName]?.[field.name] ?? ''}
            rules={field.validationRules}
            render={({ field: controllerField, fieldState }) => (
              <RadioGroup
                {...controllerField}
                label={field.label}

                value={controllerField.value as string}
                onChange={(val) => {
                  controllerField.onChange(val)
                  updateValue(groupName, field.name, val)
                  updateErrors(groupName, field.name, fieldState.error?.message)
                }}
              >
                {field.options?.map((option) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        )
      case 'textarea':
        return (
          <Controller
            name={field.name}
            control={control}
            defaultValue={values[groupName]?.[field.name] ?? ''}
            rules={field.validationRules}
            render={({ field: controllerField, fieldState }) => (
              <Textarea
                {...controllerField}
                label={field.label}

                value={controllerField.value as string}
                onChange={(e) => {
                  controllerField.onChange(e)
                  updateValue(groupName, field.name, e.target.value)
                  updateErrors(groupName, field.name, fieldState.error?.message)
                }}
              />
            )}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Accordion
        selectedKeys={[currentGroupName]}
        onSelectionChange={(keys) => setCurrentGroup(Array.from(keys)[0] as string)}
      >
        {groups.map((group) => (
          <AccordionItem key={group.name} title={group.label ?? group.name}>
            <div className="space-y-4">
              {group.fields.map((field) => (
                <div key={field.name}>
                  {renderField(group.name, field)}
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}