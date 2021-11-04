<template >
  <q-layout view="hHh lpR fFf" class="shadow-2 rounded-borders">
    <q-drawer v-model="drawer" :width="200" :breakpoint="500">
      <q-scroll-area class="fit test">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Inbox</q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>Star</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>Send</q-item-section>
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
          @click="drawer = !drawer"
          round
          dense
          icon="keyboard_arrow_left"
        />
        <!-- Buttons for the toolbar -->
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