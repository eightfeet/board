import { createModel } from '@rematch/core';
// eslint-disable-next-line import/no-cycle
import { RootModel } from '.';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export type SharksState = number;

export const sharks = createModel<RootModel>()({
  state: 0,
  reducers: {
    increment: (state, payload: number) => state + payload,
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number): Promise<void> {
      await delay(500);
      dispatch.sharks.increment(payload);
    },
  }),
});
