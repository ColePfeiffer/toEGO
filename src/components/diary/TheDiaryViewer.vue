<template>
  <div>
    <!-- Case 1: There is no diary entry for the selected day. -->
    <div v-if="diaryEntry === undefined">
      <!-- Case 1A: Show +, if showMessageIfThereAreNoEvents is set to true. This is used by the home page. -->
      <div v-if="showMessageIfThereAreNoEvents"
        class="q-pa-md">
        <q-card class="my-card shadow-3 text-justify">
          <q-card-section class="card-text text-center">
            There is nothing here yet.
            <q-btn color="accent"
              flat
              dense
              icon="bi-plus"
              @click="goToPageNewEventSetToCreationMode" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Case 2: Entry exists, but no events have been created yet. -->
    <div v-else-if="diaryEntry != undefined && diaryEntry.events.length < 1"
      class="q-pt-md">
      <q-card class="my-card shadow-3 text-justify">
        <q-card-section class="card-text text-center">
          <q-btn color="accent"
            flat
            dense
            icon="bi-plus"
            @click="goToPageNewEventSetToCreationMode" />
        </q-card-section>
      </q-card>
    </div>
    <!-- Case 3: Entry and events exist. -->
    <div v-else
      class="q-pt-md"
      v-for="event in events"
      :key="event.id">
      <EventCard :eventData="event"
        :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
        @changeEventData="changeEventData"
        @editEvent="goToPageNewEventSetToEditingMode"
        @deleteEvent="showConfirmDeleteDialog"
        class="col-12" />
    </div>
  </div>
</template>
