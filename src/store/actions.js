export default {
  taskActions: ({ commit, getters }, { taskTargetId, option }) => {
    commit("tasks", { getters, taskTargetId, option })
  },
  projectActions: ({ commit, getters }, { projectTargetId, option }) => {
    commit("projects", { getters, projectTargetId, option })
  },
  tagActions: ({ commit, getters }, { tagName, isTaskRole, option, value }) => {
    commit("tags", { getters, tagName, isTaskRole, option, value })
  },
  messageActions: ({ commit }, messageId) => {
    commit("removeMessage", messageId)
  },
  loadTasksRole: ({ commit, getters }, { taskTargetId }) => {
    commit("loadTasksRole", { getters, taskTargetId })
  },
  loadProjectsRole: ({ commit, getters }, { projectTargetId }) => {
    commit("loadProjectsRole", { getters, projectTargetId })
  },
  localStorageActions: ({ commit }, { option }) => {
    commit("localStorageActions", { option })
  },
  timerActions: ({ commit, getters }, { option, payload }) => {
    commit("timer", { getters, option, payload })
  },
}
