import data from "./data";
import layout from "./layout";
import auth from "./auth";
import diaryentries from "./diaryentries";
import templates from "./templates";

import { createStore } from "vuex";
// import example from './module-example'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      data,
      layout,
      auth,
      diaryentries,
      templates,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
}
