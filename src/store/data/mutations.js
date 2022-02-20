import state from "./state";

export const updateDrawerState = (state, opened) => {
  state.drawerState = opened;
};

export const setDialogVisibility = (state) => {
  state.newEventDialogIsOpen = !state.newEventDialogIsOpen;
};
/*
export function someMutation (state) {
}
*/
