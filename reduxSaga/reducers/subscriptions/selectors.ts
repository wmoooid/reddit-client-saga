import { SubscriptionsState } from '.';

export const selectSubscriptions = (state: { subscriptions: SubscriptionsState }) => state.subscriptions;
