<template>
  <q-layout view="hHh lpR fFf">
    <!-- Dialog -->
    <DialogNewEvent></DialogNewEvent>
    <!-- Menü -->
    <!-- qDrawer goes in here-->
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
            { label: '', value: 'items', icon: 'view_comfy' },
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
    };
  },
  components: {
    DialogNewEvent,
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
