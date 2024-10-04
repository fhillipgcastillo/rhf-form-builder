import type { StateCreator } from "zustand";

export type Group = string[];
export type GroupState = {
  currentGroup: Group;
};
export type GroupActions = {
  setCurrentGroup: (name: Group) => void;
  nextGroup: () => void;
};
export interface GroupSlice extends GroupState, GroupActions {}

export const groupsStore: StateCreator<GroupSlice> = (set) => ({
  currentGroup: ["0"],
  setCurrentGroup: (group) => set((_) => ({ currentGroup: group })),
  nextGroup: () => set((state) => {
    const currentIndex = Number(state.currentGroup[0]);
    return { currentGroup: [String(currentIndex + 1)] };
  }),
});
