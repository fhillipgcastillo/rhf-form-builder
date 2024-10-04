import FormCreator from "@/components/dynamicForm/FormCreator";
import { type Field, FieldType } from "@/components/dynamicForm/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Step2: React.FC = () => {
  const { control, handleSubmit } = useForm({
    mode: "all",
  })
  const iceCreamTypes = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const fields = useRef<Field[]>([
    {
      name: "firstName",
      fieldType: FieldType.INPUT,
      label: "First Name",
      required: true,
      variant: "bordered",
      labelPlacement: "outside",
      placeholder: "First Name",
      rules: { required: "Required", minLength: { value: 3, message: "Minimun lenght should be 3" } }
    },
    {
      name: "lastName",
      fieldType: FieldType.INPUT,
      label: "Last Name",
      required: true,
      variant: "bordered",
      labelPlacement: "outside",
      placeholder: "Last Name",
      rules: { required: "Required", minLength: { value: 3, message: "Minimun lenght should be 3" } }
    },
    {
      name: "age",
      fieldType: FieldType.NUMBER,
      label: "Age",
      required: true,
      variant: "bordered",
      labelPlacement: "outside",
      placeholder: "Age",
      rules: { required: "Required" }
    },
    {
      name: "iceCreamType",
      fieldType: FieldType.SELECT,
      items: iceCreamTypes,
      label: "Ice Cream Type",
      required: true,
      variant: "bordered",
      labelPlacement: "outside",
      rules: { required: "Required" }
    }
  ]);
  return <form onSubmit={handleSubmit(data => console.log("Submitted", data))} className="w-full">
    <div className="flex flex-col gap-3">
      <FormCreator fields={fields.current} control={control} />
      <button type="submit" className="_hidden">Submit</button>
    </div>
  </form>
};

export default Step2;