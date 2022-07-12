<template>
  <div class="greeting">
    <div class="name">
      <span v-if="name">Welcome back,</span>
      <span v-else>Welcome,</span>
      <p contenteditable="true" @keypress="handleKeypress" @blur="handleBlur">
        {{ name || "Buddy" }}
      </p>
      !
    </div>
    <i class="quote">
      <strong>
        <blockquote>{{ quotes.quote() }}</blockquote>
      </strong>
      ― {{ quotes.author() }} ―
    </i>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      name: "",
    }
  },
  beforeMount() {
    const userName = localStorage.getItem("userName")
    if (!userName) {
      localStorage.setItem("userName", this.name)
    } else {
      this.name = userName
    }
  },
  computed: {
    ...mapGetters(["quotes"]),
  },
  methods: {
    handleKeypress: (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.target.blur()
      }
    },
    handleBlur: (event) => {
      const data = event.target.innerText.slice(0, 15).trim() || "Buddy"
      event.target.innerText = data
      localStorage.setItem("userName", data)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.greeting {
  grid-column: 1 / 3;
  height: 100%;
  background-color: white;
  padding: 1rem;
  border-radius: inherit;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;

  .name {
    text-transform: uppercase;
    color: $darkGreen;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-right: 1rem;
    white-space: nowrap;

    p {
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 12rem;
      text-align: left;
      margin-left: 0.3em;

      &:focus {
        color: $lightGreen;
      }
    }
  }

  .quote {
    font-size: 0.8rem;
    color: $textColor;
    text-align: right;
  }
}
</style>
