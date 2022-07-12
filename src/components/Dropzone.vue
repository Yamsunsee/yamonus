<template>
  <div
    class="dropzone"
    :class="{ extraPadding: extraPadding }"
    :data-title="title"
    @dragenter.prevent="dragEnter"
    @dragleave.prevent="dragLeave"
    @dragover.prevent
    @drop="drop"
  >
    <div class="task__container" @dragover.stop>
      <slot />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: ["title", "extraPadding"],
  methods: {
    ...mapActions(["taskActions", "tagActions", "localStorageActions"]),
    drop(event) {
      const projectId = event.dataTransfer.getData("projectId")
      const taskId = event.dataTransfer.getData("taskId")
      const tagId = event.dataTransfer.getData("tagId")
      if (projectId !== "") {
        const project = document.getElementById(projectId)
        const projectSkeleton = document.createElement("div")
        project.style.display = "none"
        projectSkeleton.innerText = "The project has been selected"
        Object.assign(projectSkeleton.style, {
          width: "100%",
          height: "5.5rem",
          padding: "1rem",
          display: "flex",
          color: "#d1d0c5",
          border: "dashed 2px #d1d0c5",
          "text-align": "center",
          "border-radius": "inherit",
          "justify-content": "center",
          "align-items": "center",
          "text-transform": "uppercase",
        })
        event.target.appendChild(projectSkeleton)
        event.target.classList.remove("target")
        event.target.appendChild(project)
      } else if (taskId !== "") {
        const task = document.getElementById(taskId)
        event.target.classList.remove("target")
        event.target.appendChild(task)
        this.taskActions({ taskTargetId: taskId, option: event.target.getAttribute("state") })
        this.localStorageActions({ option: "update" })
      } else if (tagId !== "") {
        const tag = document.getElementById(tagId)
        tag.style.opacity = 1
        event.target.classList.remove("target")
        event.target.appendChild(tag)
        this.tagActions({ tagName: tagId, isTaskRole: tag.getAttribute("istaskrole") === "true", option: "on" })
        if (tagId === "deadline") {
          this.tagActions({
            tagName: tagId,
            isTaskRole: tag.getAttribute("istaskrole") === "true",
            option: "deadline",
            value: tag.querySelector("input").value,
          })
        }
      }
    },
    dragEnter: (event) => {
      event.target.classList.add("target")
    },
    dragLeave: (event) => {
      event.target.classList.remove("target")
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.dropzone {
  width: 20rem;
  min-width: 20rem;
  min-height: 20rem;
  max-height: calc(100vh - 4rem);
  border: dashed 2px $textColor;
  border-radius: inherit;
  padding: 5rem 1rem 0 1rem;
  overflow-x: scroll;
  overflow-y: auto;
  position: relative;

  &::before {
    content: attr(data-title);
    position: absolute;
    padding: 1rem;
    color: $textColor;
    width: calc(100% - 2rem);
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.2rem;
    border-bottom: inherit;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &.target {
    border: dashed 2px $darkGreen;

    &::before {
      color: $darkGreen;
    }
  }

  &.extraPadding {
    padding-top: 7rem;
  }
}

.task__container {
  border-radius: inherit;
}
</style>
