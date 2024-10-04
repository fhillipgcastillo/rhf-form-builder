import React from 'react'
import { type Control, type FieldValues } from 'react-hook-form';
import { type Field } from './types';
import FieldCreator from './FieldCreator';



export interface FormCreatorProps {
  fields: Field[];
  control: Control<FieldValues>;
};

const  FormCreator = ({ fields, control }: FormCreatorProps) => ( 
  fields.map(field =>
    <FieldCreator
      key={`field-${field.name}-${field.fieldType}`}
      field={field}
      control={control}
    />)
  );

export default FormCreator