<template>
  <div class="error">
    <div class="error__header">Page not found!</div>
    <img src="../assets/images/404.png" alt="Page not found" />
    <router-link to="/" class="link">Back to dashboard</router-link>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles" as *;
.error {
  background-color: $backgroundColor;
  border-radius: inherit;
  flex: 1;
  padding: 1rem;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 40rem;
    object-fit: contain;
    border-radius: inherit;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  }

  &__header {
    text-transform: uppercase;
    font-size: 2rem;
    color: $darkGreen;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .link {
    margin-top: 1rem;
    text-decoration: none;
    width: fit-content;
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
}
</style>
