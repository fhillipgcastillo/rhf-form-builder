"use client";

import React from 'react'
import { create } from "zustand";
import { produce } from "immer";

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: (qty: number) => set(produce((state:State) => { 
    state.count += qty 
  })),
  decrement: (qty: number) => set(
    produce((state:State) => {
    state.count -= qty;
  })),
}))

function Page() {
  const {count, increment, decrement} = useCountStore();

  return (
    <div>
      <h3>page</h3>
      <div className="flex flex-col items-start">
        <button onClick={() => increment(1)}>Increment</button>
        <button onClick={() => decrement(1)}>Decrement</button>
        <div>Count: {count}</div>
      </div>
      <Child />
    </div>
  )
}

const Child = ()=> {
  const {count, increment, decrement} = useCountStore();
  return (
    <div>
      <h3>child</h3>
      <div className="flex flex-col items-start">
        <button onClick={() => increment(1)}>Increment</button>
        <button onClick={() => decrement(1)}>Decrement</button>
        <div>Count: {count}</div>
      </div>
    </div>
  )
};

export default Page