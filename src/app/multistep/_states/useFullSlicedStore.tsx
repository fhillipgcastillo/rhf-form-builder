import { create } from "zustand";
import { createGroup1, type Group1Slice } from "./createGroup1";
import { createGroup2, Group2Slice } from "./createGroup2";
import { GroupSlice, groupsStore } from "./groupsStore";

export enum formStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed"
}

export const statusCalculator = (completed: boolean, started: boolean) => {
  if(completed && started) {
    return formStatus.Completed;
  }
  if(started) {
    return formStatus.InProgress;
  }
  return formStatus.Pending;
};


export const useFullSlicedStore = create<Group1Slice & Group2Slice & GroupSlice>()(
  (...a) => ({
    ...createGroup1(...a),
    ...createGroup2(...a),
    ...groupsStore(...a),
  })
);

