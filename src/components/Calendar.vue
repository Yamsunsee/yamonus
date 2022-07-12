<template>
  <div class="calendar">
    <div class="calendar__header">
      <span class="material-icons margin-right" @click="decreaseMonth"> arrow_circle_left </span>
      <div class="calendar__header--date">
        {{ date }}
        <Tooltip text="today" position="tt-right">
          <span class="material-icons margin-left" @click="resetToday"> today </span>
        </Tooltip>
      </div>
      <span class="material-icons margin-left" @click="increaseMonth"> arrow_circle_right </span>
    </div>
    <div class="daysOfWeek">
      <div v-for="day in days" :key="day" class="dayOfWeek">{{ day }}</div>
    </div>
    <div class="daysOfMonth">
      <div
        v-for="day in daysInMonth"
        :key="day"
        :class="{
          dayOfMonth: !isNaN(day),
          today: today.date() === day + 1 && today.month() === momentDate.month() && today.year() === momentDate.year(),
        }"
      >
        {{ isNaN(day) ? "" : day + 1 }}
        <div class="reminder">
          <div class="number tasks" v-if="tasks().countByDate(day + 1 + ' ' + date) > 0 && !isNaN(day)">
            {{ tasks().countByDate(day + 1 + " " + date) }}
            <span class="material-icons"> description </span>
          </div>
          <div class="number projects" v-if="projects().countByDate(day + 1 + ' ' + date) > 0 && !isNaN(day)">
            {{ projects().countByDate(day + 1 + " " + date) }}
            <span class="material-icons"> source </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import moment from "moment"
import { ref, computed } from "vue"
import Tooltip from "./Tooltip.vue"

export default {
  setup() {
    const days = ref("sun mon tue wed thu fri sat".split(" "))
    const momentDate = ref(moment())
    const today = ref(moment())
    const date = computed(() => momentDate.value.format("MMMM YYYY"))
    const daysInMonth = computed(() => [
      ...Array(momentDate.value.startOf("month").day()),
      ...Array(momentDate.value.daysInMonth()).keys(),
    ])

    const increaseMonth = () => (momentDate.value = moment(momentDate.value).add(1, "month"))
    const decreaseMonth = () => (momentDate.value = moment(momentDate.value).subtract(1, "month"))
    const resetToday = () => (momentDate.value = moment())

    return { days, momentDate, date, today, daysInMonth, increaseMonth, decreaseMonth, resetToday }
  },
  computed: {
    ...mapGetters(["tasks", "projects"]),
  },
  components: { Tooltip },
}
</script>

<style lang="scss" scoped>
@use "../assets/styles" as *;

.calendar {
  font-weight: bold;
  height: 100%;
  background-color: white;
  padding: 1rem;
  border-radius: inherit;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-size: 2rem;
    color: $darkGreen;

    span {
      color: $lightGreen;
      transition: ease-out 0.3s;
      cursor: pointer;

      &:hover {
        color: $darkGreen;
      }
    }

    &--date {
      display: flex;
    }
  }
}

.daysOfWeek {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1rem;
  color: $lightGreen;
  text-align: center;
  margin: 0.5rem 0;
}
.dayOfWeek {
  text-transform: uppercase;
}

.daysOfMonth {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 0.25rem 1rem;
}

.dayOfMonth {
  position: relative;
  color: $textColor;
  background-color: #fff;
  margin-top: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-top: 0.3rem solid $lightGreen;
  border-radius: 0.2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
  cursor: pointer;

  &:hover {
    transition: ease-in-out 0.3s;
    color: $darkGreen;
    border-top-color: $darkGreen;

    .reminder {
      .number {
        &.tasks {
          color: $darkGreen;
        }
        &.projects {
          color: $darkRed;
        }
      }
    }
  }

  &.today {
    border-top-color: $darkGreen;
    color: $darkGreen;

    .reminder {
      .number {
        &.tasks {
          color: $darkGreen;
        }
        &.projects {
          color: $darkRed;
        }
      }
    }
  }

  .reminder {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .number {
      display: flex;
      font-weight: 900;
      font-size: 0.6rem;
      transition: ease-in-out 0.3s;

      span {
        font-size: 0.8rem;
        margin-left: 0.1rem;
      }

      &.tasks {
        color: $lightGreen;
      }

      &.projects {
        color: $lightRed;
      }
    }
  }
}
</style>
