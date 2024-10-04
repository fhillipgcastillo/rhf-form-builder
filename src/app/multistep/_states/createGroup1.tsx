import type { StateCreator } from "zustand";
import { formStatus, statusCalculator } from "./useFullSlicedStore";

export interface Group1State {
  firstName: string;
  lastName: string;
  studentCompleted: boolean;
  studentStarted: boolean;
  studentSaved: boolean;
  studentIsSaving: boolean;
};
export type Group1BaseState = Pick<Group1State, 'firstName' | 'lastName'>;

export type Group1Actions = {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setFullName: (state: Group1BaseState) => void;
  setStudentCompleted: (completed: boolean) => void;
  setStudentStarted: (started: boolean) => void;
  getStudentStatus: () => formStatus;
  setStudentSaved: (saved: boolean) => void;
  setIsStudentSaving: (saving: boolean) => void;
};

export interface Group1Slice extends Group1State, Group1Actions {}


export const createGroup1: StateCreator<Group1Slice> = (set, get) => ({
  firstName: "",
  lastName: "",
  studentCompleted: false,
  studentStarted: false,
  studentSaved: false,
  studentIsSaving: false,
  setFirstName: (name) => set((_) => ({ firstName: name })),
  setLastName: (name) => set((_) => ({ lastName: name })),
  setFullName: ({ firstName, lastName }: Group1BaseState) => set((_) => ({ firstName, lastName })),
  setStudentCompleted: (completed) => set((state) => ({ studentCompleted: completed })),
  setStudentStarted: (started) => set((state) => ({ studentStarted: started })),
  getStudentStatus: () => statusCalculator(get().studentCompleted, get().studentStarted),
  setStudentSaved: (saved) => set((state) => ({ studentSaved: saved })),
  setIsStudentSaving: (saving) => set((state) => ({ studentIsSaving: saving })),
});
