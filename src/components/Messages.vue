<template>
  <div class="messages__container">
    <Message
      v-for="message in messages"
      :key="message.id"
      :id="message.id"
      :title="message.title"
      :type="message.type"
      :text="message.text"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Message from "./Message.vue"

export default {
  components: { Message },
  computed: {
    ...mapGetters(["messages"]),
  },
}
</script>

<style lang="scss" scoped>
.messages__container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
