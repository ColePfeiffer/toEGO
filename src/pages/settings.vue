<template>
  <q-page class="q-pa-md">
    <div>SETTINGS</div>
    <div>
      <q-option-group
        v-model="group"
        :options="options"
        color="accent"
        type="toggle"
      >
        <template v-slot:label="isDarkModeOn">
          <div class="row items-center">
            <span>{{ isDarkModeOn.label }}</span>
            <q-icon :name="isDarkModeOn.icon" size="1.5em" class="q-ml-sm" />
          </div>
        </template>
      </q-option-group>
      <q-list padding class="menu-list">
        <q-item clickable v-ripple @click="setDarkMode()">
          <q-item-section avatar>
            <q-icon name="fas fa-moon" />
          </q-item-section>

          <q-item-section>Dark-Mode</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="toggleExpandButtonForEventsOnDiaryPage()"
        >
          <q-item-section avatar>
            <q-icon name="drafts" />
          </q-item-section>
          <q-item-section
            >Show expand button for events on Diary Page?</q-item-section
          >
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      group: [],
      options: [
        {
          label: "Dark-Mode",
          value: "isDarkModeOn",
          icon: "bi-moon",
        },
        {
          label: "Show expand button for events on Diary Page",
          value: "op2",
          icon: "bi-chevron-expand",
        },
        {
          label: "Option 3",
          value: "op3",
        },
      ],
    };
  },
  components: {},
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    toggleExpandButtonForEventsOnDiaryPage() {
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
  },
};
</script>
