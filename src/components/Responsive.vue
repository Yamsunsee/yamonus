<template>
  <div class="responsive">
    <div class="responsive__header">
      <div>So sorry!</div>
      <div>You device resolution is not supported!</div>
      <p>Please use appropriate devices! (with minimum resolution is 1280 pixels)</p>
    </div>
    <img src="../assets/images/responsive.png" alt="Responsive" />
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles" as *;
.responsive {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 2rem);
  background-color: $backgroundColor;
  border-radius: inherit;
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 40%;
    min-width: 16rem;
    object-fit: contain;
    border-radius: inherit;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  }

  &__header {
    color: $darkGreen;
    text-align: center;
    margin-bottom: 2rem;

    & > div {
      text-transform: uppercase;
      font-size: 3vw;
      font-weight: bold;
    }

    p {
      font-size: 1.5vw;
      font-style: italic;
    }
  }
}

@media screen and (min-width: 79.9375em) {
  .responsive {
    display: none;
  }
}
</style>
