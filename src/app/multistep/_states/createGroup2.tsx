import type { StateCreator } from "zustand";
import { type formStatus, statusCalculator } from "./useFullSlicedStore";
export interface Group2State {
  schoolName: string;
  grade: string;
  schoolCompleted: boolean;
  schoolStarted: boolean;
  schoolSaved: boolean;
  schoolIsSaving: boolean;
};

export type Group2BaseState = Pick<Group2State, 'schoolName' | 'grade'>;

export type Group2Actions = {
  setSchoolName: (name: string) => void;
  setGrade: (name: string) => void;
  setSchoolCompleted: (completed: boolean) => void;
  setSchoolStarted: (started: boolean) => void;
  setSchoolInfo: (state: Group2BaseState) => void;
  getSchoolStatus: () => formStatus;
  setSchoolSaved: (saved: boolean) => void;
  setIsSchoolSaving: (saving: boolean) => void;
};

export interface Group2Slice extends Group2State, Group2Actions {}

export const createGroup2: StateCreator<Group2Slice> = (set, get) => ({
  schoolName: "",
  grade: "",
  schoolCompleted: false,
  schoolStarted: false,
  schoolSaved: false,
  schoolIsSaving: false,
  setSchoolName: (name) => set((_) => ({ schoolName: name })),
  setGrade: (name) => set((_) => ({ grade: name })),
  setSchoolCompleted: (completed) => set((state) => ({ schoolCompleted: completed })),
  setSchoolStarted: (started) => set((state) => ({ schoolStarted: started })),
  setSchoolInfo: ({ schoolName, grade }: Group2BaseState) => set((_) => ({ schoolName, grade })),
  getSchoolStatus: () => statusCalculator(get().schoolCompleted, get().schoolStarted),
  setSchoolSaved: (saved) => set((state) => ({ schoolSaved: saved })),
  setIsSchoolSaving: (saving) => set((state) => ({ schoolIsSaving: saving })),
});
