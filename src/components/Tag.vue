<template>
  <div
    :id="tag.name"
    :istaskrole="isTaskRole"
    v-if="tag.name !== 'reminder' && tag.name !== 'lock'"
    class="tag"
    :draggable="!tag.on"
    @dragstart="dragStart"
    @dragend="dragEnd"
    @dragover.stop
  >
    <div class="required" v-if="'name priority project'.includes(tag.name) && !tag.on" title="Required">
      <span class="material-icons"> stars </span>
    </div>
    <div class="tag__name">{{ tag.name }}</div>
    <div class="tag__values" v-if="!tag.on" :class="{ project: tag.name === 'project' }">
      <div
        class="tag__values--item"
        v-for="value in tag.value"
        :key="value"
        :for="value"
        :data-breakValue="'x' + tags().getBreakValue(value)"
        :data-leadTimeValue="'x' + tags().getLeadTimeValue(isTaskRole, value)"
        :class="{
          selected:
            tag.selected === value ||
            tag.name === 'name' ||
            (tag.name === 'take a break' && tags().getBreakValue(value) > 0) ||
            (tag.name === 'estimated lead time' && tags().getLeadTimeValue(isTaskRole, value) > 0),
          breakNumber: tag.name === 'take a break' && tags().getBreakValue(value) > 0,
          leadTimeNumber: tag.name === 'estimated lead time' && tags().getLeadTimeValue(isTaskRole, value) > 0,
        }"
        @click="tagActions({ tagName: tag.name, isTaskRole: isTaskRole, option: 'selected', value: value })"
      >
        <div
          v-if="tag.name === 'name'"
          contenteditable="true"
          placeholder="click here to change"
          @blur="handleBlurName($event, tag.name, isTaskRole)"
          @keypress="handleKeypress"
          class="tag__title"
        >
          {{ value }}
        </div>
        <div v-else-if="value === 'add new project'">
          <router-link to="/project/add/_" class="newProject">
            <span class="material-icons margin-right"> library_add </span>
            {{ value }}
          </router-link>
        </div>
        <div v-else>{{ value }}</div>
      </div>
      <div
        class="tag__values--item deadline"
        :class="{ selected: tags().getDeadlineSelected(isTaskRole) }"
        v-if="tag.name === 'deadline'"
      >
        <input
          type="date"
          min="2021-01-01"
          max="2025-12-31"
          @blur="handleBlurDeadline($event, tag.name, isTaskRole)"
          @keypress="handleKeypress"
        />
      </div>
      <div
        class="tag__values--item dropdown"
        :class="{
          selected: tags().getLeadTimeDurations(isTaskRole).value() > 0,
        }"
        v-else-if="tag.name === 'estimated lead time'"
      >
        <div
          v-show="tags().getLeadTimeDurations(isTaskRole).value() > 0"
          class="dropdown__item"
          :class="{ selected: item === tag.selected['unit'] }"
          v-for="item in ['minute', 'hour', 'day', 'week']"
          :key="item"
          @click="tagActions({ tagName: tag.name, isTaskRole: isTaskRole, option: 'unit', value: item })"
        >
          {{ tags().getLeadTimeDurations(isTaskRole).value() > 1 ? item + "s" : item }}
        </div>
        {{ tags().getLeadTimeDurations(isTaskRole).value() > 1 ? tag.selected["unit"] + "s" : tag.selected["unit"] }}
      </div>
    </div>
    <div class="tag__values--item selected" v-else>
      <div v-if="tag.name === 'name'" class="tag__title selected" :class="{ error: !tags().getName(isTaskRole) }">
        {{ tag.value[0] === "" ? "untitled" : tag.value[0] }}
      </div>
      <div v-else-if="tag.name === 'take a break'" :class="{ error: !tags().getBreakDurations(isTaskRole).valid() }">
        {{ tags().getBreakDurations().text() }}
      </div>
      <div
        v-else-if="tag.name === 'estimated lead time'"
        :class="{ error: !tags().getLeadTimeDurations(isTaskRole).valid() }"
      >
        {{ tags().getLeadTimeDurations(isTaskRole).text() }}
      </div>
      <div v-else-if="tag.name === 'deadline'" :class="{ error: !tags().getDeadlineDurations(isTaskRole).valid() }">
        {{ tags().getDeadlineDurations(isTaskRole).text() }}
      </div>
      <div v-else-if="tag.name === 'project'" :class="{ error: !tags().getProject() }">
        {{ tag.selected === "add new project" ? "do you have any project?" : tag.selected }}
      </div>
      <div v-else>{{ tag.selected }}</div>
    </div>
    <div v-if="tag.on" @click="tagActions({ tagName: tag.name, isTaskRole: isTaskRole, option: 'reset' })">
      <span class="material-icons margin-left tag__button">delete_forever</span>
    </div>
    <div
      v-if="!tag.on && tag.name === 'take a break'"
      @click="tagActions({ tagName: tag.name, isTaskRole: isTaskRole, option: 'reset' })"
    >
      <span class="material-icons margin-left tag__button">replay</span>
    </div>
    <div
      v-if="!tag.on && tag.name === 'estimated lead time'"
      @click="tagActions({ tagName: tag.name, isTaskRole: isTaskRole, option: 'reset' })"
    >
      <span class="material-icons margin-left tag__button">replay</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  props: ["tag", "isTaskRole"],
  computed: {
    ...mapGetters(["projects", "tags"]),
  },
  methods: {
    ...mapActions(["tagActions"]),
    dragStart: (event) => {
      event.dataTransfer.setData("tagId", event.target.id)
      event.target.style.opacity = 0.5
    },
    dragEnd: (event) => {
      event.target.style.opacity = 1
    },
    handleBlurName(event, tagName, isTaskRole) {
      event.target.innerText = event.target.innerText.trim()
      this.tagActions({
        tagName: tagName,
        isTaskRole: isTaskRole,
        option: "change",
        value: event.target.innerText.toLowerCase(),
      })
    },
    handleBlurDeadline(event, tagName, isTaskRole) {
      this.tagActions({
        tagName: tagName,
        isTaskRole: isTaskRole,
        option: "deadline",
        value: event.target.value,
      })
    },
    handleKeypress: (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.target.blur()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

[draggable="true"] {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
.tag {
  width: 100%;
  max-width: 50rem;
  height: fit-content;
  padding: 0.5rem;
  color: $textColor;
  border: dashed 2px $textColor;
  border-radius: 1rem;
  text-transform: capitalize;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .required {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2em;
    height: 2rem;
    border: dashed 2px currentColor;
    background-color: $backgroundColor;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__name {
    position: absolute;
    top: 0%;
    left: 1rem;
    transform: translateY(-60%);
    background-color: $backgroundColor;
    padding: 0 0.3rem;
  }

  &__title {
    cursor: text;
    max-width: 30rem;
    max-height: 3rem;
    overflow-y: auto;
    overflow-wrap: break-word;
    word-wrap: break-word;

    &.selected {
      max-width: 10rem;
      overflow-y: unset;
      max-height: unset;
    }

    &::-webkit-scrollbar {
      width: 0.5rem;

      &-track {
        background-color: $lightGreen;
        border-radius: 0.5rem;
      }

      &-thumb {
        background-color: white;
        border-radius: 0.5rem;
      }
    }

    &:focus {
      color: $lightGreen;
    }

    &[placeholder]:empty::before {
      content: attr(placeholder);
    }
  }

  &__values {
    max-height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;

    &.project {
      overflow-y: auto;
      flex-wrap: wrap;
    }

    &::-webkit-scrollbar {
      width: 0.5rem;

      &-track {
        background-color: $lightGreen;
        border-radius: 0.5rem;
      }

      &-thumb {
        background-color: $darkGreen;
        border-radius: 0.5rem;
      }
    }

    &--item {
      width: fit-content;
      height: fit-content;
      padding: 0.5rem 2rem;
      color: white;
      background-color: $lightGreen;
      border-radius: inherit;
      margin: 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;

      &:hover,
      &.selected {
        background-color: $darkGreen;
      }
      .error::before {
        font-family: "Material Icons";
        content: "\e85a";
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.5rem;
        transform: translate(50%, -50%);
        color: $darkRed;
      }
    }
  }

  &__button {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: $backgroundColor;
    border: dashed 2px $darkGreen;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: translate(25%, 25%);
    transition: ease-in-out 0.3s;

    &:hover {
      cursor: pointer;
      color: white;
      background-color: $darkGreen;
    }
  }

  &:hover {
    border-color: $darkGreen;
    color: $darkGreen;
  }

  &:hover .tag__button {
    opacity: 1;
  }
}

div:focus {
  outline: none;
}

.deadline {
  &:hover > input[type="date"],
  &.selected > input[type="date"] {
    background-color: $darkGreen;
  }
}

input[type="date"] {
  font-size: 1rem;
  color: white;
  background-color: $lightGreen;
  border: none;
  outline: none;
  cursor: text;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(1);
  }
}
.breakNumber::before,
.leadTimeNumber::before {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(50%, -50%);
  text-transform: lowercase;
  background-color: $darkRed;
}
.leadTimeNumber::before {
  content: attr(data-leadTimeValue);
}
.breakNumber::before {
  content: attr(data-breakValue);
}
.dropdown {
  min-width: 7.75rem;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;

  &:hover::before {
    content: "";
    position: absolute;
    bottom: -390%;
    left: 5%;
    width: 80%;
    height: 400%;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }

  &:hover > &__item {
    @for $index from 1 through 4 {
      &:nth-child(#{$index}) {
        animation: slide 0.3s ease forwards, drop#{$index} 0.5s ease forwards (0.1s * $index);
      }
    }
  }

  &__item {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    padding: 0.5rem;
    min-width: 100%;
    background-color: $darkGreen;
    opacity: 0;

    &:nth-child(1) {
      border-radius: 0 1rem 0 0;
    }

    &:nth-child(4) {
      border-radius: 0 0 1rem 1rem;
    }

    &:hover {
      background-color: $lightGreen;
    }

    &.selected {
      color: $lightGreen;
      background-color: $darkGreen;
    }
  }
}

.newProject {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

@keyframes drop1 {
  0% {
    opacity: 1;
  }

  to {
    transform: translate(50%, -50%);
    opacity: 1;
  }
}

@keyframes drop2 {
  to {
    transform: translate(50%, 50%);
    opacity: 1;
  }
}

@keyframes drop3 {
  to {
    transform: translate(50%, 150%);
    opacity: 1;
  }
}

@keyframes drop4 {
  to {
    transform: translate(50%, 250%);
    opacity: 1;
  }
}

@keyframes slide {
  to {
    transform: translate(50%, -50%);
  }
}
</style>
