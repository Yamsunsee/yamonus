import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import Projects from "../views/Projects.vue"
import Arrange from "../views/Arrange.vue"
import TaskHandler from "../views/TaskHandler.vue"
import ProjectHandler from "../views/ProjectHandler.vue"
import Error from "../views/Error.vue"

const routes = [
  {
    path: "/",
    component: Dashboard,
    meta: {
      enter: "down",
      leave: "up",
    },
  },
  {
    path: "/projects",
    component: Projects,
    meta: {
      enter: "up",
      leave: "down",
    },
  },
  {
    path: "/arrange/:projectId",
    component: Arrange,
    props: true,
    meta: {
      enter: "right",
      leave: "left",
    },
  },
  {
    path: "/task/:option/:taskId",
    props: true,
    component: TaskHandler,
    meta: {
      enter: "right",
      leave: "left",
    },
  },
  {
    path: "/project/:option/:projectId",
    props: true,
    component: ProjectHandler,
    meta: {
      enter: "left",
      leave: "right",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: Error,
    meta: {
      enter: "down",
      leave: "up",
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
