import { Models } from '@rematch/core';
// eslint-disable-next-line import/no-cycle
import { sharks } from './sharks';

export interface RootModel extends Models<RootModel> {
  sharks: typeof sharks;
}

export const models: RootModel = { sharks };
