<template>
  <div>
    <BaseCardWithTape :tapeColor="$store.state.layout.accent">
      <template v-slot:content>
        <div class="row items-center">
          <div class="col-11 q-pa-xs text-center"
            :style="$store.getters['layout/getFontsize']">
            <p v-if="!isInEditMode && messageToMyself != ''"
              class="q-mb-none q-py-sm"
              :style="$store.getters['layout/getStyleForText']">
              {{ messageToMyself }}
            </p>
            <div v-else-if="!isInEditMode && messageToMyself === ''">
              * &#8902; * &#8902; * &#8902; * &#8902;
              <q-icon color="secondary"
                size="20px"
                style="text-shadow: none"
                name="bi-envelope"></q-icon>
              <q-img class="col-3 q-mt-lg q-ml-lg"
                :src="'/images/ghost-pink-hue.gif'"
                style="height: 35px; max-width: 35px; opacity: 0.6"
                spinner-color="white" />
              <q-icon color="secondary"
                size="20px"
                style="text-shadow: none"
                name="bi-stars"></q-icon>
            </div>
            <div v-else>
              <div class="text-left q-mr-sm q-py-sm">What do you want to tell yourself?
              </div>
            </div>
          </div>
          <div class="col-1 q-pa-none text-right">
            <q-btn v-if="!isInEditMode"
              icon="bi-pencil-square"
              class="test"
              size="9.5px"
              dense
              flat
              color="secondary"
              @click="enterEditMode">
            </q-btn>
            <q-btn v-else
              icon="bi-x"
              class="test"
              size="10.5px"
              dense
              flat
              color="secondary"
              @click="discardChanges">
            </q-btn>
          </div>
          <div class="col-12"
            v-if="isInEditMode">
            <q-input filled
              :input-style="getStyleForInput"
              v-model="editableMessageToMyself"
              autogrow
              color="secondary" />
          </div>
          <div v-if="isInEditMode"
            class="col-12 q-pt-md q-ml-sm">
            <div class="row justify-end items-center no-wrap">
              <BaseButtonForDialogFooter class="q-mr-sm"
                style="max-height: 31px"
                buttonText="Save"
                @click-button="saveChanges">
              </BaseButtonForDialogFooter>
              <BaseButtonForDialogFooter class="col-6 q-mr-sm"
                style="max-width: 120px"
                buttonText="Save as note"
                @click-button="saveChangesAndCreateNote">
              </BaseButtonForDialogFooter>
            </div>
          </div>
        </div>
      </template>
    </BaseCardWithTape>
  </div>
</template>

<script>
import BaseCardWithTape from '../ui/BaseCardWithTape.vue';
import BaseButtonForDialogFooter from '../ui/BaseButtonForDialogFooter.vue';

export default {
  name: "MessageToMyself",
  emits: ["hide-message"],
  components: { BaseCardWithTape, BaseButtonForDialogFooter },
  data() {
    return {
      text: "Get the project done, try to have fun too, and keep an eye on yourself, buddy.",
      isInEditMode: false,
      editableMessageToMyself: "",
    };
  },
  watch: {
    isInEditMode(newValue) {
      if (newValue) {
        console.log("mode changed to edit mode");
        this.editableMessageToMyself = this.messageToMyself;
      }
    }
  },
  methods: {
    enterEditMode() {
      this.isInEditMode = true;
    },
    // TODO:
    discardChanges() {
      this.isInEditMode = false;
    },
    saveChanges() {
      this.isInEditMode = false;
      this.$store.commit("data/setMessageToMyself", this.editableMessageToMyself);
    },
    saveChangesAndCreateNote() {
      this.saveChanges();
      this.createNewNote();
      this.$emit("hide-message");
    },
    createNewNote() {
      this.$store.commit("data/updateEditor", ""); //TODO: remove
      this.$store.commit("data/updateTitle", "Message to Myself");
      this.$store.commit("data/updateMood", "bi-envelope");
      this.$store.commit("data/updateText", this.editableMessageToMyself);

      this.$store.commit("data/addEventToEvents", new Date());

      this.$store.commit("data/resetEventData");
    },

  },
  computed: {
    messageToMyself() {
      return this.$store.state.data.messageToMyself;
    },
    // Styles
    getStyleForInput() {
      let style = {};
      style["font-size"] = this.$store.state.layout.fontsize + "px";
      style["padding-top"] = "7px";
      return style;
    },
  }

};
</script>

<style scoped>
.test {
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 10px;
}
</style>