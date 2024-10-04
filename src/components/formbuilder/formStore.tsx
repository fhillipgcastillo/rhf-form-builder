import { FieldError, type FieldValues, type RegisterOptions } from 'react-hook-form'
import { create } from 'zustand'

export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea'

export type ValidationRule = Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;

export interface FormField {
  name: string
  label: string
  type: FieldType
  options?: string[]
  validationRules?: ValidationRule
}

export interface FormGroup {
  name: string
  label?: string
  fields: FormField[]
}

export interface Step {
  name: string
  label: string
  groups: FormGroup[]
}

interface FormState {
  steps: Step[]
  values: Record<string, Record<string, unknown>>
  errors: Record<string, Record<string, Record<string,FieldError  | Partial<FieldError > | ((state: FieldError ) => FieldError  | Partial<FieldError >)>>>
  currentStepName: string
  currentGroupName: string
  addStep: (step: Omit<Step, 'groups'>) => void
  addGroup: (stepName: string, group: Omit<FormGroup, 'fields'>) => void
  addField: (stepName: string, groupName: string, field: FormField) => void
  updateValue: (groupName: string, fieldName: string, value: unknown) => void
  setCurrentStep: (stepName: string) => void
  setCurrentGroup: (groupName: string) => void
  updateErrors: (groupName: string, fieldName: string, value: unknown) => void
  isStepValid: (stepName: string) => boolean
}

export const useFormStore = create<FormState>((set, get) => ({
  steps: [
    {
      "name": "step1",
      "label": "step1",
      "groups": [
        {
          "name": "group1",
          "label": "group1",
          "fields": [
            {
              "name": "field1",
              "label": "field1",
              "type": "text"
            }
          ]
        }
      ]
    },
    {
      "name": "step2",
      "label": "step2",
      "groups": [
        {
          "name": "group2",
          "label": "group2",
          "fields": [
            {
              "name": "field1group2",
              "label": "field1group2",
              "type": "text"
            }
          ]
        }
      ]
    }
  ],
  values: {},
  errors: {},
  currentStepName: '',
  currentGroupName: '',
  addStep: (step) =>
    set((state) => {
      if (state.steps.some(s => s.name === step.name)) {
        console.error(`Step with name "${step.name}" already exists.`)
        return state
      }
      const newStep: Step = {
        ...step,
        groups: []
      }
      return {
        steps: [...state.steps, newStep],
        currentStepName: newStep.name
      }
    }),
  addGroup: (stepName, group) =>
    set((state) => {
      const stepIndex = state.steps.findIndex(s => s.name === stepName)
      if (stepIndex === -1) {
        console.error(`Step "${stepName}" not found.`)
        return state
      }
      if (state.steps[stepIndex].groups.some(g => g.name === group.name)) {
        console.error(`Group with name "${group.name}" already exists in step "${stepName}".`)
        return state
      }
      const newGroup: FormGroup = {
        ...group,
        fields: []
      }
      const updatedSteps = state.steps.map((step, index) =>
        index === stepIndex
          ? { ...step, groups: [...step.groups, newGroup] }
          : step
      )
      return {
        steps: updatedSteps,
        currentGroupName: newGroup.name
      }
    }),
  addField: (stepName, groupName, field) =>
    set((state) => {
      const stepIndex = state.steps.findIndex(s => s.name === stepName)
      if (stepIndex === -1) {
        console.error(`Step "${stepName}" not found.`)
        return state
      }
      const groupIndex = state.steps[stepIndex].groups.findIndex(g => g.name === groupName)
      if (groupIndex === -1) {
        console.error(`Group "${groupName}" not found in step "${stepName}".`)
        return state
      }
      if (state.steps[stepIndex].groups[groupIndex].fields.some(f => f.name === field.name)) {
        console.error(`Field with name "${field.name}" already exists in group "${groupName}".`)
        return state
      }
      const updatedSteps = state.steps.map((step, sIndex) =>
        sIndex === stepIndex
          ? {
            ...step,
            groups: step.groups.map((group, gIndex) =>
              gIndex === groupIndex
                ? { ...group, fields: [...group.fields, field] }
                : group
            )
          }
          : step
      )
      return {
        steps: updatedSteps,
        values: {
          ...state.values,
          [groupName]: { ...state.values[groupName], [field.name]: '' }
        }
      }
    }),
  updateValue: (groupName, fieldName, value) =>
    set((state) => {
      const newValues = {
        ...state.values,
        [groupName]: { ...state.values[groupName], [fieldName]: value }
      }
      return { values: newValues }
    }),
  setCurrentStep: (stepName) => set({ currentStepName: stepName }),
  setCurrentGroup: (groupName) => set({ currentGroupName: groupName }),
  updateErrors: (groupName, fieldName, error) =>
    set((state) => {
      const field = state.steps
        .flatMap(step => step.groups)
        .find(group => group.name === groupName)
        ?.fields.find(field => field.name === fieldName)

      if (!field?.validationRules) return state

      return {
        errors: {
          ...state.errors,
          [groupName]: { ...state.errors[groupName], [fieldName]: error }
        }
      }
    }),

  isStepValid: (stepName) => {
    const state = get()
    const step = state.steps.find(s => s.name === stepName)
    if (!step) return false

    return step.groups.every(group =>
      group.fields.every(field => {
        const value = state.values[group.name]?.[field.name]
        const error = state.errors[step.name]?.[group.name]?.[field.name]
        return value !== undefined && value !== '' && !error
      })
    )
  }
}))