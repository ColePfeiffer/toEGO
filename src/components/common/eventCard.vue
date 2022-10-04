<template>
  <BaseCard :isTextSetToCentered="false">
    <template v-slot:content>
      <!-- Mood, Title, Expand Button -->
      <q-item class="padding">
        <!-- mood emoji -->
        <q-item-section avatar
          class="card-text">
          <row justify-center
            items-center>
            <q-icon size="22.5px"
              class="col-auto"
              :name="eventData.mood"
              text-color="secondary"
              color="secondary"></q-icon>
          </row>
        </q-item-section>

        <!-- event title, expand button -->
        <q-item-section>
          <div class="row justify-between items-center q-py-none q-px-xs">
            <div class="col-10 text-left">
              <q-item-label class="card-title">{{
              eventData.title
              }}</q-item-label>
            </div>
            <div v-if="isShowingExpandButtonOfEventCard === true"
              class="col-2 text-right">
              <BaseButtonExpandable color="secondary"
                dense
                :isEventExpanded="eventData.expanded"
                @expand="expand"></BaseButtonExpandable>
            </div>
            <div v-else
              class="col-2"></div>
          </div>
        </q-item-section>
      </q-item>

      <q-separator class="card-separator" />
      <!-- Text, Extras -->
      <div class="padding"
        style="min-height: 80px">
        <!-- Expanded: False -->
        <div v-if="
        eventData.expanded === false">
          <div v-if="eventData.text.length >= maxLengthOfCardText">
            <q-card-section v-if="!isEventEditorEmpty"
              class="card-text">
              {{ eventData.text.substring(0, this.maxLengthOfCardText - 5) }}
              <span style="color: var(--q-secondary)">
                (<q-icon size="22.5px"
                  name="bi-three-dots"
                  text-color="secondary"
                  color="secondary">
                </q-icon>)
              </span>
            </q-card-section>
            <q-card-section v-else
              class="card-text">
              {{ eventData.text.substring(0, this.maxLengthOfCardText) + "..." }}
            </q-card-section>
          </div>
          <!-- Expanded: False -->
          <div v-else>
            <q-card-section class="card-text">
              {{ eventData.text }}
              <span v-if="!isEventEditorEmpty"
                style="color: var(--q-secondary)">
                (<q-icon size="22.5px"
                  name="bi-three-dots"
                  text-color="secondary"
                  color="secondary">
                </q-icon>)
              </span>
            </q-card-section>
          </div>
        </div>
        <!-- Expanded: True -->
        <div v-else>
          <!-- view when expanded and editor text is empty -->
          <div v-if="isEventEditorEmpty">
            <q-card-section class="card-text">
              <span style="white-space: pre-wrap"> {{ eventData.text }} </span>
            </q-card-section>

            <q-card-section class="q-pr-none card-time">
              <div class="row justify-between items-center">
                <div class="col-3">
                  {{ timeAgo }}
                </div>
                <div class="col-3 text-right">
                  <div class="row no-wrap">
                    <q-btn class="col"
                      v-if="eventData.expanded === true"
                      flat
                      icon="delete"
                      color="secondary"
                      @click="deleteEvent"></q-btn>
                    <q-btn class="col"
                      v-if="eventData.expanded === true"
                      flat
                      icon="edit"
                      color="secondary"
                      @click="editEvent"></q-btn>
                  </div>
                </div>
              </div>
            </q-card-section>
          </div>
          <!-- view when expanded and editor text isn't empty -->
          <div v-else
            class="card-text">
            <q-card-section>
              <span style="white-space: pre-wrap"> {{ eventData.text }} </span>
            </q-card-section>
            <q-separator class="card-separator" />
            <div>
              <q-card-section style="white-space: pre-wrap"
                v-html="eventData.editor">
              </q-card-section>
              <q-card-section class="card-time">
                <div class="row justify-between items-center">
                  <div class="col-3">
                    {{ timeAgo }}
                  </div>
                  <div class="col-3">
                    <div class="row no-wrap">
                      <q-btn class="col"
                        v-if="eventData.expanded === true"
                        flat
                        icon="delete"
                        color="secondary"
                        @click="deleteEvent"></q-btn>
                      <q-btn class="col"
                        v-if="eventData.expanded === true"
                        flat
                        icon="edit"
                        color="secondary"
                        @click="editEvent"></q-btn>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </div>

          </div>
        </div>


      </div>
    </template>
  </BaseCard>

</template>

<script>
import BaseButtonExpandable from "../ui/BaseButtonExpandable.vue";
import { date } from "quasar";
import BaseCard from "../ui/BaseCard.vue";
//import TimeAgo from "vue3-timeago";

export default {
  name: "eventCard",
  components: {
    BaseButtonExpandable,
    BaseCard
  },
  props: {
    eventData: Object,
    isShowingExpandButtonOfEventCard: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["changeEventData", "deleteEvent", "editEvent"],
  data() {
    return {
      maxLengthOfCardText: 90,
      timeAgoGER: date.formatDate(this.eventData.createdOn, "HH:mm"),
      timeAgo: date.formatDate(this.eventData.createdOn, "h:mm A"),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },

  computed: {
    isEventEditorEmpty() {
      if (this.eventData.editor != undefined && this.eventData.editor != "") {
        return false;
      } else {
        return true;
      }
    },

    /*
    expanded: {
      get() {
        return this.$store.state.data.eventData.expanded;
      },
      set(value) {
        this.$store.commit("data/updateExpanded", value);
      },
    },*/
  },

  methods: {
    deleteEvent() {
      this.$emit("deleteEvent", this.eventData);
    },
    editEvent() {
      this.$emit("editEvent", this.eventData);
    },
    expand() {
      console.log("lol")
      this.$emit("changeEventData", this.eventData);
    },
    mergeText(eventData) {
      let output = eventData.text;
      // check if text is empty; if so show title
      if (eventData.text == "") {
        output = eventData.title;
        // später löschen, nur zum testen
        //output = this.lorem;
      }
      //console.log([output][0]);
      return [output][0];
    },
  },
};
</script>

<style scoped>
.padding {
  padding-left: 9px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 9px;
}

.card-text {
  padding-left: 9px;
  background-color: goldenrod;
}

.card-text,
.card-time {
  font-size: 12.5px;
}


.card-time {
  color: var(--q-secondary);
  padding-bottom: 2px;
  padding-top: 2px;
}

.card-title {
  color: var(--q-secondary);
}
</style>
