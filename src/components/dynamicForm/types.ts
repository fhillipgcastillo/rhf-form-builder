import { InputProps } from "@nextui-org/input";
import { SelectProps } from "@nextui-org/select";
import { Control, FieldValues, RegisterOptions } from "react-hook-form";

export enum FieldType {
  INPUT = "input",
  SELECT = "select",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
  FILE = "file",
  IMAGE = "image",
  NUMBER = "number",
  PASSWORD = "password",
  EMAIL = "email",
  URL = "url",
  TEL = "tel",
  COLOR = "color",
  RANGE = "range",
  HIDDEN = "hidden",
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
  SEARCH = "search"
}

export enum ValidationType {
  REQUIRED = "required",
  MINLENGTH = "minLength",
  MAXLENGTH = "maxLength",
  PATTERN = "pattern",
  DEPENDANT = "dependant"
}
export type Validation = {
  fieldName?: string;
  type: ValidationType;
  value?: string | number;
  message?: string;
};

export type BaseField = /*RegisterOptions<FieldValues> & */{
  name: string;
  label?: string;
  fieldType: FieldType;
  required?: boolean;
  placeholder?: string;
  value?: string;
  validation?: ValidationType[] | Validation[];
  defaultValue?: string;
  rules?: Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export type InputField = InputProps & BaseField & {
};
export type SelectField = Partial<SelectProps> & BaseField & {
  children?: React.ReactNode;
};
export type Field = BaseField | InputField | SelectField;
export type FieldProps = {
  field: Field;
  control: Control<FieldValues>;
};
