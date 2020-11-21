import { createModel, Models } from '@rematch/core';

export interface RootModel extends Models<RootModel> {
  [keys: string]: any;
}

type Antifake = {
  parames: {
    [keys: string]: any;
  };
  result: {
    [keys: string]: any;
  };
  record: {
    [keys: string]: any;
  };
};

const antifake = createModel<RootModel>()({
  state: {} as Antifake,
  reducers: {
    setAntifakeParames(state, payload: Array<number>) {
      return { ...state, questions: payload };
    },
  },
  effects: (dispatch) => ({}),
});

export default antifake;
