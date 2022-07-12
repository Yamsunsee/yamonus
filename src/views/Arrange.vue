<template>
  <div class="arrange">
    <div class="arrange__header project" :class="projects(projectId).showPriority()">
      <div class="project__left">
        <div class="project__primary">
          <span v-if="projects(projectId).checkCompleted()" class="material-icons bold margin-right">
            check_circle
          </span>
          <span v-else class="material-icons bold margin-right"> radio_button_unchecked </span>
          <div class="text" :class="{ completed: projects(projectId).checkCompleted() }">
            {{ projects(projectId).showName() }}
          </div>
          <div v-if="projects(projectId).checkReminder()" class="reminder">
            <Tooltip v-if="projects(projectId).checkCompleted()" text="reminder: OFF" position="tt-right">
              <span class="material-icons margin-left"> notifications_off </span>
            </Tooltip>
            <Tooltip v-else text="reminder: ON" position="tt-right">
              <span class="material-icons margin-left"> notifications_active </span>
            </Tooltip>
          </div>
        </div>
        <div class="project__secondary">
          <div class="project__secondary--left">
            <div v-if="projects(projectId).checkProcessing()" class="project__secondary--item">
              <span class="material-icons margin-right spin"> hourglass_empty </span>
              Processing
            </div>
            <div v-else-if="projects(projectId).checkCompleted()" class="project__secondary--item">
              <span class="material-icons margin-right"> timer_off </span>
              Completed
            </div>
            <div v-else class="project__secondary--item">
              <span class="material-icons margin-right"> timer </span>
              Pending
            </div>
          </div>
          <div v-if="projects(projectId).checkDuration()" class="project__secondary--middle">
            <span class="material-icons margin-right"> timelapse </span>
            {{ projects(projectId).showDuration() }}
          </div>
          <div v-if="projects(projectId).checkDeadline()" class="project__secondary--right">
            <span class="material-icons margin-right"> event_note </span>
            {{ projects(projectId).showDeadline() }}
          </div>
        </div>
      </div>
      <div class="project__middle">
        <div class="project__progress" :class="projects(projectId).showPriority()">
          <div class="project__progress--percent">{{ projects(projectId).showProgress().quantify() }}</div>
          <svg width="44" height="44">
            <circle cx="22" cy="22" r="20"></circle>
            <circle cx="22" cy="22" r="20" :style="projects(projectId).getProgressPercent()"></circle>
          </svg>
        </div>
      </div>
      <div class="project__right">
        <div
          v-if="this.more"
          class="project__expand"
          :class="projects(projectId).showPriority()"
          @mouseleave="handleMouseLeave"
        >
          <Tooltip text="edit" position="tt-left">
            <router-link :to="`/project/edit/${projectId}`" class="link">
              <span class="material-icons project__expand--item"> edit </span>
            </router-link>
          </Tooltip>
          <router-link to="/projects" class="link">
            <Tooltip text="delete" position="tt-left">
              <span @click="handleDelete(projectId)" class="material-icons project__expand--item">
                delete_forever
              </span>
            </Tooltip>
          </router-link>
        </div>
        <Tooltip v-else text="more" position="tt-left">
          <div class="project__shrink" @click="handleMouseClick">
            <span class="material-icons"> more_vert </span>
          </div>
        </Tooltip>
      </div>
    </div>
    <div class="arrange__content">
      <Dropzone state="pending" title="pending">
        <div class="task__container">
          <Task v-for="task in projects(projectId).getPendingTasks()" :key="task.id" :taskId="task.id" />
        </div>
      </Dropzone>
      <Dropzone state="processing" title="processing">
        <div class="task__container">
          <Task v-for="task in projects(projectId).getProcessingTasks()" :key="task.id" :taskId="task.id" />
        </div>
      </Dropzone>
      <Dropzone state="completed" title="completed">
        <div class="task__container">
          <Task v-for="task in projects(projectId).getCompletedTasks()" :key="task.id" :taskId="task.id" />
        </div>
      </Dropzone>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Dropzone from "../components/Dropzone.vue"
import Task from "../components/Task.vue"
import Tooltip from "../components/Tooltip.vue"

export default {
  data() {
    return {
      more: false,
    }
  },
  props: ["projectId"],
  components: { Task, Dropzone, Tooltip },
  computed: {
    ...mapGetters(["projects"]),
  },
  methods: {
    ...mapActions(["projectActions", "localStorageActions"]),
    handleMouseClick() {
      this.more = true
    },
    handleMouseLeave() {
      this.more = false
    },
    handleDelete(projectId) {
      document.querySelector(".link").click()
      setTimeout(() => {
        document.querySelector(`[id='${projectId}']`).classList.add("delete")
      }, 500)
      setTimeout(() => {
        this.projectActions({ projectTargetId: projectId, option: "delete" })
        this.localStorageActions({ option: "update" })
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.arrange {
  height: calc(100vh - 2rem);
  flex-grow: 1;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &__content {
    width: 100%;
    max-height: calc(100% - 6.5rem);
    display: flex;
    justify-content: space-between;
    border-radius: inherit;
    margin-top: 1rem;
  }
}

.task__container {
  display: flex;
  flex-direction: column;
  border-radius: inherit;
}

.project {
  width: 100%;
  height: 5.5rem;
  background-color: white;
  padding: 1rem;
  border-radius: inherit;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

  &__progress {
    position: relative;
    width: fit-content;

    &--percent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -55%);
      font-size: 0.6rem;
      font-weight: 700;
      z-index: 1;
    }

    svg {
      transform: rotateZ(-90deg);
    }

    circle {
      fill: none;
      stroke-width: 0.25rem;
      stroke-linecap: round;

      &:nth-child(1) {
        stroke: $textColor;
      }

      &:nth-child(2) {
        stroke: currentColor;
        stroke-dasharray: 126;
        stroke-dashoffset: calc(126 * (100 - var(--percent)) / 100);
      }
    }
  }

  &__primary {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__secondary {
    width: fit-content;
    color: $textColor;
    display: flex;

    &--item,
    &--middle,
    &--right {
      display: flex;
      align-items: center;
    }

    &--middle {
      margin-right: 2rem;
    }

    &--left {
      margin-right: 2rem;
    }
  }

  &::before {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 100%;
    background-color: currentColor;
    top: 0;
    right: 0;
  }

  &__right,
  &__middle {
    color: $textColor;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  &__right {
    min-width: 10rem;
  }

  &__middle {
    flex: 1;
  }

  &__shrink,
  &__expand {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $textColor !important;
  }

  &__expand {
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .link {
      text-decoration: none;
      color: $textColor !important;
    }
    &.low &--item:hover {
      color: $darkGreen !important;
    }
    &.medium &--item:hover {
      color: $darkYellow !important;
    }
    &.high &--item:hover {
      color: $darkRed !important;
    }
  }
}

.text.completed {
  opacity: 0.5;
  text-decoration: line-through;
}

.reminder {
  display: flex;
  align-items: center;
}

.low {
  color: $darkGreen;
}

.medium {
  color: $darkYellow;
}

.high {
  color: $darkRed;
}

.spin {
  animation: spin 2s linear infinite;

  @keyframes spin {
    0%,
    20% {
      transform: rotateZ(0deg);
    }

    50%,
    70% {
      transform: rotateZ(180deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}
</style>
