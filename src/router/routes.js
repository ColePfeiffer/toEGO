import mainLayout from "layouts/MainLayout.vue";
import index from "src/views/Today.vue";
import Diary from "src/views/Diary.vue";
import Settings from "src/views/Settings.vue";
import Event from "src/views/Note.vue";
import LoginRegister from "src/views/LoginRegister.vue";

const routes = [
  {
    path: "/",
    redirect: "/loginRegister",
  },
  {
    path: "/home",
    component: mainLayout,
    children: [{ path: "", component: index }],
  },
  {
    path: "/loginRegister",
    component: mainLayout,
    children: [{ path: "", component: LoginRegister }],
  },
  {
    path: "/Event",
    component: mainLayout,
    children: [{ path: "", component: Event }],
  },
  {
    path: "/Diary",
    component: mainLayout,
    children: [{ path: "", component: Diary }],
  },
  {
    path: "/Settings",
    component: mainLayout,
    children: [{ path: "", component: Settings }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/views/Error404.vue"),
  },
];

export default routes;
