<template >
  <q-layout view="hHh lpR fFf">
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

    <q-page-container>
      <q-page class="pageView">
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer elevated class="primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          icon="keyboard_arrow_left"
          @click="drawer = !drawer"
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
        <q-btn color="accent" flat dense icon="add" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      model: "one",
    };
  },
  methods: {
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
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
  background: url(/images/clouds.png) repeat-x
  height: 100%
  padding: auto

.inner_div
  margin: auto
  position: relative
  width: 30%
  height: 100%
</style>