<template>
  <Responsive />
  <Sidebar />
  <Break />
  <router-view v-slot="{ Component }">
    <transition name="route" :enter-from-class="$route.meta.enter" :leave-to-class="$route.meta.leave" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Messages />
</template>

<script>
import Messages from "./components/Messages.vue"
import Sidebar from "./components/Sidebar.vue"
import Break from "./components/Break.vue"
import Responsive from "./components/Responsive.vue"

export default {
  name: "App",
  components: { Sidebar, Messages, Break, Responsive },
  beforeCreate() {
    this.$store.dispatch("localStorageActions", { option: "load" })
  },
}
</script>

<style lang="scss">
@use "./assets/styles" as *;

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: auto;
  width: 100%;
  max-width: 83rem;
  min-height: calc(100vh - 2rem);
  background-color: $backgroundColor;
  display: flex;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0 0.25rem 0.75rem;
  overflow: hidden;
  position: relative;
}

.up {
  opacity: 0;
  transform: translateX(-2rem) rotateX(45deg);
}

.down {
  opacity: 0;
  transform: translateX(2rem) rotateX(-45deg);
}

.left {
  opacity: 0;
  transform: translateY(-2rem) rotateY(45deg);
}

.right {
  opacity: 0;
  transform: translateY(2rem) rotateY(-45deg);
}

.route-enter-active,
.route-leave-active {
  transition: ease-in-out 0.2s;
}
</style>
