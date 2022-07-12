<template>
  <div class="sidebar">
    <div class="sidebar__top">
      <Logo />
      <router-link to="/" class="link">
        <span class="material-icons margin-right">dashboard</span>
        <span>Dashboard</span>
      </router-link>
      <router-link to="/projects" class="link projects">
        <span class="material-icons margin-right">library_books</span>
        <span>Projects</span>
      </router-link>
    </div>
    <div class="sidebar__bottom">
      <div class="addButton">
        <span class="material-icons margin-right"> playlist_add_circle </span>
        <span>Add</span>
      </div>
      <div class="addOptions">
        <router-link to="/task/add/_" class="addOptions__item">
          <div class="taskButton" @click="tagActions({ isTaskRole: true, option: 'clearAll' })">New Task</div>
        </router-link>
        <router-link to="/project/add/_" class="addOptions__item">
          <div class="projectButton" @click="tagActions({ isTaskRole: false, option: 'clearAll' })">New Project</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Logo from "./Logo.vue"

export default {
  components: { Logo },
  computed: {
    ...mapGetters(["tags"]),
  },
  methods: {
    ...mapActions(["tagActions"]),
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.sidebar {
  width: 13rem;
  min-height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;

  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:hover > .addOptions {
      opacity: 1;
      transform: translateY(-100%);
    }

    &:hover > .addButton {
      cursor: pointer;
      color: white;
      background-color: $darkGreen;
      box-shadow: inset rgba(50, 50, 93, 0.25) 0 2px 5px -1px, inset rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
    }
  }
}

.addButton {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $darkGreen;
  background-color: white;
  width: 10rem;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 1rem;
  margin-bottom: 1rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  transition: ease-in-out 0.3s;
  z-index: 1;
}

.addOptions {
  width: 100%;
  opacity: 0;
  position: absolute;
  transform: translateY(0%);
  transition: ease-in-out 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__item {
    text-decoration: none;
  }
}

.taskButton,
.projectButton {
  font-weight: 700;
  text-transform: uppercase;
  color: $darkGreen;
  background-color: white;
  padding: 0.5rem;
  width: 10rem;
  border-radius: 1rem;
  text-align: center;
  transition: ease-in-out 0.3s;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: $darkGreen;
    box-shadow: inset rgba(50, 50, 93, 0.25) 0 2px 5px -1px, inset rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  }
}

.link {
  width: fit-content;
  align-self: flex-start;
  text-decoration: none;
  color: $textColor;
  padding: 1.5rem 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 4rem 0 0 4rem;
  margin-left: 1rem;
  display: flex;

  &.projects {
    padding: 1.5rem 2.5rem 1.5rem 1rem;
  }
}

.router-link-active {
  color: $darkGreen;
  background-color: $backgroundColor;
  transition: ease-in-out 0.3s;
}
</style>
