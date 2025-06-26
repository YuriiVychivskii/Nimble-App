import { ISubscriptionData, ISubscriptionState } from '@/types/subscription';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ISubscriptionState = {
  items: [],
  filteredItems: [],
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptions: (state, action: PayloadAction<ISubscriptionData[]>) => {
      state.items = action.payload;
    },
    addSubscription: (state, action: PayloadAction<ISubscriptionData>) => {
      state.items.push(action.payload);
    },
    deleteSubscriptionInState: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((sub) => sub.subId !== action.payload);
    },
    filterSubscriptions: (state, action: PayloadAction<string>) => {
      if (!state.items.length) state.filteredItems = [];

      state.filteredItems = state.items.filter((item) =>
        item.title.toLowerCase().includes(action.payload),
      );
    },
  },
});

export const { setSubscriptions, addSubscription, deleteSubscriptionInState, filterSubscriptions } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
