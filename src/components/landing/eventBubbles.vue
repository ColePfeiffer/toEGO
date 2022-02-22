<template>
  <div class="todaysEvents q-pa-md">
    <div
      class="eventBubble fit row no-wrap justify-end items-center content-start"
      v-for="event in events.reverse()"
      :key="event.id"
    >
      <q-chat-message
        class="col=5"
        :name="event.createdBy"
        :text="[event.text]"
        :title="event.title"
        sent
        :stamp="event.createdOn"
        bg-color="primary"
        text-color="secondary"
      />
      <q-avatar
        class="col=1 q-pa-md"
        text-color="secondary"
        :icon="event.mood"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "eventBubbles",
  computed: {
    events() {
      // Javascript-Funktion zum Filtern von Arrays

      return this.$store.state.data.events.slice();
    },
  },
};
</script>

<style>
.statusElementIcon {
  width: 35px;
  height: 35px;
  padding: 2px;
}

.statusElementText {
  width: 35px;
  height: 35px;
  padding: 10px;

  font-weight: bold;
  font-size: 85%;
}
</style>