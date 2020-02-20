import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  a: false,
  b: 0,
  c: 'else',
};

export type State = typeof initialState;

export const { actions, reducer } = createSlice({
  name: 'main',
  initialState,
  reducers: {
    decrement(state) {
      state.a = false;
      state.b = state.b - 1;
    },
    increment(state, { payload: { a } }: PayloadAction<{ a: State['a'] }>) {
      state.a = a;
      state.b = state.b + 1;
    },
  },
});

/*
export const selectors = {
  selectA: ({ a }: State) => a,
  selectB: ({ b }: State) => b,
};
*/

export const store = configureStore({ reducer });
