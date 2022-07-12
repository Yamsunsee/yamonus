<template>
  <div class="break" v-if="timer.getState()">
    <div class="break__content">
      <span class="material-icons tea">{{ isTimeUp ? "alarm_on" : "emoji_food_beverage" }}</span>
      <div class="break__title">{{ isTimeUp ? "Time up!" : "You have been working hard!" }}</div>
      <div class="break__tag">
        <div class="break__tag--name">Duration</div>
        <div class="break__tag--items">
          <div v-if="isTimerRun" class="break__tag--item selected">
            <span class="material-icons margin-right" :class="{ spin: !isTimeUp }"> hourglass_empty </span>
            {{ timer.getDuration().text() }}
          </div>
          <div
            v-else
            v-for="value in timer.getValue()"
            :key="value"
            :data-durationValue="'x' + timer.getSelectedValue(value)"
            class="break__tag--item"
            :class="{ selected: timer.getSelectedValue(value) > 0, break__duration: timer.getSelectedValue(value) > 0 }"
            @click="timerActions({ option: 'selected', payload: value })"
          >
            {{ value }}
          </div>
        </div>
        <div @click="handleReset">
          <span class="material-icons margin-left break__tag--button">replay</span>
        </div>
      </div>
      <div class="break__buttons">
        <div
          v-if="!isTimerRun"
          @click="handleResolve"
          class="break__button"
          :class="{ disabled: timer.getSelectedDuration() === 0 }"
        >
          Take a break
        </div>
        <div @click="handleReject" class="break__button">Keep working</div>
      </div>
    </div>
  </div>
  {{ handleTimer() }}
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data() {
    return {
      timerId: undefined,
      timerBreakId: undefined,
      isTimerRun: false,
      isTimeUp: false,
    }
  },
  computed: {
    ...mapGetters(["timer"]),
  },
  beforeCreate() {
    this.$store.dispatch("localStorageActions", { option: "loadTimer" })
  },
  mounted() {
    const currentDuration = this.timer.getDuration().value()
    if (currentDuration > 0) {
      this.isTimerRun = true
      this.startBreakTimer()
    } else {
      if (this.timer.getSelectedDuration() !== 0) {
        this.isTimerRun = true
        this.isTimeUp = true
      }
      this.clearBreakTimer()
    }
  },
  methods: {
    ...mapActions(["timerActions", "localStorageActions"]),
    handleReject() {
      this.timerActions({ option: "off" })
      this.handleReset()
    },
    handleResolve() {
      const currentDuration = this.timer.getSelectedDuration()
      if (currentDuration > 0) {
        this.timerActions({ option: "setDuration", payload: currentDuration })
        this.localStorageActions({ option: "updateTimer" })
        this.isTimerRun = true
        this.startBreakTimer()
      }
    },
    handleReset() {
      this.timerActions({ option: "reset" })
      this.localStorageActions({ option: "updateTimer" })
      this.isTimerRun = false
      this.isTimeUp = false
      this.clearBreakTimer()
    },
    handleTimer() {
      const currentProcessingTasks = this.timer.getTasks().all()
      this.timerActions({ option: "addTasks", payload: currentProcessingTasks })
      if (this.timer.getTasks().processingTasks().length > 0 && !this.timer.getState()) {
        if (this.timerId === undefined) {
          this.startTimer()
        }
      } else {
        this.clearTimer()
      }
    },
    startTimer() {
      this.timerId = setInterval(() => {
        this.timerActions({ option: "decrease" })
        if (this.timer.getBreakTime()) {
          this.timerActions({ option: "on" })
        }
        this.localStorageActions({ option: "updateTimer" })
      }, 1000)
    },
    startBreakTimer() {
      this.timerBreakId = setInterval(() => {
        this.timerActions({ option: "decreaseDuration" })
        if (this.timer.getDuration().value() === 0) {
          this.isTimeUp = true
        }
        this.localStorageActions({ option: "updateTimer" })
      }, 1000)
    },
    clearTimer() {
      clearInterval(this.timerId)
      this.timerId = undefined
    },
    clearBreakTimer() {
      clearInterval(this.timerBreakId)
      this.timerBreakId = undefined
    },
  },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.break {
  z-index: 20;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $lightGreen;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;

  &__tag {
    margin-top: 2rem;
    width: 100%;
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

    &:hover {
      border-color: $darkGreen;
      color: $darkGreen;
    }

    &:hover .break__tag--button {
      opacity: 1;
    }

    &--name {
      position: absolute;
      top: 0%;
      left: 1rem;
      transform: translateY(-60%);
      background-color: $backgroundColor;
      padding: 0 0.3rem;
    }

    &--items {
      max-height: 4.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: inherit;
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
    }

    &--button {
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
  }

  &__content {
    width: 50%;
    background-color: $backgroundColor;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    span.tea {
      font-size: 10rem;
      color: $darkGreen;
    }
  }

  &__title {
    font-size: 2rem;
    color: $darkGreen;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
  }

  &__buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
  }

  &__button {
    width: 15rem;
    text-align: center;
    color: $darkGreen;
    background-color: $backgroundColor;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 1rem;
    margin-bottom: 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
    transition: ease-in-out 0.3s;

    &:hover {
      cursor: pointer;
      color: white;
      background-color: $darkGreen;
      box-shadow: inset rgba(50, 50, 93, 0.25) 0 2px 5px -1px, inset rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
    }

    &.disabled {
      color: $textColor;

      &:hover {
        cursor: default;
        color: $textColor;
        background-color: $backgroundColor;
        box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
      }
    }
  }

  .break__duration::before {
    content: attr(data-durationValue);
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
}

.spin {
  animation: spin 2s linear infinite;

  @keyframes spin {
    0%,
    20% {
      transform: rotateZ(0deg);
    }

    50%,
    70% {
      transform: rotateZ(180deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}
</style>
