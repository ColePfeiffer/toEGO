import { Dialog } from "quasar";
import state from "./state";

export const updateDrawerState = (state, opened) => {
  state.drawerState = opened;
};

export const setDialogVisibility = (state) => {
  state.newEventDialogIsOpen = !state.newEventDialogIsOpen;
};

export const addEvent = (state, event) => {
  // mutate state
  state.events.push(event);
};
/*
export function someMutation (state) {
}
*/
