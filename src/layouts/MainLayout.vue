<template>
  <q-layout view="hHh lpR fFf"
    :style="$store.getters['layout/getStyleForLayout']">
    <!-- Dialogs -->

    <!-- Bottom Navigation bar -->
    <q-footer v-if="
      ($store.state.data.dialogSettings.isVisible == false) |
      (($store.state.data.dialogSettings.isVisible == true) &
        ($store.state.data.dialogSettings.isBackgroundVisible == true))
    ">
      <q-toolbar class="row items-center align-center justify-center navigation-toolbar">
        <q-btn-toggle v-model="navButtonToggleModel"
          class="items-center row justify-center navigation-toggle"
          flat
          stretch
          padding="5px"
          size="13.5px"
          toggle-color="white"
          text-color="white"
          @click="clickNavigationItem"
          :options="[
            { value: 'home', slot: 'home' },
            {
              value: 'diary', slot: 'diary',
            },
          
            { value: 'settings', slot: 'settings' },
            {
              label: '',
              value: 'templates',
              slot: 'templates',
            },
          ]">
          <template v-slot:home>
            <div class="row justify-center items-center align-center ">
              <q-icon class="col-12 navigation-bar-icon"
                :name="getIconForHome" />
              <span class="navigation-button-label col-12">Notes</span>
            </div>
          </template>
          <template v-slot:diary>
            <div class="row justify-center items-center ">
              <q-icon class="col-12 navigation-bar-icon"
                :name="getIconForDiary" />
              <span class="navigation-button-label col-12">Diary</span>
            </div>
          </template>
          <template v-slot:settings>
            <div class="row justify-center items-center">
              <q-icon class="col-12 navigation-bar-icon"
                :name="getIconForSettings" />
              <span class="navigation-button-label col-12">Options</span>
            </div>
          </template>
          <template v-slot:templates>
            <div class="row justify-center items-center align-center q-px-md navigation-bar-fab-button">
              <q-fab v-model="templatesFabButton"
                class="col-12 navigation-bar-icon "
                vertical-actions-align="center"
                round
                text-color="accent"
                padding="none"
                direction="up"
                @click="toggleFabButton">
                <template v-slot:icon="{ opened }">
                  <q-icon :class="{ 'example-fab-animate--hover': opened !== true }"
                    size="22px"
                    name="bi-plus-lg" />
                </template>
                <template v-slot:active-icon="{ opened }">
                  <q-icon :class="{ 'example-fab-animate': opened === true }"
                    size="13.5px"
                    name="close" />
                </template>
                <q-fab-action @click="goToPageEvent"
                  icon="bi-plus-lg"
                  style="padding-right: 33px"
                  color="primary"
                  label="create Note" />
                <q-fab-action @click="openDialogViewDiaryTemplates"
                  icon="bi-journal-bookmark"
                  color="primary"
                  label="Diary Templates" />
                <q-fab-action color="primary"
                  @click="openDialogViewEventTemplates"
                  icon="bi-sticky"
                  label="Event Templates" />
                <q-fab-action v-if="isHelpVisible"
                  @click="showHelp"
                  icon="bi-question"
                  color="primary"
                  label="Help" />
              </q-fab>
              <span class="navigation-button-label col-12 q-pb-md"></span>
            </div>



          </template>

        </q-btn-toggle>
      </q-toolbar>
    </q-footer>
    <!-- Router-view -->
    <q-page-container>
      <q-page class="test3"
        :style="$store.getters['layout/getStyleForPage']">
        <DialogNameAndCreate @create="createTemplate"
          @closeDialog="closeDialog">
        </DialogNameAndCreate>
        <BaseDialogTemplateViewer :type="type"
          :templateList="templates"
          @pasteTemplate="pasteTemplate"
          @closeDialog="closeDialog">
        </BaseDialogTemplateViewer>
        <div class="row justify-center"
          :style="boxShadowStyle">
          <div class="col-12 col-xs-10 col-sm-8 col-md-7 col-lg-4 col-xl-3 ">
            <router-view v-slot="{ Component }"
              v-if="
                $store.state.data.dialogSettings.isVisible == false ||
                ($store.state.data.dialogSettings.isVisible == true &&
                  $store.state.data.dialogSettings.isBackgroundVisible == true)
              ">
              <div class="row justify-center items-center align-center">
                <div class="col-12">
                  <TheHelpStepperForHome v-if="isHelpForNotesVisible && currentRouterPath === '/home'"
                    @finish="finish"></TheHelpStepperForHome>
                  <TheHelpStepperForDiary v-if="isHelpForDiaryVisible && currentRouterPath === '/diary'"
                    @finish="finish"></TheHelpStepperForDiary>
                </div>
              </div>
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </div>
      </q-page>

    </q-page-container>

  </q-layout>
</template>

<script>
import DialogNameAndCreate from "../components/dialogs/DialogNameAndCreate.vue";
import { date } from "quasar";
import BaseDialogTemplateViewer from "../components/dialogs/BaseDialogTemplateViewer.vue";
import BaseTooltip from "../components/ui/BaseTooltip.vue";
import TheHelpStepperForHome from "../components/home/TheHelpStepperForHome.vue";
import TheHelpStepperForDiary from "../components/diary/TheHelpStepperForDiary.vue";
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
      templatesFabButton: false,
      isHelpForNotesVisible: true,
      isHelpForDiaryVisible: true,
    };
  },
  components: {
    DialogNameAndCreate,
    BaseDialogTemplateViewer,
    BaseTooltip,
    TheHelpStepperForHome,
    TheHelpStepperForDiary
  },
  mounted() {
    // sets our v-models initital value to the path of the url we are starting the app from
    this.navButtonToggleModel = this.currentRouterPath.substring(1);
  },
  computed: {
    isHelpVisible() {
      if (this.currentRouterPath != "/settings") {
        return true;
      } else {
        return false;
      }
    },
    nameOfCurrentDialog() {
      return this.$store.state.data.dialogSettings.nameOfCurrentDialog;
    },
    type() {
      if (this.nameOfCurrentDialog === 'template-viewer-for-events' || this.nameOfCurrentDialog === 'template-creator-for-event') {
        return "EVENT"
      } else {
        return "DIARY"
      }
    },
    templates() {
      if (this.nameOfCurrentDialog === "template-viewer-for-events") {
        return this.$store.state.data.eventTemplates;
      } else {
        return this.$store.state.data.diaryTemplates;
      }
    },
    currentRouterPath() {
      return this.$route.path;
    },
    getDiaryEntryForToday() {
      return this.$store.getters["data/getDiaryEntryByDate"](new Date());
    },
    getIconForDiary() {
      if (this.isNavigationSetTo('diary')) {
        return 'bi-journal-bookmark-fill'
      } else {
        return 'bi-journal-bookmark';
      }
    },
    getIconForEvent() {
      if (this.isNavigationSetTo('event')) {
        return 'bi-plus-circle-fill'
      } else {
        return 'bi-plus-lg';
      }
    },
    getIconForSettings() {
      if (this.isNavigationSetTo('settings')) {
        return 'bi-gear-fill'
      } else {
        return 'bi-gear';
      }
    },
    getIconForHome() {
      if (this.isNavigationSetTo('home')) {
        return 'bi-sticky-fill'
      } else {
        return 'bi-sticky';
      }
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
    nameOfCurrentDialog(nameOfCurrentDialog) {
      console.log("current dialog name changed to ", nameOfCurrentDialog);
    },
  },
  created() {
    this.$store.commit("data/initiateDay");
  },
  methods: {
    finish() {
      switch (this.currentRouterPath) { //
        case "/home":
          this.isHelpForNotesVisible = false;
          break;
        case "/diary":
          this.isHelpForDiaryVisible = false;
          break;
        case "/event":
          console.log("möpp");
          break;
        default:
          break;
      }

    },
    showHelp() {
      switch (this.currentRouterPath) { //
        case "/home":
          this.isHelpForNotesVisible = !this.isHelpForNotesVisible;
          console.log("show help for notes");
          break;
        case "/diary":
          this.isHelpForDiaryVisible = !this.isHelpForDiaryVisible;
          console.log("show help for diary");
          break;
        case "/event":
          console.log("show help for events");
          break;
        default:
          break;
      }
    },
    goToPageEvent() {
      this.$store.commit("data/setModeForNewEvent", "CREATE");
      this.$router.push("Event");
    },
    toggleFabButton() {
      this.templatesFabButton = !this.templatesFabButton;
    },
    clickNavigationItem() {
      if (this.navButtonToggleModel != 'templates') {
        this.templatesFabButton = false;
        this.goToPage();
      } else {
        this.toggleFabButton();
      }
    },

    isNavigationSetTo(path) {
      let test = this.currentRouterPath.substring(1).toLowerCase();
      if (test === path) {
        return true;
      } else {
        return false;
      }
    },
    openDialogViewEventTemplates() {
      this.openDialog("template-viewer-for-events");
    },
    openDialogViewDiaryTemplates() {
      this.openDialog("template-viewer-for-diary");
    },
    openDialog(name) {
      let payload = {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: name,
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    pasteTemplate(template) {
      if (this.type === "DIARY") {
        this.$store.commit("data/SetDialogTemplateViewerIsSetToDiaryMode", true);
      } else {
        this.$store.commit("data/SetDialogTemplateViewerIsSetToDiaryMode", false);
      }
      this.$store.commit("data/setPastedText", template.text);
    },
    deleteTemplate(template) {
      let payload = {
        parents: this.categories,
        child: template,
        type: "EVENT",
      };
      this.$store.dispatch(
        "data/removeTemplateFromParentsAndDeleteIt",
        payload
      );
    },
    createTemplate(templateName) {
      console.log("creating template.... for : ", this.type);
      let newTemplate = {
        name: templateName,
        type: this.type,
      };
      this.$store.commit("data/createTemplateAndAddToList", newTemplate);
      this.closeDialog();
    },
    toggleLeftDialog() {
      this.drawer = !this.drawer;
    },
    goToPage() {
      this.$router.push(this.navButtonToggleModel);
    },
    closeDialog() {
      let payload = {
        isVisible: false,
        isBackgroundVisible:
          this.$store.state.data.dialogSettings.isBackgroundVisible,
        nameOfCurrentDialog:
          this.$store.state.data.dialogSettings.nameOfCurrentDialog,
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
  },
};
</script>

<style lang="sass">

.test3
  margin: 0
  height: 100%
  overflow: hidden

.navigation-bar-fab-button
  padding-top: 7px

.navigation-bar-icon
  padding-top: 2px

.navigation-toolbar
  height: 51px

.navigation-button-label
  font-size: 10px

::-webkit-scrollbar
    display: none

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
