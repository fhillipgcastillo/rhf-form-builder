import React from 'react'
import { type FieldProps, FieldType, type InputField as InputFieldType, type SelectField as SelectFieldType } from './types';

import InputField from './fields/InputField';
import SelectField from './fields/SelectField';

function FieldCreator({ field, control }: Readonly<FieldProps>) {
  if (!field) return null;

  const { fieldType: type } = field;

  switch (type) {
    case FieldType.INPUT:
    case FieldType.NUMBER:
    case FieldType.PASSWORD:
    case FieldType.EMAIL:
    case FieldType.URL:
    case FieldType.TEL:
    case FieldType.COLOR:
    case FieldType.RANGE:
    case FieldType.HIDDEN:
    case FieldType.SUBMIT:
    case FieldType.RESET:
    case FieldType.BUTTON:
    case FieldType.SEARCH:
    case FieldType.FILE:
    case FieldType.IMAGE:
        return <InputField
        field={field as InputFieldType}
        control={control}
      />
    case FieldType.SELECT:
      return <SelectField 
        field={field as SelectFieldType}
        control={control}
      />
    case FieldType.TEXTAREA:
    case  FieldType.CHECKBOX:
    case FieldType.RADIO:
    case FieldType.DATE:
    case FieldType.TIME:
    case FieldType.DATETIME:
    default:
      return <p>No Defined yet</p>;
  }
};

export default FieldCreator