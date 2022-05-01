import { MeState } from '.';

export const selectMe = (state: { me: MeState }) => state.me;
