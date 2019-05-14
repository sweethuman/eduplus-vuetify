import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
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
      path: "/exam",
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
});
