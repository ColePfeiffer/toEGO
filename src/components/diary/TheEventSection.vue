<template>
  <div>
    <div :style="getWidth">
      <!-- Title, Button Row -->
      <div class="q-pt-md">
        <div class="row justify-center items-center no-wrap">
          <!-- Title -->
          <div
            class="col-8 smallText text-left text-white"
            :style="$store.state.data.headlineStyle"
          >
            {{ getTextForFirstHeadline }}
          </div>
          <!-- Left-Side Buttons -->
          <div
            v-if="hasEvents || isDiarySectionVisible === false"
            class="smallText col-2 text-right"
          >
            <!-- Button: Enter Viewing Mode -->
            <q-btn
              v-if="!$store.state.data.eventsOnDiaryPageAreExpanded"
              class="col-1 smallText"
              flat
              dense
              icon="bi-eye"
              color="white"
              :label="getLabel('view')"
              @click="expandMore"
              :style="$store.state.data.sTextAccentShadow"
              size="10px"
            >
            </q-btn>
            <!-- Button: Leaving Viewing Mode -->
            <q-btn
              v-else
              class="col-1"
              flat
              dense
              :style="$store.state.data.sTextAccentShadow"
              icon="bi-chevron-left"
              :label="getLabel('back')"
              color="white"
              @click="expandLess"
              size="10px"
            ></q-btn>
          </div>
          <div
            v-else
            class="smallText col-2 text-right"
          ></div>
          <!-- Right-Side Button -->
          <!-- Button: Create new event -->
          <div class="smallText col-2 text-right">
            <q-btn
              v-if="hasEvents"
              flat
              dense
              icon="bi-plus-lg"
              color="accent"
              @click="goToPageNewEventSetToCreationMode"
              :label="getLabel('new ')"
              :style="$store.state.data.sTextAccentShadow"
              size="10px"
            ></q-btn>
            <div
              v-else
              class="smallText col-2 text-right"
            ></div>
          </div>


        </div>
      </div>

      <!-- Events Container -->
      <q-scroll-area
        :style="heightForScrollArea"
        ref="scrollArea"
      >
        <EventViewer
          :style="getWidth"
          :diaryEntry="diaryEntry"
          :isShowingExpandButtonOfEventCard="isShowingExpandButtonOfEventCard"
          :showMessageIfThereAreNoEvents="false"
        >
        </EventViewer>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import EventViewer from '../common/TheEventViewer.vue';

export default {
  name: "TheEventSection",
  emits: ["goToPageNewEventSetToCreationMode", "setVisibilityOfDiarySection"],
  props: {
    isDiarySectionVisible: Boolean,
    diaryEntry: Object,
    showMessageIfThereAreNoEvents: {
      type: Boolean,
      default: true,
    },
    isShowingExpandButtonOfEventCard: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "350px",
    },


  },
  components: {
    EventViewer
  },
  data() {
    return {
      heightForScrollArea: { height: "175px", width: this.width },
    };
  },
  computed: {
    getWidth() {
      return { width: this.width }
    },
    hasEvents() {
      if (this.diaryEntry != undefined) {
        if (this.diaryEntry.events.length > 0) {
          return true;
        }
      }
      return false;
    },
    getTextForFirstHeadline() {
      if (this.diaryEntry != undefined) {
        return "EVENTS";
      } else {
        return "";
      }
    },
  },
  methods: {
    getLabel(labelname) {
      console.log("q-screen: ", this.$q.screen.lt.sm);
      if (this.$q.screen.lt.sm === true && this.$store.state.data.isShowingLabelsForDiarySection) {
        return labelname;
      } else {
        return "";
      }
    },
    goToPageNewEventSetToCreationMode() {
      this.$emit("goToPageNewEventSetToCreationMode");
    },
    setVisibilityOfDiarySection(newValue) {
      this.$emit("setVisibilityOfDiarySection", newValue);
    },
    toggleExpansedStatusOfAllEvents(isExpanded) {
      let payload = {
        diaryEntryRef: this.diaryEntry,
        isExpanded: isExpanded,
      };
      this.$store.commit("data/setExpandedStatusOfAllEvents", payload);
    },
    expandMore() {
      this.$store.commit("data/setExpandedStatusOfEventsOnDiaryPage", true);
      this.toggleExpansedStatusOfAllEvents(true);
      this.setVisibilityOfDiarySection(false);
      this.heightForScrollArea = { height: "650px", width: this.width };
    },
    expandLess() {
      this.$store.commit("data/setExpandedStatusOfEventsOnDiaryPage", false);
      this.heightForScrollArea = { height: "175px", width: this.width };
      this.toggleExpansedStatusOfAllEvents(false);
      this.setVisibilityOfDiarySection(true);
    },
  },

}
</script>

<style scoped>
.test {
  background-color: rgba(255, 255, 255, 0.3);
}

.editor {
  border-style: unset;
  border-radius: 0px;
  margin: 3px;
}

.templateSelector {
  font-size: 12.5px;
}

.editorCard {
  font-size: 12.5px;
}
</style>
