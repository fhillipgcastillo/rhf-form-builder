import React, {  } from "react";
import Group1 from "./Group1";
import { useFullSlicedStore } from "../_states/useFullSlicedStore";
import { type GroupType } from "../_hooks/useGroupHandler";
import Group2 from "./Group2";
import useGroupHandler from "../_hooks/useGroupHandler";
import Groups from "./Groups";


const Step1 = () => {
  const { studentCompleted, studentStarted, studentSaved, studentIsSaving,schoolStarted, schoolCompleted, schoolSaved, schoolIsSaving ,getStudentStatus, getSchoolStatus } = useFullSlicedStore((state) => state);

  const groupsElements: GroupType[] = useGroupHandler([
    {
      title: "Group 1",
      content: Group1,
      statusHandler: getStudentStatus,
      isSaved: studentSaved,
      isSaving: studentIsSaving,
    },
    {
      title: "Group 2",
      content: Group2,
      statusHandler: getSchoolStatus,
      isSaved: schoolSaved,
      isSaving: schoolIsSaving,
      // requiered: () => getStudentStatus() === formStatus.Completed
    }
  ], [
    studentCompleted,
    studentStarted,
    schoolStarted,
    schoolCompleted,
  ]);

 
  return (
     <Groups groups={groupsElements} />
  )
};

export default Step1;