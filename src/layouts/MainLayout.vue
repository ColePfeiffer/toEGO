<template>
  <q-layout view="hHh lpR fFf">
    <!-- Dialog -->
    <baseDialog :showDialog="dialogIsOpen" @toggle-Dialog="toggleDialog"></baseDialog>
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
        <router-view v-if="dialogIsOpen == false" />
      </q-page>
    </q-page-container>
    <!-- Bottom Navigation bar -->
    <q-footer elevated class="primary" v-if="dialogIsOpen == false">
      <q-toolbar>
        <q-btn flat dense icon="keyboard_arrow_left" @click="toggleDialog(true)" />
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
        <q-btn color="accent" flat dense icon="add" @click="dialogIsOpen = true" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import baseDialog from "../components/baseDialog.vue";

export default {
  data() {
    return {
      drawer: false,
      model: "one",
      dialogIsOpen: false,
      debug: true
    };
  },
  components: {
    baseDialog
  },
  methods: {
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    toggleDialog(newState) {
      if (this.debug) console.log("old state: " + this.dialogIsOpen);
      this.dialogIsOpen = newState;
      if (this.debug) console.log("new state: " + this.dialogIsOpen);
    }
  }
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
