<template>
  <div v-if="visible" class="message" :class="[type, { remove }]" @click="handleClick">
    <div class="message__icon">
      <span v-if="type === 'success'" class="material-icons"> check_circle </span>
      <span v-else-if="type === 'warning'" class="material-icons"> warning </span>
      <span v-else class="material-icons"> error </span>
    </div>
    <div class="message__content">
      <div class="message__title">{{ title }}</div>
      <div class="message__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  props: ["id", "title", "type", "text"],
  data() {
    return {
      visible: true,
      remove: false,
    }
  },
  created() {
    setTimeout(() => (this.remove = true), 2500)
    setTimeout(() => {
      this.visible = false
      this.messageActions(this.id)
    }, 3000)
  },
  methods: {
    ...mapActions(["messageActions"]),
    handleClick() {
      this.remove = true
      setTimeout(() => {
        this.visible = false
        this.messageActions(this.id)
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.message {
  width: fit-content;
  min-width: 20rem;
  max-width: 30rem;
  padding: 1rem;
  background-color: white;
  border-left: solid 0.3rem;
  border-radius: 0.3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  display: flex;
  align-items: center;
  animation: create 0.6s ease-out forwards;
  margin-top: 1rem;
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 0.2rem;
    background-color: $textColor;
    animation: timer 2s linear 0.5s forwards;
  }

  &__icon {
    margin-right: 0.5rem;
  }

  &__title {
    font-weight: 500;
    text-transform: capitalize;
  }

  &__text {
    color: $textColor;
    font-size: 0.8rem;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &.success {
    color: $darkGreen;
  }

  &.warning {
    color: $darkYellow;
  }

  &.error {
    color: $darkRed;
  }

  &.remove {
    animation: remove 0.6s ease-in;
  }
}

@keyframes create {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }

  50% {
    opacity: 1;
    transform: translateY(20%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes remove {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(20%);
  }

  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@keyframes timer {
  to {
    width: 0;
  }
}
</style>
