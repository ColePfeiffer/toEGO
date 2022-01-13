<template>
  <q-layout view="hHh lpR fFf">
    <!-- Dialog 
    <baseDialog :showDialog="dialogIsOpen" @toggle-Dialog="toggleDialog"></baseDialog>-->
    <DialogNewEvent></DialogNewEvent>
    <!-- Menü -->
    <q-drawer v-model="drawer" :width="200" :breakpoint="500">
      <q-scroll-area class="fit test">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple @click="setDarkMode()">
            <q-item-section avatar>
              <q-icon name="fas fa-moon" />
            </q-item-section>

            <q-item-section>Dark-Mode</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>Drafts</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- Router-view -->
    <q-page-container>
      <q-page class="pageView">
        <router-view v-if="$store.state.data.newEventDialogIsOpen == false" />
      </q-page>
    </q-page-container>
    <!-- Bottom Navigation bar -->
    <q-footer
      v-if="$store.state.data.newEventDialogIsOpen == false"
      elevated
      class="primary"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="keyboard_arrow_left"
          @click="toggleLeftDialog(true)"
        />
        <q-space />
        <q-btn-toggle
          v-model="model"
          flat
          stretch
          toggle-color="secondary"
          :options="[
            { label: '', value: 'one', icon: 'book' },
            { label: '', value: 'two', icon: 'view_comfy' },
            { label: '', value: 'three', icon: 'settings' },
          ]"
        />
        <q-space />
        <q-btn
          color="accent"
          flat
          dense
          icon="add"
          @click="toggleDialogNewEvent"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import DialogNewEvent from "../pages/dialogNewEvent/DialogNewEvent.vue";

export default {
  data() {
    return {
      drawer: false,
      model: "one",
    };
  },
  components: {
    DialogNewEvent,
  },
  methods: {
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    toggleLeftDialog() {
      this.drawer = !this.drawer;
    },
    toggleDialogNewEvent() {
      console.log(
        "BEFORE TOGGLING: ",
        this.$store.state.data.newEventDialogIsOpen
      );
      this.$store.commit("data/setDialogVisibility");
      console.log(
        "AFTER TOGGLING: ",
        this.$store.state.data.newEventDialogIsOpen
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
  background: none

.pageView
  margin: auto
  font-family: 'PressStart'
  background: url(/images/4.jpg) repeat-x
  height: 100%
  padding: auto

.inner_div
  margin: auto
  position: relative
  width: 30%
  height: 100%
</style>
