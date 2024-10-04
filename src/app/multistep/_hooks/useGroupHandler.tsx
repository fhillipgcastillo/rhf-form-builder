import React, { useMemo, type ReactNode } from "react";
import { formStatus } from "../_states/useFullSlicedStore";

type PartialGroupType = Pick<GroupType, 'title' | 'content' | 'isSaved' | 'isSaving'>;
interface UseGroupHandlerArg extends PartialGroupType {
  statusHandler: () => formStatus;
  // requirements: unknown[];
}

const SubStatus = ({ group }: { group: UseGroupHandlerArg }) => {
  const status = group.statusHandler();
  let result:string = status;

  if(status === formStatus.Completed && group.isSaved) {
    result = `${result} Saved`;
  } else if(group.isSaving) {
    result = `${result} Saving...`;
  } 
  return result;
};

const useGroupHandler = (groups: UseGroupHandlerArg[], requirements: unknown[] = []): GroupType[] => {
  // const requirements = useMemo(() => [groups.map((group) => group.requirements)], [groups]);

  const result = useMemo(() => {
    return groups.map((group, idx) => (
      {
        title: group.title,
        content: group.content,
        subtitle: () => <SubStatus group={group} />,
        formStatus: group.statusHandler(),
        isSaving: group.isSaving,
        isSaved: group.isSaved
      }
    ));
  }, [groups, requirements]);

  return result;
};

export default useGroupHandler;

export type GroupType = {
  title: string;
  content: () => ReactNode;
  formStatus?: formStatus;
  subtitle: () => ReactNode;
  active?: boolean;
  disabled?: boolean;
  isSaving?: boolean;
  isSaved?: boolean;
};

