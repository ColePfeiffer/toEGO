<template>
  <div class="todaysEvents q-pa-md">
    <div class="eventBubble fit row no-wrap justify-end items-center content-start">
      <q-chat-message
        class="col=5"
        name="me"
        :text="['I feel pretty productive, yet exhausted. I think...']"
        sent
        stamp="7 minutes ago"
        bg-color="primary"
        text-color="secondary"
      />
      <q-avatar class="col=1 q-pa-md" text-color="secondary" icon="fas fa-smile" />
    </div>

    <div class="eventBubble fit row no-wrap justify-end">
      <q-chat-message
        class="col=4"
        bg-color="primary"
        text-color="secondary"
        name="me"
        :text="['Still feeling down about last night. Now that I am writing...']"
        sent
        stamp="3 hours ago"
      />
      <q-avatar class="col=2 q-pa-md" text-color="secondary" icon="fas fa-frown" />
    </div>
  </div>
</template>

<script></script>

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