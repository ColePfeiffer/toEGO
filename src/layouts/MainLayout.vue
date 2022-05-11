<template>
  <q-layout view="hHh lpR fFf">
    <!-- Dialogs -->
    <DialogNewEvent></DialogNewEvent>
    <!-- Router-view -->
    <q-page-container>
      <q-page class="pageView">
        <div class="row justify-center" :style="boxShadowStyle">
          <div class="col-12 col-xs-10 col-sm-8 col-md-5 col-xl-3">
            <router-view
              v-if="$store.state.data.newEventDialogIsOpen == false"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
    <!-- Bottom Navigation bar -->
    <q-footer
      v-if="$store.state.data.newEventDialogIsOpen == false"
      elevated
      class="primary"
    >
      <q-toolbar>
        <q-space />
        <q-btn-toggle
          v-model="model"
          flat
          stretch
          padding="ml"
          toggle-color="secondary"
          @update:model-value="goToPage"
          :options="[
            { label: '', value: 'home', icon: 'visibility' },
            { label: '', value: 'diary', icon: 'book' },
            { label: '', value: 'items', icon: 'fas fa-calendar-alt' },
            { label: '', value: 'settings', icon: 'settings' },
          ]"
        />
        <q-space />
        <q-btn
          color="accent"
          flat
          dense
          icon="add"
          @click="showDialogForNewEvent"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import DialogNewEvent from "../components/DialogNewEvent/DialogNewEvent.vue";
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
      model: "one",
      boxShadowStyle: {
        "box-shadow": "none",
      },
    };
  },
  components: {
    DialogNewEvent,
  },
  created() {
    this.$store.commit("data/initiateDay");
    let selectedDate = new Date();
    let test = this.$store.getters["data/getDiaryEntryByDate"](selectedDate);
    console.log("returned entry: ", test);
  },
  methods: {
    toggleLeftDialog() {
      this.drawer = !this.drawer;
    },
    showDialogForNewEvent() {
      this.$store.commit("data/setDialogVisibility", true);
    },
    goToPage() {
      console.log(this.model);
      this.$router.push(this.model);
    },
  },
};
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
  background: none

.pageView
  font-family: 'PressStart'
  background: url(/images/background_wide2.jpg) no-repeat center center fixed
  background-size: cover
  margin: auto
  padding: auto

.inner_div
  margin: auto
  position: relative
  width: 30%
  height: 100%
</style>
