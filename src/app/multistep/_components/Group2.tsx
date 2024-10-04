"use client";

import React, { useEffect } from 'react'
import { useFullSlicedStore } from '../_states/useFullSlicedStore';
import {z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';

function Group2() {
  const {
    schoolName,
    grade,
    nextGroup,
    setSchoolCompleted,
    setSchoolStarted,
    setSchoolInfo,
    setSchoolSaved,
    setIsSchoolSaving,
  } = useFullSlicedStore();

  const formSchema = z.object({
    schoolName: z.string().min(1, "Required"),
    grade: z.string().min(1, "Required"),
  });
  type formModel = z.infer<typeof formSchema>;
  const {register, handleSubmit, formState, reset, watch, getValues} = useForm<formModel>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });
  const {errors, isDirty,} = formState;
  const onSubmit = (data: formModel) => {
    // setSchoolCompleted(true);
    // setSchoolInfo(data);

    nextGroup();
  }

  useEffect(() => {
    reset({schoolName, grade});
  }, [reset]);

  useEffect(() => {
    if(isDirty) setSchoolStarted(true);
  }, [isDirty, setSchoolStarted]);
  const formStatus = watch();
  
  useEffect(() => {
    setIsSchoolSaving(false);
    setSchoolSaved(false);
    setSchoolInfo(formStatus);
    handleCompleted();
  }, [formStatus.grade, formStatus.schoolName]);
  
  function handleCompleted() {
    const values = getValues();
    if(formSchema.safeParse(values).success) {
      setSchoolCompleted(true);
    } else {
      setSchoolCompleted(false);
    }
  };

  // Save on unmount
  useEffect(() => () => {
    const values = getValues();
    if(formSchema.safeParse(values).success) {
      setIsSchoolSaving(true);
      setTimeout(() => {
        setIsSchoolSaving(false);
        setSchoolSaved(true);
      }, 2000);
    } else {
      console.log("Did not save");
    }
  }, []);

  return (
    <div>
      Group2
      <p>School Name: {schoolName}</p>
      <p>Grade: {grade}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" label="School Name" placeholder="School Name" {...register("schoolName")} />
        <Select label="Grade" placeholder="Grade" {...register("grade")}>
          <SelectItem key={"6th"} value="6th">6th</SelectItem>
          <SelectItem key={"7th"} value="7th">7th</SelectItem>
          <SelectItem key={"8th"} value="8th">8th</SelectItem>
        </Select>
        <button type="submit">Submit</button>
      </form>  
    </div>
  )
}

export default Group2