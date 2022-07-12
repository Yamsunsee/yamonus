export default {
  tasks: (state, { getters, taskTargetId, option }) => {
    const task = getters.tasks(taskTargetId).task()
    const localStorageTasks = getters.timer.getTasks().localStorageTasks()
    const removeTasks = (force = false, taskState = null) => {
      if (force || taskState === 2) {
        const newLocalStorageTasks = localStorageTasks.filter((task) => task.id !== parseInt(taskTargetId))
        localStorage.setItem(
          "timer",
          JSON.stringify({
            ...state.timer,
            tasks: newLocalStorageTasks,
          })
        )
      }
    }
    switch (option) {
      case "pending":
        task.state = 0
        break

      case "processing":
        task.state = 1
        break

      case "completed":
        task.state = 2
        removeTasks(true)
        break

      case "toggleCompleted":
        task.state = task.state !== 2 ? 2 : 0
        removeTasks(false, task.state)
        break

      case "toggleState":
        task.state = ++task.state % 3
        removeTasks(false, task.state)
        break

      case "delete":
        state.tasks.splice(state.tasks.indexOf(task), 1)
        removeTasks(true)
        break

      default:
        break
    }
  },
  projects: (state, { getters, projectTargetId, option }) => {
    const project = getters.projects(projectTargetId).project()
    const tasks = getters.projects(projectTargetId).getTasks()
    switch (option) {
      case "delete":
        state.projects.splice(state.projects.indexOf(project), 1)
        tasks.map((task) => state.tasks.splice(state.tasks.indexOf(task), 1))
        break

      default:
        break
    }
  },
  tags: (state, { getters, tagName, isTaskRole, option, value }) => {
    switch (option) {
      case "selected":
        if (tagName === "take a break") {
          getters.tags(tagName, isTaskRole).tag().selected[value]++
        } else if (tagName === "estimated lead time") {
          getters.tags(tagName, isTaskRole).tag().selected[value]++
        } else if (tagName === "project" || tagName === "priority") {
          getters.tags(tagName, isTaskRole).tag().selected = value
        }
        break

      case "on":
        getters.tags(tagName, isTaskRole).tag().on = true
        break

      case "reset":
        getters.tags(tagName, isTaskRole).tag().on = false
        if (tagName === "name") {
          getters.tags(tagName, isTaskRole).tag().value = [""]
        } else if (tagName === "priority") {
          getters.tags(tagName, isTaskRole).tag().selected = "low"
        } else if (tagName === "estimated lead time") {
          getters.tags().getLeadTime(isTaskRole).time = 0
          getters.tags().getLeadTime(isTaskRole).selected = {
            1: 0,
            5: 0,
            10: 0,
            30: 0,
            unit: "minute",
          }
        } else if (tagName === "deadline") {
          getters.tags("deadline", isTaskRole).tag().selected = ""
        } else if (tagName === "take a break") {
          getters.tags().getBreak().time = 0
          getters.tags().getBreak().selected = {
            "5 minutes": 0,
            "15 minutes": 0,
            "30 minutes": 0,
            "1 hour": 0,
          }
        } else if (tagName === "project") {
          getters.tags("project", true).tag().selected =
            getters.projects().allName().length === 0 ? "add new project" : getters.projects().allName()[0]
        }
        break

      case "deadline":
        getters.tags(tagName, isTaskRole).tag().selected = value
        break

      case "change":
        getters.tags(tagName, isTaskRole).tag().value = [value]
        break

      case "unit":
        if (Number.isNaN(parseInt(value))) {
          getters.tags(tagName, isTaskRole).tag().selected["unit"] = value
        }
        break

      case "toggleReminder":
        getters.tags("reminder", isTaskRole).tag().active = !getters.tags("reminder", isTaskRole).tag().active
        break

      case "toggleLock":
        getters.tags("lock", isTaskRole).tag().active = !getters.tags("lock", isTaskRole).tag().active
        break

      case "selectAll":
        if (isTaskRole) {
          getters
            .tags()
            .tasksRole()
            .map((task) => (task.on = true))
        } else {
          getters
            .tags()
            .projectsRole()
            .map((project) => (project.on = true))
        }
        break

      case "clearName":
        getters.tags("name", isTaskRole).tag().on = false
        getters.tags("name", isTaskRole).tag().value = [""]
        break

      case "clearAll":
        if (isTaskRole) {
          getters
            .tags()
            .tasksRole()
            .map((task) => (task.on = false))
        } else {
          getters
            .tags()
            .projectsRole()
            .map((project) => (project.on = false))
        }
        getters.tags("name", isTaskRole).tag().value = [""]
        getters.tags("priority", isTaskRole).tag().selected = "low"
        getters.tags("deadline", isTaskRole).tag().selected = ""
        getters.tags().getBreak().selected = {
          "5 minutes": 0,
          "15 minutes": 0,
          "30 minutes": 0,
          "1 hour": 0,
        }
        getters.tags().getBreak().time = 0
        getters.tags().getLeadTime(isTaskRole).selected = {
          1: 0,
          5: 0,
          10: 0,
          30: 0,
          unit: "minute",
        }
        getters.tags().getLeadTime(isTaskRole).time = 0
        getters.tags("project", true).tag().selected =
          getters.projects().allName().length === 0 ? "add new project" : getters.projects().allName()[0]
        getters.tags().getReminder(isTaskRole).active = true
        getters.tags().getLock(isTaskRole).active = false
        break

      case "submit":
        if (value !== "_") {
          if (isTaskRole) {
            state.tasks.splice(state.tasks.indexOf(getters.tasks(value).task()), 1)
          } else {
            state.projects.splice(state.projects.indexOf(getters.projects(value).project()), 1)
          }
        }
        var form = {
          id: getters.id(isTaskRole),
          name: getters.tags("name", isTaskRole).tag().value[0],
          priority: getters.tags("priority", isTaskRole).tag().selected,
          duration: getters.tags("estimated lead time", isTaskRole).tag().on
            ? getters.tags().getLeadTimeDurations(isTaskRole).submit()
            : 0,
          deadline: {
            on: getters.tags("deadline", isTaskRole).tag().on,
            time: getters.tags("deadline", isTaskRole).tag().on
              ? getters.tags().getDeadlineDurations(isTaskRole).submit()
              : "",
          },
          reminder: getters.tags("reminder", isTaskRole).tag().active,
        }
        if (isTaskRole) {
          Object.assign(form, {
            projectId: getters.projects().getId(getters.tags("project", isTaskRole).tag().selected),
            state: 0,
            break: {
              on: getters.tags().getBreak().on,
              time: getters.tags().getBreakDurations().submit(),
            },
          })
        }
        if (isTaskRole) {
          if (getters.tags().checkTaskName(form.projectId, form.name)) {
            getters.tasks().all().push(form)
            state.messages.push({
              id: getters.messages.length,
              title: "success",
              type: "success",
              text: value === "_" ? "add new task successfully!" : "edit task successfully!",
            })
          } else {
            state.messages.push({
              id: getters.messages.length,
              title: "duplicate name",
              type: "error",
              text: "this name is used for another task in the project!",
            })
          }
        } else {
          if (getters.tags().checkProjectName(form.name)) {
            getters.projects().all().push(form)
            state.messages.push({
              id: getters.messages.length,
              title: "success",
              type: "success",
              text: value === "_" ? "add new project successfully!" : "edit project successfully!",
            })
          } else {
            state.messages.push({
              id: getters.messages.length,
              title: "duplicate name",
              type: "error",
              text: `this name is used for another project!`,
            })
          }
        }
        break

      default:
        break
    }
  },
  loadProjects: (state) => {
    let projectNames =
      state.projects.map((project) => project.name).length === 0
        ? ["add new project"]
        : state.projects.map((project) => project.name)
    state.tasksRole.find((tag) => tag.name === "project").value = projectNames
    state.tasksRole.find((tag) => tag.name === "project").selected = projectNames[0]
  },
  loadTasksRole: (state, { getters, taskTargetId }) => {
    let task = getters.tasks(taskTargetId).task()
    state.tasksRole = [
      {
        on: true,
        name: "name",
        value: [task.name],
      },
      {
        on: true,
        name: "priority",
        value: ["low", "medium", "high"],
        selected: task.priority,
      },
      {
        on: task.duration > 0,
        name: "estimated lead time",
        value: ["1", "5", "10", "30"],
        selected: {
          1: 0,
          5: 0,
          10: 0,
          30: 0,
          unit: "minute",
        },
        time: task.duration,
      },
      {
        on: task.deadline.on,
        name: "deadline",
        value: [],
        selected: task.deadline.time,
      },
      {
        on: task.break.on,
        name: "take a break",
        value: ["5 minutes", "15 minutes", "30 minutes", "1 hour"],
        selected: {
          "5 minutes": 0,
          "15 minutes": 0,
          "30 minutes": 0,
          "1 hour": 0,
        },
        time: task.break.time,
      },
      {
        on: true,
        name: "project",
        value: getters.projects().allName(),
        selected: getters.projects(task.projectId).showName(),
      },
      {
        active: task.reminder,
        name: "reminder",
      },
      {
        active: false,
        name: "lock",
      },
    ]
  },
  loadProjectsRole: (state, { getters, projectTargetId }) => {
    let project = getters.projects(projectTargetId).project()
    state.projectsRole = [
      {
        on: true,
        name: "name",
        value: [project.name],
      },
      {
        on: true,
        name: "priority",
        value: ["low", "medium", "high"],
        selected: project.priority,
      },
      {
        on: project.duration > 0,
        name: "estimated lead time",
        value: ["1", "5", "10", "30"],
        selected: {
          1: 0,
          5: 0,
          10: 0,
          30: 0,
          unit: "minute",
        },
        time: project.duration,
      },
      {
        on: project.deadline.on,
        name: "deadline",
        selected: project.deadline.time,
      },
      {
        active: project.reminder,
        name: "reminder",
      },
      {
        active: false,
        name: "lock",
      },
    ]
  },
  removeMessage: (state, messageId) => {
    let message = state.messages.filter((message) => message.id === messageId)
    state.messages.splice(message, 1)
  },
  localStorageActions: (state, { option }) => {
    const localStorageState = JSON.parse(localStorage.getItem("state"))
    const localStorageTimer = JSON.parse(localStorage.getItem("timer"))
    switch (option) {
      case "load":
        if (localStorageState) {
          state.projects = localStorageState.projects
          state.tasks = localStorageState.tasks
        } else {
          localStorage.setItem(
            "state",
            JSON.stringify({
              projects: state.projects,
              tasks: state.tasks,
            })
          )
        }
        break

      case "update":
        localStorage.setItem(
          "state",
          JSON.stringify({
            projects: state.projects,
            tasks: state.tasks,
          })
        )
        break

      case "loadTimer":
        if (localStorageTimer) {
          state.timer = localStorageTimer
        } else {
          localStorage.setItem("timer", JSON.stringify(state.timer))
        }
        break

      case "updateTimer":
        localStorage.setItem("timer", JSON.stringify(state.timer))
        break

      default:
        break
    }
  },
  timer: (state, { getters, option, payload }) => {
    const processingTasksId = getters.timer.getTasks().processingTasksId()
    switch (option) {
      case "on":
        state.timer.on = true
        break

      case "off":
        state.timer.on = false
        break

      case "addTasks":
        state.timer.tasks = payload
        break

      case "setDuration":
        state.timer.duration = payload
        break

      case "selected":
        state.timer.selected[payload]++
        break

      case "reset":
        state.timer.duration = 0
        state.timer.selected = {
          "5 minutes": 0,
          "15 minutes": 0,
          "30 minutes": 0,
        }
        break

      case "decreaseDuration":
        var newDuration = state.timer.duration
        state.timer.duration = newDuration >= 1 ? newDuration - 1 : 0
        break

      case "decrease":
        state.timer.tasks = state.timer.tasks.map(({ id, on, duration }) => ({
          id,
          on,
          duration: processingTasksId.includes(id) ? (duration >= 1 ? duration - 1 : 0) : duration,
        }))
        break

      default:
        break
    }
  },
}
