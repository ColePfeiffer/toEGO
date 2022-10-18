<template>
  <q-layout view="hHh lpR fFf">
    <q-resize-observer @resize="onResize" />
    <!-- Dialogs -->
    <DialogNameAndCreate @create="createTemplate"
      @closeDialog="closeDialog">
    </DialogNameAndCreate>

    <BaseDialogTemplateViewer :type="type"
      :templateList="templates"
      @pasteTemplate="pasteTemplate"
      @closeDialog="closeDialog">
    </BaseDialogTemplateViewer>
    <!-- Router-view -->
    <q-page-container>
      <q-page :style="$store.getters['layout/getStyleForPage']">
        <div class="row justify-center"
          :style="boxShadowStyle">
          <div class="col-12 col-xs-10 col-sm-8 col-md-4 col-xl-3 q-pt-xs">
            <router-view v-slot="{ Component }"
              v-if="
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
    "
      elevated
      class="primary">
      <q-toolbar>
        <q-space />
        <q-btn-toggle v-model="navButtonToggleModel"
          flat
          stretch
          padding="ml"
          toggle-color="white"
          text-color="white"
          @click="clickNavigationItem"
          :options="[
            { label: '', value: 'home', icon: getIconForHome, slot: 'home'},
            {
              label: '',
              value: 'diary',
              icon: getIconForDiary,
              slot: 'diary',

            },
            {
              label: '',
              value: 'templates',
              slot: 'templates',
            },
            { label: '', value: 'settings', icon: getIconForSettings, slot: 'settings'  },
          ]">
          <template v-slot:home>
            <BaseTooltip text="Home"></BaseTooltip>
          </template>
          <template v-slot:diary>
            <BaseTooltip text="Diary"></BaseTooltip>
          </template>
          <template v-slot:templates>
            <!-- TODO: icon slot to set icon size -->
            <q-fab v-model="templatesFabButton"
              vertical-actions-align="center"
              icon="bi-fonts"
              square
              padding="none"
              direction="up"
              @click="toggleFabButton">
              <q-fab-action @click="openDialogViewDiaryTemplates"
                icon="bi-journal-bookmark"
                color="primary"
                label="Diary Templates" />
              <q-fab-action color="primary"
                dense
                @click="openDialogViewEventTemplates"
                icon="bi-sticky"
                label="Event Templates" />
            </q-fab>
          </template>
          <template v-slot:settings>
            <BaseTooltip text="Settings"></BaseTooltip>
          </template>
        </q-btn-toggle>
        <q-space />
        <q-btn flat
          v-if="false"
          round
          dense
          icon="bi-gear"
          class="q-mr-sm" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import DialogNameAndCreate from "../components/dialogs/DialogNameAndCreate.vue";
import { date } from "quasar";
import BaseDialogTemplateViewer from "../components/dialogs/BaseDialogTemplateViewer.vue";
import BaseTooltip from "../components/ui/BaseTooltip.vue";
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
    };
  },
  components: {
    DialogNameAndCreate,
    BaseDialogTemplateViewer,
    BaseTooltip
  },
  mounted() {
    // sets our v-models initital value to the path of the url we are starting the app from
    this.navButtonToggleModel = this.currentRouterPath.substring(1);
  },
  computed: {
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
        return 'bi-eye-fill'
      } else {
        return 'bi-eye';
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
    toggleFabButton() {
      this.templatesFabButton = !this.templatesFabButton;
    },
    clickNavigationItem() {
      console.log("model: ", this.navButtonToggleModel);
      if (this.navButtonToggleModel != 'templates') {
        this.templatesFabButton = false;
        this.goToPage();
      } else {
        this.toggleFabButton();
      }
    },
    onResize(size) {
      this.$store.commit("layout/setSize", size);
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
