import moment from "moment"

export default {
  id: (state) => (isTask) => {
    if (isTask) {
      const tasksId = state.tasks.map((task) => task.id)
      const maxId = Math.max(...tasksId) + 1
      for (let index = 0; maxId; index++) {
        if (!tasksId.includes(index)) return index
      }
    } else {
      const projectsId = state.projects.map((project) => project.id)
      const maxId = Math.max(...projectsId) + 1
      for (let index = 0; maxId; index++) {
        if (!projectsId.includes(index)) return index
      }
    }
  },
  messages: (state) => state.messages,
  projects: (state) => (projectTargetId) => {
    if (projectTargetId !== undefined) {
      projectTargetId = parseInt(projectTargetId)
      const project = state.projects.find((project) => project.id === projectTargetId)
      const tasks = state.tasks.filter((task) => task.projectId === projectTargetId)
      return {
        project: () => project,
        getTasks: () => tasks,
        getPendingTasks: () => tasks.filter((task) => task.state === 0),
        getProcessingTasks: () => tasks.filter((task) => task.state === 1),
        getCompletedTasks: () => tasks.filter((task) => task.state === 2),
        getProgressPercent: () => {
          return `--percent: ${(tasks.filter((task) => task.state === 2).length / tasks.length) * 100}`
        },
        showName: () => project.name,
        showDuration: () => `About ${moment.duration(project.duration, "minutes").humanize()}`,
        showPriority: () => project.priority,
        showDeadline: () => moment(project.deadline.time).format("DD/MM/YYYY"),
        showProgress: () => {
          return {
            percent: () =>
              `${
                tasks.length !== 0
                  ? Math.round((tasks.filter((task) => task.state === 2).length / tasks.length) * 100)
                  : ""
              }%`,
            quantify: () => `${tasks.filter((task) => task.state === 2).length}/${tasks.length}`,
          }
        },
        checkProcessing: () => tasks.filter((task) => task.state === 1).length > 0,
        checkCompleted: () => tasks.filter((task) => task.state === 2).length === tasks.length,
        checkDeadline: () => project.deadline.on,
        checkReminder: () => project.reminder,
        checkDuration: () => project.duration > 0,
      }
    } else {
      return {
        all: () => state.projects,
        empty: () => state.projects.length === 0,
        allName: () => state.projects.map((project) => project.name),
        id: () => state.projects.map((project) => project.id),
        getId: (projectName) => state.projects.find((project) => project.name === projectName).id,
        progress: () => {
          return Math.round(
            (state.projects.filter((project) => {
              const tasks = state.tasks.filter((task) => task.projectId === project.id)
              return tasks.filter((task) => task.state === 2).length === tasks.length
            }).length *
              100) /
              state.projects.length
          )
        },
        countByDate: (date) =>
          state.projects.filter(
            (project) =>
              moment(project.deadline.time).format("YYYY/MM/DD") === moment(date).format("YYYY/MM/DD") &&
              project.reminder &&
              state.tasks
                .filter((task) => task.projectId === project.id)
                .some((filteredTask) => filteredTask.state !== 2)
          ).length,
      }
    }
  },
  tasks: (state) => (taskTargetId) => {
    if (taskTargetId !== undefined) {
      const task = state.tasks.find((task) => task.id === parseInt(taskTargetId))
      return {
        task: () => task,
        getProjectId: () => task.projectId,
        showName: () => task.name,
        showDuration: () => {
          const time = moment.duration(task.duration, "minutes")
          const hours = time.get("hours")
          const minutes = time.get("minutes")
          return (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "")
        },
        showPriority: () => task.priority,
        showDeadline: () => moment(task.deadline.time).format("DD/MM/YYYY"),
        showBreak: () => {
          const time = moment.duration(task.break.time, "minutes")
          const hours = time.get("hours")
          const minutes = time.get("minutes")
          return (hours > 0 ? hours + "h" : "") + (minutes > 0 ? minutes + "m" : "")
        },
        checkPending: () => task.state === 0,
        checkProcessing: () => task.state === 1,
        checkCompleted: () => task.state === 2,
        checkDeadline: () => task.deadline.on,
        checkDuration: () => task.duration !== 0,
        checkBreak: () => task.break.on,
        checkReminder: () => task.reminder,
      }
    } else {
      return {
        all: () => state.tasks,
        progress: () => Math.round((state.tasks.filter((task) => task.state === 2).length * 100) / state.tasks.length),
        countByDate: (date) =>
          state.tasks.filter(
            (task) =>
              moment(task.deadline.time).format("YYYY/MM/DD") === moment(date).format("YYYY/MM/DD") &&
              task.state !== 2 &&
              task.reminder
          ).length,
      }
    }
  },
  tags: (state) => (tagName, isTaskRole) => {
    if (tagName !== undefined) {
      let tag = isTaskRole
        ? state.tasksRole.find((tag) => tag.name === tagName)
        : state.projectsRole.find((tag) => tag.name === tagName)
      return {
        tag: () => tag,
      }
    } else {
      return {
        tasksRole: () => state.tasksRole,
        projectsRole: () => state.projectsRole,
        getSelectedTasksRole: () => state.tasksRole.filter((taskRole) => taskRole.on === true),
        getUnselectedTasksRole: () => state.tasksRole.filter((taskRole) => taskRole.on === false),
        getSelectedProjectsRole: () => state.projectsRole.filter((projectRole) => projectRole.on === true),
        getUnselectedProjectsRole: () => state.projectsRole.filter((projectRole) => projectRole.on === false),
        getName: (isTaskRole) =>
          isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "name").value[0] !== ""
            : state.projectsRole.find((projectRole) => projectRole.name === "name").value[0] !== "",
        checkProjectName: (name) => {
          let projectsName = state.projects.map((project) => project.name)
          return !projectsName.includes(name)
        },
        checkTaskName: (projectTargetId, name) => {
          let tasks = state.tasks.filter((task) => task.projectId === projectTargetId)
          let tasksName = tasks.map((task) => task.name)
          return !tasksName.includes(name)
        },
        getDeadlineDurations: (isTaskRole) => {
          let role = isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "deadline")
            : state.projectsRole.find((projectRole) => projectRole.name === "deadline")
          let value = role.selected
          let durations = ""

          if (moment(value).endOf("day").fromNow().includes("ago") || value === "") {
            durations = "what date do you have to complete it?"
          } else {
            durations = `${moment(value).format("dddd MMMM Do YYYY")}\n(${moment(value).endOf("day").fromNow()})`
          }

          return {
            text: () => durations,
            valid: () =>
              !role.on || (role.on && durations !== "" && durations !== "what date do you have to complete it?"),
            submit: () => value,
          }
        },
        getDeadlineSelected: (isTaskRole) =>
          isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "deadline").selected !== "" &&
              state.tasksRole.find((taskRole) => taskRole.name === "deadline").selected !==
                "what date do you have to complete it?"
            : state.projectsRole.find((projectRole) => projectRole.name === "deadline").selected !== "" &&
              state.projectsRole.find((projectRole) => projectRole.name === "deadline").selected !==
                "what date do you have to complete it?",
        getBreakDurations: () => {
          let role = state.tasksRole.find((taskRole) => taskRole.name === "take a break")
          let selected = role.selected
          let durations = 0
          for (const item in selected) {
            let [value, unit] = item.split(" ")
            value = parseInt(value)
            if (unit === "hour") {
              durations += selected[item] * 60
            } else {
              durations += value * selected[item]
            }
          }
          durations = Math.max(durations, role.time)
          let time = moment.duration(durations, "minutes")
          let hours = time.get("hours")
          let minutes = time.get("minutes")
          hours = hours === 0 ? "" : hours === 1 ? hours + " hour" : hours + " hours"
          minutes = minutes === 0 ? "" : minutes + " minutes"
          return {
            text: () => (hours + minutes !== "" ? `Every ${hours} ${minutes}` : "why don't you take a break?"),
            valid: () => !role.on || (role.on && hours + minutes !== ""),
            submit: () => durations,
          }
        },
        getBreak: () => state.tasksRole.find((taskRole) => taskRole.name === "take a break"),
        getBreakValue: (key) => state.tasksRole.find((taskRole) => taskRole.name === "take a break").selected[key],
        getLeadTimeDurations: (isTaskRole) => {
          let role = isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "estimated lead time")
            : state.projectsRole.find((projectRole) => projectRole.name === "estimated lead time")
          let selected = role.selected
          let values = Object.entries(selected).slice(0, -1)
          let durations = values.reduce((previous, [duration, value]) => previous + parseInt(duration) * value, 0)
          let unitValues = { minute: 1, hour: 60, day: 1440, week: 10080 }
          durations = Math.max(durations, role.time)
          return {
            text: () =>
              durations > 0
                ? `About ${durations} ${selected.unit}${durations > 1 ? "s" : ""}`
                : "how long do you think it will take to complete?",
            value: () => durations,
            valid: () => !role.on || (role.on && durations > 0),
            submit: () => durations * unitValues[selected.unit],
          }
        },
        getLeadTime: (isTaskRole) =>
          isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "estimated lead time")
            : state.projectsRole.find((projectRole) => projectRole.name === "estimated lead time"),
        getLeadTimeValue: (isTaskRole, key) =>
          isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "estimated lead time").selected[key]
            : state.projectsRole.find((projectRole) => projectRole.name === "estimated lead time").selected[key],
        getReminder: (isTaskRole) =>
          isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "reminder")
            : state.projectsRole.find((projectRole) => projectRole.name === "reminder"),
        getLock: (isTaskRole) =>
          isTaskRole
            ? state.tasksRole.find((taskRole) => taskRole.name === "lock")
            : state.projectsRole.find((projectRole) => projectRole.name === "lock"),
        getProject: () =>
          state.tasksRole.find((taskRole) => taskRole.name === "project").selected !== "add new project",
        required: (isTaskRole) => {
          let selectedTags = isTaskRole
            ? state.tasksRole.filter((taskRole) => taskRole.on === true)
            : state.projectsRole.filter((projectRole) => projectRole.on === true)
          let selectedTagsName = selectedTags.map((selectedTag) => selectedTag.name)
          let requiredTagsName = isTaskRole ? ["name", "priority", "project"] : ["name", "priority"]
          return requiredTagsName.every((item) => selectedTagsName.includes(item))
        },
      }
    }
  },
  quotes: (state) => {
    const quotesLength = state.quotes.length
    const quoteIndex = Math.floor(Math.random() * quotesLength)
    return {
      quote: () => state.quotes[quoteIndex].quote,
      author: () => state.quotes[quoteIndex].author,
    }
  },
  timer: (state) => {
    return {
      getValue: () => state.timer.value,
      getSelectedValue: (key) => state.timer.selected[key],
      getSelectedDuration: () =>
        Object.entries(state.timer.selected).reduce(
          (result, [key, value]) => result + parseInt(key.split()[0]) * value,
          0
        ) * 60,
      getState: () => state.timer.on,
      getDuration: () => {
        const duration = state.timer.duration
        const seconds = duration % 60
        const minutes = (duration - seconds) / 60
        return {
          value: () => duration,
          text: () => `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`,
        }
      },
      getTasks: () => {
        const localStorageTasks = JSON.parse(localStorage.getItem("timer")).tasks.filter((task) => task.duration !== 0)
        const processingTasks = state.tasks
          .filter((task) => task.state === 1 && task.break.on)
          .map((filteredTask) => ({
            id: filteredTask.id,
            duration: filteredTask.break.time * 60,
          }))
        return {
          localStorageTasks: () => localStorageTasks,
          processingTasks: () => processingTasks,
          processingTasksId: () => processingTasks.map((task) => task.id),
          all: () =>
            [...localStorageTasks, ...processingTasks].reduce(
              (tasks, currentTask) =>
                tasks.some((task) => task.id === currentTask.id) ? tasks : [...tasks, currentTask],
              []
            ),
        }
      },
      getBreakTime: () => state.timer.tasks.some((task) => task.duration === 0),
    }
  },
}
