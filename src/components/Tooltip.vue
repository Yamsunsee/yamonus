<template>
  <div :class="[{ tooltip: text !== '' }, position]" :text="text">
    <slot />
  </div>
</template>

<script>
export default {
  props: ["text", "position"],
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;
.tooltip {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;

  &:hover {
    &::before {
      content: attr(text);
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(0, -1.5rem);
      width: max-content;
      text-align: center;
      color: white;
      background-color: #777a;
      font-weight: normal;
      font-size: 0.6rem;
      padding: 0.3rem 0.5rem;
      border-radius: 0.2rem;
      z-index: 1;
    }
  }

  &.tt-left:hover::before {
    top: 50%;
    left: -0.5rem;
    transform: translate(-100%, -50%);
  }

  &.tt-right:hover::before {
    top: 50%;
    left: 100%;
    transform: translate(0.5rem, -50%);
  }
}
</style>
