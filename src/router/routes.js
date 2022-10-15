import mainLayout from "layouts/MainLayout.vue";
import index from "pages/Index.vue";
import Diary from "pages/Diary.vue";
import Settings from "pages/Settings.vue";
import Event from "pages/Event.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: mainLayout,
    children: [{ path: "", component: index }],
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
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
