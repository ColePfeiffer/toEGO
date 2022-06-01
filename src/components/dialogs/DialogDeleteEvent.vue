<template>
  <baseDialog @closeDialog="closeDialog" @save="saveChanges">
    <template v-slot:confirm-button>
      {{ confirmButtonText }}
    </template>
    <template v-slot:dialogTitle>
      <q-icon name="theater_comedy" size="25px" />
      Deleting Event
    </template>
    <template v-slot:content>
      <q-card class="transparent no-shadow">
        <q-card-section class="row items-center">
          <div class="col-3">
            <q-avatar icon="delete" color="primary" text-color="white" />
          </div>
          <div class="col">
            <span class="q-ml-sm"
              >Do you really want to delete this event?</span
            >
          </div>
        </q-card-section>
      </q-card>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/baseDialog2.vue";
import shared from "../../shared.js";
import { mapState } from "vuex";

export default {
  name: "DialogNewEvent",
  components: {
    baseDialog,
  },
  created() {
    this.scroll = shared.scroll; // now I can call this.foo() in my functions/template
  },
  data() {
    return {
      icon: true,
    };
  },

  methods: {
    scrollDown() {
      this.scroll(+200);
    },
    closeDialog() {
      this.$store.commit("data/resetEventData");
      let payload = { isVisible: false, editMode: false };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    saveChanges() {
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }

      // check wether a new event is created or an existing one is being edited
      if (this.$store.state.data.eventDialogSettings.editMode === false) {
        // creating a new event:
        this.$store.commit("data/addEventToEvents", new Date());
      } else {
        // editing an existing event:
        this.$store.commit("data/saveChangesToEditedEvent");
      }
      this.closeDialog();
    },
  },
  computed: {
    isDialogVisible: {
      get() {
        return this.$store.state.data.eventDialogSettings.isOpen;
      },
      set(value) {
        let payload = {
          isVisible: value,
          editMode: this.$store.state.data.eventDialogSettings.editMode,
        };
        this.$store.commit("data/setDialogVisibility", payload);
      },
    },
    title: {
      get() {
        return this.$store.state.data.eventData.title;
      },
      set(value) {
        this.$store.commit("data/updateTitle", value);
      },
    },
    mood: {
      get() {
        return this.$store.state.data.eventData.mood;
      },
      set(value) {
        this.$store.commit("data/updateMood", value);
      },
    },
    text: {
      get() {
        return this.$store.state.data.eventData.text;
      },
      set(value) {
        this.$store.commit("data/updateText", value);
      },
    },
    confirmButtonText() {
      if (this.$store.state.data.eventDialogSettings.editMode) {
        return "edit";
      } else {
        return "save";
      }
    },
  },
};
</script>

<style scoped>
html {
  height: 100%;
  overflow: auto;
}
body {
  height: 100%;
}
.container :deep(::-webkit-scrollbar) {
  display: none;
}
.container :deep(.promptTitle) {
  font-weight: bolder;
  font-size: 1.2em;
}

.container :deep(.promptContainer) {
  text-align: center;
}

.container :deep(.underlined) {
  border-bottom: 1px solid black;
  padding: 0 0 4px;
}
/* Adjusting the top padding for the input field */
.container :deep(.q-textarea .q-field__native) {
  padding-top: 10px;
}
</style>
