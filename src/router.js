import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/exam/:name",
      name: "Exam",
      component: () => import(/* webpackChunkName: "exam" */ "./views/Exam.vue"),
    },
    {
      path: "/discipline",
      redirect: "/disciplines",
    },
    {
      path: "/chapters/:discipline",
      name: "Chapters",
      component: () => import(/* webpackChunkName: "chapters" */ "./views/Chapters"),
    },
    {
      path: "/disciplines",
      name: "Disciplines",
      component: () => import(/* webpackChunkName: "disciplines" */ "./views/Disciplines.vue"),
    },
    {
      path: "/lesson/:discipline/:chapter/:lesson",
      name: "Lesson",
      component: () => import(/* webpackChunkName: "lesson" */ "./views/Lesson"),
    },
    {
      path: "**",
      name: "404",
      component: () => import(/* webpackChunkName: "notfound" */ "./views/404Page.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeResolve((to, from, next) => {
  router.app.$wait.start("loading route");
  next();
});

router.afterEach((to, from) => {
  //needs a timeout to ensure that the progress barshows, otherwise it moves too fast and the change of '$wait.any' is not detected
  setTimeout(() => router.app.$wait.end("loading route"), 500);
});

export default router;
