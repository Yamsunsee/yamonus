<template>
  <div class="progress">
    <div class="progress__header">Progress</div>
    <div class="progress__content">
      <div class="progress__percent">{{ isNaN(projects().progress()) ? "" : projects().progress() }}%</div>
      <svg width="256" height="256" class="projects">
        <circle cx="128" cy="128" r="122"></circle>
        <circle cx="128" cy="128" r="122" :style="`--percent: ${projects().progress() || 0}`"></circle>
      </svg>
      <div class="progress__percent">{{ isNaN(tasks().progress()) ? "" : tasks().progress() }}%</div>
      <svg width="224" height="224" class="tasks">
        <circle cx="112" cy="112" r="108"></circle>
        <circle cx="112" cy="112" r="108" :style="`--percent: ${tasks().progress() || 0}`"></circle>
      </svg>
    </div>
    <div class="progress__footer">
      <div class="progress__footer--item">Tasks</div>
      <div class="progress__footer--item">Projects</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(["projects", "tasks"]),
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.progress {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  background-color: white;
  padding: 1rem;
  border-radius: inherit;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

  &__header {
    text-transform: uppercase;
    font-size: 2rem;
    color: $darkGreen;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }

  &__footer {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1rem;

    &--item {
      text-transform: uppercase;
      font-weight: bold;
      position: relative;

      &:nth-child(1) {
        color: $lightGreen;

        &::before {
          left: -1.2rem;
          border-radius: 0.8rem 0 0 0;
        }
      }

      &:nth-child(2) {
        color: $darkGreen;

        &::before {
          right: -1.2rem;
          border-radius: 0 0.8rem 0 0;
        }
      }

      &::before {
        content: "";
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        background-color: currentColor;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  &__percent {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -55%);
    font-weight: 700;
    z-index: 1;

    &:nth-of-type(1) {
      top: 55%;
      font-size: 2rem;
      color: $darkGreen;
    }

    &:nth-of-type(2) {
      top: 45%;
      color: $lightGreen;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg.projects {
      transform: rotateZ(-90deg);

      circle {
        fill: none;
        stroke-linecap: round;

        &:nth-child(1) {
          stroke: $textColor;
          stroke-width: 0.75rem;
        }

        &:nth-child(2) {
          stroke: $darkGreen;
          stroke-width: 0.75rem;
          stroke-dasharray: 767;
          stroke-dashoffset: calc(767 * (100 - var(--percent)) / 100);
        }
      }
    }

    svg.tasks {
      position: absolute;
      transform: rotateZ(-90deg);

      circle {
        fill: none;
        stroke-linecap: round;

        &:nth-child(1) {
          stroke: $textColor;
          stroke-width: 0.5rem;
        }

        &:nth-child(2) {
          stroke: $lightGreen;
          stroke-width: 0.5rem;
          stroke-dasharray: 678;
          stroke-dashoffset: calc(678 * (100 - var(--percent)) / 100);
        }
      }
    }
  }
}
</style>
