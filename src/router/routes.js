import mainLayout from "layouts/MainLayout.vue";
import index from "pages/landingPage/Index.vue";
import diary from "pages/diary/diary.vue";
import items from "pages/items.vue";
import settings from "pages/settings.vue";

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
    path: "/diary",
    component: mainLayout,
    children: [{ path: "", component: diary }],
  },
  {
    path: "/items",
    component: mainLayout,
    children: [{ path: "", component: () => items }],
  },
  {
    path: "/settings",
    component: mainLayout,
    children: [{ path: "", component: settings }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
