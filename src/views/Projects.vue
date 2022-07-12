<template>
  <div class="project">
    <router-link v-if="projects().empty()" to="/project/add/_" class="link" draggable="false">
      <span class="material-icons margin-right"> library_add </span>
      add new project
    </router-link>
    <div class="project__container">
      <Project v-for="project in projects().all()" :key="project.id" :projectId="project.id" />
    </div>
    <Dropzone @dragend="go" title="drag and drop a project here to continue" :extraPadding="true" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Dropzone from "../components/Dropzone.vue"
import Project from "../components/Project.vue"

export default {
  components: { Project, Dropzone },
  computed: {
    ...mapGetters(["projects"]),
  },
  methods: {
    go(event) {
      this.$router.push(`/arrange/${event.target.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.project {
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  height: fit-content;
  border-radius: inherit;
  max-height: calc(100vh - 2rem);
}

.project__container {
  max-height: calc(100vh - 4rem);
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  margin-right: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
}

.link {
  text-decoration: none;
  width: 100%;
  color: $darkGreen;
  background-color: white;
  text-transform: capitalize;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ease-in-out 0.3s;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

  &:hover {
    color: white;
    background-color: $darkGreen;
    box-shadow: inset rgba(50, 50, 93, 0.25) 0 2px 5px -1px, inset rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  }
}
</style>
