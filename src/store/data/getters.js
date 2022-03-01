export const getMethodById = (state, id) => {
  console.log("trying my best");
  return state.eventData.methods.find((method) => method.id === id);
};

export const getMethodById2 = (state) => {
  return (id) => {
    console.log("trying my best", id);
    let bla = state.eventData.methods.find((method) => method.id === id);
    console.log("found: ", bla);
    return state.eventData.methods.find((method) => method.id === id);
  };
};

/*
export function someGetter (state) {
}
*/
