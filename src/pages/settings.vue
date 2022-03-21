<template>
  <q-page class="q-pa-md">
    <div>SETTINGS</div>
    <div>
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
    </div>
  </q-page>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
  },
};
</script>