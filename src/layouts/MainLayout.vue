<template>
  <q-layout view="hHh lpR fFf">
    <q-resize-observer @resize="onResize" />
    <!-- Dialogs -->
    <DialogNameAndCreate @create="eventCreateTemplate"
      @closeDialog="closeDialog">
    </DialogNameAndCreate>
    <dialogViewEventTemplates :templateList="$store.state.data.eventTemplates"
      @pasteTemplate="pasteTemplate"
      @deleteTemplate="deleteTemplate"
      @closeDialog="closeDialog">
    </dialogViewEventTemplates>

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
            <q-tooltip class="bg-secondary text-body2 text-black"
              :offset="[10, 10]"
              :delay="300">home</q-tooltip>
          </template>

          <template v-slot:diary>
            <q-tooltip class="bg-secondary text-body2 text-black"
              :offset="[10, 10]"
              :delay="300">diary</q-tooltip>
          </template>
          <template v-slot:templates>
            <!-- TODO: icon slot to set icon size -->
            <q-fab v-model="templatesFabButton"
              vertical-actions-align="center"
              icon="bi-fonts"
              square
              padding="none"
              direction="up">
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
            <q-tooltip class="bg-secondary text-body2 text-black"
              :offset="[10, 10]"
              :delay="300">settings</q-tooltip>
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
import DialogViewEventTemplates from "../components/dialogs/DialogViewEventTemplates.vue";
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
      templatesFabButton: false,
    };
  },
  components: {
    DialogNameAndCreate,
    DialogViewEventTemplates,
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
    navButtonToggleModel(newValue) {
      if (newValue != 'templates') {
        this.goToPage();
      } else {
        this.templatesFabButton = !this.templatesFabButton;
      }
    },
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
    clickNavigationItem() {
      console.log("use me to allow double clicking templates :)")
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
      let payload = {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogViewEventTemplates",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    openDialogViewDiaryTemplates() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: false,
        nameOfCurrentDialog: "dialogViewDiaryTemplates",
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
        parents: this.categories,
        child: template,
        type: "EVENT",
      };
      this.$store.dispatch(
        "data/removeTemplateFromParentsAndDeleteIt",
        payload
      );
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
