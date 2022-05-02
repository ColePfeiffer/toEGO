import { boot } from "quasar/wrappers";
import Vue from "vue";
import VueTimeago from "vue-timeago";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  Vue.use(VueTimeago, {
    name: "Timeago", // Component name, `Timeago` by default
    locale: undefined, // Default locale
    locales: {
      "zh-CN": require("date-fns/locale/zh_cn"),
      ja: require("date-fns/locale/ja"),
    },
  });
});
