import mainLayout from "layouts/MainLayout.vue";
import index from "pages/landingPage/Index.vue";
import Diary from "pages/diary/Diary.vue";
import Items from "pages/Items.vue";
import Settings from "pages/Settings.vue";

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
    path: "/Diary",
    component: mainLayout,
    children: [{ path: "", component: Diary }],
  },
  {
    path: "/Items",
    component: mainLayout,
    children: [{ path: "", component: Items }],
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
