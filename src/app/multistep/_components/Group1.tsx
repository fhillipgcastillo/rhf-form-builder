"use client";

import { useEffect, useRef } from "react";
import { useFullSlicedStore } from "../_states/useFullSlicedStore";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import FormCreator from "@/components/dynamicForm/FormCreator";
import { Field, FieldType } from "@/components/dynamicForm/types";
import { Group1BaseState } from "../_states/createGroup1";

const formFields = [
  {
    name: "firstName",
    fieldType: FieldType.INPUT,
    label: "First Name",
    required: true,
    labelPlacement: "outside",
    placeholder: "First Name",
    rules: { required: "First Name is required", minLength: { value: 3, message: "Minimun lenght should be 3" },}
  },
  {
    name: "lastName",
    fieldType: FieldType.INPUT,
    label: "Last Name",
    required: true,
    labelPlacement: "outside",
    placeholder: "Last Name",
    rules: { required: "Last Name is required", minLength: { value: 3, message: "Minimun lenght should be 3" } }
  },
];

const Group1 = () => {
  const {
    firstName,
    lastName,
    setFullName,
    nextGroup,
    setStudentCompleted,
    setStudentStarted,
    setIsStudentSaving, 
    setStudentSaved
  } = useFullSlicedStore();

  // const formSchema = z.object({
  //   firstName: z.string().min(1, "First Name is Required").min(3),
  //   lastName: z.string().min(1, "Required").min(3),
  // });
  // type formModel = z.infer<typeof formSchema>;

  const { handleSubmit, formState, reset, watch, control, getValues } = useForm({
    mode: "onChange"
  });
  const { errors, isDirty, isValid } = formState;
  const formStatus = watch();
  useEffect(() => {
    reset({ firstName, lastName });
  }, [ reset ]);

  useEffect(() => {
    if(isDirty) {
      setStudentStarted(true);
    }
  }, [isDirty, setStudentStarted]);
  
  useEffect(() => {
    setIsStudentSaving(false);
    setStudentSaved(false);
    setFullName(formStatus as Group1BaseState);
    handleCompleted();
  }, [formStatus.firstName, formStatus.lastName]);

  const onSubmit = (data:FieldValues) => {
    setFullName(data as Group1BaseState);
    handleCompleted();
    nextGroup();
  }
  function handleCompleted() {
    if(isValid) {
      setStudentCompleted(true);
    } else {
      setStudentCompleted(false);
    }
  };

  // Save on unmount
  useEffect(() => () => {
    if(isValid) {
      setIsStudentSaving(true);
      setTimeout(() => {
        setIsStudentSaving(false);
        setStudentSaved(true);
      }, 2000);
    } else {
      console.log("Did not save");
    }
  }, []);
  
  return (
    <div className="">
      <p>Group 1</p>
      <p>Full Name: {firstName} {lastName}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <FormCreator fields={formFields} control={control} />
        </div>
        <button type="submit" className="hidden">Submit</button>
      </form>
    </div>
  )
};

export default Group1;
