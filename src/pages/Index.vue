<template>
  <q-page class="q-pa-md">
    <div>
      <!-- infoHeader including status and intentionOfTheWeek -->
      <div class="fit row no-wrap justify-between items-center content-center">
        <!-- Container that holds information about tasks -->
        <div class="statusContainer col-3">
          <!-- Diary Entry Made? -->
          <div class="statusEntryMade fit row no-wrap">
            <q-btn
              class="statusElementIcon col=10 items-center"
              flat
              icon="bi-journal-bookmark-fill"
              color="primary"
            />

            <div class="col=6 statusElementText items-center">
              <span style="color: White">X</span>
            </div>
          </div>
          <!-- Status Updates Made? -->
          <div class="statusUpdatesMade fit row no-wrap">
            <q-btn
              class="statusElementIcon col=6 items-center"
              flat
              icon="bi-chat-left-fill"
              color="primary"
            />
            <p class="col=6 statusElementText items-center">1/3</p>
          </div>
        </div>
        <!-- Col=6 Intention of the Week -->
        <div class="intentionOfTheWeek col=6">
          <span style="font-weight: bold">CURRENT INTENTION</span>
          <br /><span>get work done!</span>
        </div>
      </div>
      <!-- -->
      <q-separator color="primary" />
      <!-- Today's Events -->
      <div class="todaysEvents q-pa-md">
        <div
          class="
            eventBubble
            fit
            row
            no-wrap
            justify-end
            items-center
            content-start
          "
        >
          <q-chat-message
            class="col=5"
            name="me"
            :text="['hey, how are you? hey, how are you?']"
            sent
            stamp="7 minutes ago"
          />
          <q-avatar
            class="col=1 q-pa-md"
            text-color="secondary"
            icon="fas fa-smile"
          />
        </div>

        <div class="eventBubble fit row no-wrap justify-end">
          <q-chat-message
            class="col=4"
            name="me"
            :text="['hey, how are you? hey, how are you?']"
            sent
            stamp="7 minutes ago"
          />
          <q-avatar
            class="col=2 q-pa-md"
            text-color="secondary"
            icon="fas fa-smile"
          />
        </div>
      </div>

      <!-- Player Character -->
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      text: "Get work done!",
    };
  },
};
</script>

<style>
.paddingBox {
  padding: 10px;
}
.statusContainer {
  padding: 5px;
  width: 100px;
}
.intentionOfTheWeek {
  padding: 15px;
  font-size: 85%;
}

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
