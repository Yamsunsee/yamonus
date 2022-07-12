<template>
  <div class="dashboard">
    <Greeting />
    <Progress />
    <Calendar />
  </div>
</template>

<script>
import Calendar from "../components/Calendar.vue"
import Progress from "../components/Progress.vue"
import Greeting from "../components/Greeting.vue"

export default {
  components: { Calendar, Progress, Greeting },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;
.dashboard {
  background-color: $backgroundColor;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: inherit;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 1fr 1fr;
  max-height: calc(100vh - 2rem);
}
</style>
