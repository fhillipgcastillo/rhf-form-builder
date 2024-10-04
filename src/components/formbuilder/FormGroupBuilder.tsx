import React, { useState } from 'react'
import { type FieldType, type FormField, useFormStore, type ValidationRule } from './formStore'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Select, SelectItem } from '@nextui-org/select'
import { Checkbox } from '@nextui-org/checkbox'

export function FormGroupBuilder() {
  const [groupName, setGroupName] = useState('')
  const [groupLabel, setGroupLabel] = useState('')
  const [fieldName, setFieldName] = useState('')
  const [fieldLabel, setFieldLabel] = useState('')
  const [fieldType, setFieldType] = useState<FieldType>('text')
  const [fieldOptions, setFieldOptions] = useState('')
  const [validationRules, setValidationRules] = useState<ValidationRule>({})

  const { steps, addGroup, addField, currentStepName, currentGroupName, setCurrentGroup } = useFormStore()

  const currentStep = steps.find(step => step.name === currentStepName)
  const currentGroup = currentStep?.groups.find(group => group.name === currentGroupName)

  const handleAddGroup = () => {
    if (groupName && currentStepName) {
      addGroup(currentStepName, { name: groupName, label: groupLabel || undefined })
      setGroupName('')
      setGroupLabel('')
    }
  }

  const handleAddField = () => {
    if (currentStepName && currentGroupName) {
      const newField = {
        name: fieldName,
        label: fieldLabel,
        type: fieldType,
        options: fieldType === 'select' || fieldType === 'radio' ? fieldOptions.split(',') : undefined,
        validationRules: Object.keys(validationRules).length > 0 ? validationRules : undefined
      }
      addField(currentStepName, currentGroupName, newField)
      setFieldName('')
      setFieldLabel('')
      setFieldType('text')
      setFieldOptions('')
      setValidationRules({})
    }
  }

  const handleValidationRuleChange = (rule: keyof ValidationRule, value: string | boolean | number) => {
    setValidationRules(prev => ({
      ...prev,
      [rule]: value
    }))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Input
          label="Group Label (optional)"
          value={groupLabel}
          onChange={(e) => setGroupLabel(e.target.value)}
        />
        <Button onClick={handleAddGroup} disabled={!currentStepName}>
          Add Group to Current Step
        </Button>
      </div>
      {currentStep && (
        <Select
          label="Select Group"
          value={currentGroupName}
          onChange={(e) => setCurrentGroup(e.target.value)}
        >
          {currentStep.groups.map((group) => (
            <SelectItem key={group.name} value={group.name}>
              {group.label ?? group.name}
            </SelectItem>
          ))}
        </Select>
      )}
      {currentGroup && (
        <div className="space-y-2">
          <Input
            label="Field Name"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
          <Input
            label="Field Label"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
          />
          <Select
            label="Field Type"
            value={fieldType}
            onChange={(e) => setFieldType(e.target.value as FieldType)}
          >
            <SelectItem key="text" value="text">Text</SelectItem>
            <SelectItem key="number" value="number">Number</SelectItem>
            <SelectItem key="select" value="select">Select</SelectItem>
            <SelectItem key="checkbox" value="checkbox">Checkbox</SelectItem>
            <SelectItem key="radio" value="radio">Radio</SelectItem>
            <SelectItem key="textarea" value="textarea">Textarea</SelectItem>
          </Select>
          {(fieldType === 'select' || fieldType === 'radio') && (
            <Input
              label="Options (comma-separated)"
              value={fieldOptions}
              onChange={(e) => setFieldOptions(e.target.value)}
            />
          )}
          <div className="mt-8 flex flex-col gap-4 text-white ">
            <h1 className='text-xl text-white'>Validations</h1>
            <Checkbox
              isSelected={!!validationRules.required}
              onValueChange={(checked) => handleValidationRuleChange('required', "Field is required")}
              classNames={{ label: 'text-white' }}
            >
              Required
            </Checkbox>
            {fieldType === 'text' && (
              <>
                <Input
                  label="Min Length"
                  type="number"
                  value={validationRules.minLength?.toString() ?? ''}
                  onChange={(e) => handleValidationRuleChange('minLength', Number(e.target.value))}
                />
                <Input
                  label="Max Length"
                  type="number"
                  value={validationRules.maxLength?.toString() ?? ''}
                  onChange={(e) => handleValidationRuleChange('maxLength', e.target.value)}
                />
              </>
            )}
            {fieldType === 'number' && (
              <>
                <Input
                  label="Min Value"
                  type="number"
                  value={validationRules.min?.toString() ?? ''}
                  onChange={(e) => handleValidationRuleChange('min', e.target.value)}
                />
                <Input
                  label="Max Value"
                  type="number"
                  value={validationRules.max?.toString() ?? ''}
                  onChange={(e) => handleValidationRuleChange('max', e.target.value)}
                />
              </>
            )}
            <Input
              label="Pattern (regex)"
              value={validationRules.pattern ?? ''}
              onChange={(e) => handleValidationRuleChange('pattern', e.target.value)}
            />
          </div>
          <Button onClick={handleAddField}>Add Field to Current Group</Button>
        </div>
      )}
    </div>
  )
}
