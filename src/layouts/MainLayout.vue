<template>
  <q-layout view="hHh lpR fFf">
    <!-- Dialogs -->
    <DialogNewEvent @openDialogCreateTemplate="openDialogCreateTemplate"
      @openDialogViewTemplates="openDialogViewTemplates">
    </DialogNewEvent>
    <DialogCreateTemplate @createTemplate="eventCreateTemplate" @closeDialog="closeDialog">
    </DialogCreateTemplate>
    <DialogViewTemplates :templateList="$store.state.data.eventTemplates" @pasteTemplate="pasteTemplate"
      @deleteTemplate="deleteTemplate" @closeDialog="closeDialog">
    </DialogViewTemplates>

    <!-- Router-view -->
    <q-page-container>
      <q-page class="pageView">
        <div class="row justify-center" :style="boxShadowStyle">
          <div class="col-12 col-xs-10 col-sm-8 col-md-4 col-xl-3 q-pt-xs">
            <router-view v-slot="{ Component }" v-if="
              $store.state.data.dialogSettings.isVisible == false ||
              ($store.state.data.dialogSettings.isVisible == true &&
                $store.state.data.dialogSettings.isBackgroundVisible == true)
            ">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <!-- Bottom Navigation bar -->
    <q-footer v-if="
      ($store.state.data.dialogSettings.isVisible == false) |
      (($store.state.data.dialogSettings.isVisible == true) &
        ($store.state.data.dialogSettings.isBackgroundVisible == true))
    " elevated class="primary">
      <q-toolbar>
        <q-space />
        <q-btn-toggle v-model="navButtonToggleModel" flat stretch padding="ml" toggle-color="secondary"
          @update:model-value="goToPage" :options="[
            { label: '', value: 'home', icon: 'bi-eye', slot: 'home' },
            {
              label: '',
              value: 'diary',
              icon: 'bi-journal-text',
              slot: 'diary',
            },
            {
              label: '',
              value: 'NewEvent',
              slot: 'NewEvent',
              icon: 'bi-plus-lg',
              color: 'accent',
            },
            { label: '', value: 'items', icon: 'bi-calendar', slot: 'items' },
            { label: '', value: 'settings', icon: 'bi-gear', slot: 'settings' },
          ]">
          <template v-slot:home>
            <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">home</q-tooltip>
          </template>
          <template v-slot:diary>
            <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">diary</q-tooltip>
          </template>
          <template v-slot:NewEvent>
            <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">create new event
            </q-tooltip>
          </template>
          <template v-slot:items>
            <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">calendar</q-tooltip>
          </template>
          <template v-slot:settings>
            <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">settings</q-tooltip>
          </template>
        </q-btn-toggle>
        <q-space />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import DialogNewEvent from "../components/dialogs/dialogNewEvent/DialogNewEvent.vue";
import DialogCreateTemplate from "../components/dialogs/DialogCreateTemplate.vue";
import DialogViewTemplates from "../components/dialogs/DialogViewTemplates.vue";
import { date } from "quasar";
/*
<q-drawer v-model="drawer" :width="200" :breakpoint="500">
      <q-scroll-area class="fit test"> </q-scroll-area>
    </q-drawer>

in Footer
     <q-btn
          flat
          dense
          icon="keyboard_arrow_left"
          @click="toggleLeftDialog(true)"
        />
*/
export default {
  data() {
    return {
      drawer: false,
      navButtonToggleModel: "home",
      boxShadowStyle: {
        "box-shadow": "none",
      },
    };
  },
  components: {
    DialogNewEvent,
    DialogCreateTemplate,
    DialogViewTemplates,
  },
  mounted() {
    // sets our v-models initital value to the path of the url we are starting the app from
    this.navButtonToggleModel = this.currentRouterPath.substring(1);
  },
  computed: {
    currentRouterPath() {
      return this.$route.path;
    },
    getDiaryEntryForToday() {
      let getDiaryEntryRefForToday = this.$store.getters[
        "data/getDiaryEntryByDate"
      ](new Date());
      return getDiaryEntryRefForToday;
    },
  },

  watch: {
    currentRouterPath(newPath) {
      // whenever the router path updates, we want to set expanded to false for events.
      let payload = {
        isExpanded: false,
        diaryEntryRef: this.getDiaryEntryForToday,
      };
      this.$store.commit("data/setExpandedStatusOfAllEvents", payload);

      // we also want to update navButtonToggleModel based on the new navigation
      this.navButtonToggleModel = newPath.substring(1);
    },
  },
  created() {
    this.$store.commit("data/initiateDay");
  },
  methods: {
    openDialogViewTemplates() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogViewTemplates",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    pasteTemplate(template) {
      let newEditorContent;
      if (this.$store.state.data.eventData.editor != "") {
        newEditorContent =
          this.$store.state.data.eventData.editor + "<br>" + template.text;
      } else {
        newEditorContent = template.text;
      }
      this.$store.commit("data/updateEditor", newEditorContent);
    },
    deleteTemplate(template) {
      let payload = {
        template: template,
        templateListType: "EVENT",
      };
      this.$store.commit("data/deleteTemplate", payload);
    },
    eventCreateTemplate(templateName) {
      let newTemplate = {
        name: templateName,
        text: this.$store.state.data.eventData.editor,
        type: "EVENT",
      };
      this.$store.commit("data/createTemplateAndAddToList", newTemplate);
      this.closeDialog();
    },
    openDialogCreateTemplate() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogCreateTemplate",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    toggleLeftDialog() {
      this.drawer = !this.drawer;
    },
    showDialogForNewEvent() {
      //setting dialog visibilty
      let payload = {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogNewEvent",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    goToPage() {
      this.$router.push(this.navButtonToggleModel);
    },
    closeDialog() {
      this.showDialogForNewEvent();
    },
  },
};
</script>

<style lang="sass">
::-webkit-scrollbar
    display: none

.pageView
  font-family: 'PressStart'
  background: url(/images/background_wide2.jpg) no-repeat center center fixed
  background-size: cover
  margin: auto
  padding: auto

.card-separator
  background-color: rgba(157, 157, 213, 0.6)
      background: var(--q-secondary) !important

.smallText
  font-size: 12.5px

.bold
  font-weight: bold

.text-justify
  text-align: justify !important

.keep-whitespace
  white-space: pre-wrap !important

.defaultFont
  font-family: 'PressStart' !important

.my-card
  font-size: 12.5px
</style>
