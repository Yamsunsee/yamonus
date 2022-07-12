<template>
  <div class="new__tag">
    <div class="tag__container">
      <Tag v-for="tag in tags().getUnselectedTasksRole()" :key="tag.name" :tag="tag" :isTaskRole="true"></Tag>
    </div>
    <Dropzone :title="option === 'add' ? 'add new task' : 'edit task'" :full="true">
      <div
        class="control"
        v-if="
          tags().required(true) &&
          tags().getName(true) &&
          tags().getProject() &&
          tags().getLeadTimeDurations(true).valid() &&
          tags().getDeadlineDurations(true).valid() &&
          tags().getBreakDurations(true).valid()
        "
      >
        <div class="control__icon" :class="{ hidden: option === 'edit' }" @click="handleLock()">
          <Tooltip v-if="tags().getLock(true).active" text="click to unlock selected tags" position="tt-right">
            <span class="material-icons"> lock </span>
          </Tooltip>
          <Tooltip v-else text="click to lock selected tags" position="tt-right">
            <span class="material-icons"> no_encryption_gmailerrorred </span>
          </Tooltip>
        </div>
        <div class="control__button" @click="handleSubmit">done</div>
        <div class="control__icon" @click="tagActions({ isTaskRole: true, option: 'toggleReminder' })">
          <Tooltip v-if="tags().getReminder(true).active" text="click to disable reminder" position="tt-left">
            <span class="material-icons"> notifications_active </span>
          </Tooltip>
          <Tooltip v-else text="click to active reminder" position="tt-left">
            <span class="material-icons"> notifications_off </span>
          </Tooltip>
        </div>
      </div>
      <div class="buttons">
        <div class="button" @click="tagActions({ isTaskRole: true, option: 'selectAll' })">select all</div>
        <div class="button" @click="tagActions({ isTaskRole: true, option: 'clearAll' })">clear all</div>
      </div>
      <Tag v-for="tag in tags().getSelectedTasksRole()" :key="tag.name" :tag="tag" :isTaskRole="true"></Tag>
    </Dropzone>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Dropzone from "../components/Dropzone.vue"
import Tag from "../components/Tag.vue"
import Tooltip from "../components/Tooltip.vue"

export default {
  props: ["option", "taskId"],
  components: { Tag, Dropzone, Tooltip },
  beforeCreate() {
    this.$store.commit("loadProjects")
    if (this.option === "edit") {
      this.$store.dispatch("loadTasksRole", { taskTargetId: this.taskId })
    }
  },
  computed: {
    ...mapGetters(["tags", "tasks"]),
  },
  methods: {
    ...mapActions(["tagActions", "localStorageActions"]),
    handleSubmit() {
      this.tagActions({ isTaskRole: true, option: "submit", value: this.taskId })
      this.localStorageActions({ option: "update" })
      if (this.option === "edit") {
        this.$router.push(`/arrange/${this.tasks(this.taskId).getProjectId()}`)
      } else {
        if (this.tags().getLock(true).active) {
          this.tagActions({ isTaskRole: true, option: "clearName" })
        } else {
          this.tagActions({ isTaskRole: true, option: "clearAll" })
        }
      }
    },
    handleLock() {
      if (this.option === "add") {
        this.tagActions({ isTaskRole: true, option: "toggleLock" })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;
.new__tag {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: inherit;
  padding: 1rem 1rem 1rem 2rem;
}
.tag__container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 2rem;
}

.control {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.2rem;
  z-index: 1;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $backgroundColor;

  &:hover {
    border-color: $darkGreen;
  }

  &__icon {
    cursor: pointer;
    color: $lightGreen;
    transition: ease-in-out 0.3s;

    &:hover {
      color: $darkGreen;
    }
  }

  &__button {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    color: white;
    background-color: $lightGreen;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.2rem;
    transition: ease-in-out 0.3s;

    &:hover {
      cursor: pointer;
      background-color: $darkGreen;
    }
  }
}
.buttons {
  width: 100%;
  display: flex;
  border-radius: inherit;
  justify-content: space-evenly;
  margin-bottom: 2rem;
}
.button {
  color: $textColor;
  text-transform: capitalize;
  padding: 0.5rem 1rem;
  border: dashed 2px $textColor;
  border-radius: inherit;
  transition: ease-in-out 0.3s;
  cursor: pointer;

  &:hover {
    color: $darkGreen;
    border-color: $darkGreen;
  }
}

.hidden {
  opacity: 0;
  cursor: unset;
}
</style>
