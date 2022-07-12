<template>
  <div class="logo">
    <img src="../assets/images/logo.png" alt="logo" />
    <div>
      <div class="note">todolist</div>
      <div>
        <span class="author">yam</span>
        <span class="name">onus</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.logo {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

img {
  width: 2.5rem;
  height: 1.875rem;
  margin-bottom: 0.375rem;
}

.note {
  font-size: 0.75rem;
  font-weight: 900;
  color: $darkYellow;
  margin-bottom: -0.875rem;
  letter-spacing: 0.1625rem;
}

.author,
.name {
  font-size: 2rem;
  font-weight: 900;
}

.author {
  color: $darkGreen;
}

.name {
  color: $darkRed;
}
</style>
