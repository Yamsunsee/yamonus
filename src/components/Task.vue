<template>
  <div
    class="task"
    :class="[tasks(taskId).showPriority(), { delete: this.delete }]"
    :id="taskId"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover.stop
  >
    <div class="task__left">
      <div
        class="task__primary"
        @click="
          taskActions({ taskTargetId: taskId, option: 'toggleCompleted' }), localStorageActions({ option: 'update' })
        "
      >
        <span v-if="tasks(taskId).checkCompleted()" class="material-icons margin-right"> check_circle </span>
        <span v-else class="material-icons margin-right"> radio_button_unchecked </span>
        <div class="text" :class="{ completed: tasks(taskId).checkCompleted() }">
          {{ tasks(taskId).showName() }}
        </div>
      </div>
      <div class="task__secondary">
        <div
          class="task__secondary--left"
          @click="
            taskActions({ taskTargetId: taskId, option: 'toggleState' }), localStorageActions({ option: 'update' })
          "
        >
          <Tooltip v-if="tasks(taskId).checkPending()" text="pending">
            <span class="material-icons margin-right"> timer </span>
          </Tooltip>
          <Tooltip v-else-if="tasks(taskId).checkProcessing()" text="processing">
            <span class="material-icons margin-right spin"> hourglass_empty </span>
          </Tooltip>
          <Tooltip v-else text="completed">
            <span class="material-icons margin-right"> timer_off </span>
          </Tooltip>
        </div>
        <div class="task__secondary--right">
          <Tooltip v-if="tasks(taskId).checkDuration()" :text="tasks(taskId).showDuration()">
            <span class="material-icons margin-right"> timelapse </span>
          </Tooltip>
          <Tooltip v-if="tasks(taskId).checkDeadline()" :text="tasks(taskId).showDeadline()">
            <span class="material-icons margin-right"> event_note </span>
          </Tooltip>
          <Tooltip v-if="tasks(taskId).checkBreak()" :text="tasks(taskId).showBreak()">
            <span class="material-icons margin-right"> emoji_food_beverage </span>
          </Tooltip>
          <div v-if="tasks(taskId).checkReminder()" class="reminder">
            <Tooltip v-if="tasks(taskId).checkCompleted()" text="reminder: OFF">
              <span class="material-icons"> notifications_off </span>
            </Tooltip>
            <Tooltip v-else text="reminder: ON">
              <span class="material-icons"> notifications_active </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="task__right">
      <div v-if="this.more" class="task__expand" :class="tasks(taskId).showPriority()" @mouseleave="handleMouseLeave">
        <Tooltip text="edit" position="tt-left">
          <router-link :to="`/task/edit/${taskId}`" class="link">
            <span class="material-icons task__expand--item"> edit </span>
          </router-link>
        </Tooltip>
        <Tooltip text="delete" position="tt-left">
          <span @click="handleDelete(taskId)" class="material-icons task__expand--item"> delete_forever </span>
        </Tooltip>
      </div>
      <Tooltip v-else text="more" position="tt-left">
        <div class="task__shrink" @click="handleMouseClick">
          <span class="material-icons"> more_vert </span>
        </div>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Tooltip from "./Tooltip.vue"

export default {
  data() {
    return {
      more: false,
      delete: false,
    }
  },
  props: ["taskId"],
  components: { Tooltip },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapActions(["taskActions", "localStorageActions"]),
    dragStart: (event) => {
      event.dataTransfer.setData("taskId", event.target.id)
      event.target.style.opacity = 0.5
    },
    dragEnd: (event) => {
      event.target.style.opacity = 1
    },
    handleMouseClick() {
      this.more = true
    },
    handleMouseLeave() {
      this.more = false
    },
    handleDelete(taskId) {
      this.delete = true
      setTimeout(() => {
        this.taskActions({ taskTargetId: taskId, option: "delete" })
        this.localStorageActions({ option: "update" })
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

[draggable] {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
.task {
  margin: auto;
  width: 100%;
  max-width: 50rem;
  background-color: white;
  padding: 1rem;
  border-radius: inherit;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  text-transform: capitalize;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

  &__primary {
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }

  &__secondary {
    width: fit-content;
    color: $textColor;
    display: flex;

    &--right {
      display: flex;
      align-items: center;
    }

    &--left:hover {
      cursor: pointer;
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

.low {
  color: $darkGreen;
}

.medium {
  color: $darkYellow;
}

.high {
  color: $darkRed;
}

.delete {
  animation: fade 0.5s ease-in forwards;

  @keyframes fade {
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
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
