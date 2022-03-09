import data from "./data";
import { createStore } from "vuex";
// import example from './module-example'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      data,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
}
