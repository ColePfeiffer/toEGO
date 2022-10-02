<template>
  <q-page>
    <BasePage icon="bi-gear-fill"
      titleOfPage="Settings">
      <template v-slot:title-bar-icon>
        <q-icon name="bi-menu-button-wide-fill"
          size="25px" />
      </template>
      <template v-slot:title-bar-controls></template>
      <template v-slot:content>
        <q-tabs v-model="settingsTab"
          dense
          class="text-grey tab"
          active-color="accent"
          indicator-color="accent"
          align="justify"
          no-caps
          narrow-indicator>
          <q-tab name="view"
            label="View" />
          <q-tab name="other"
            label="Other" />
          <q-tab name="account"
            label="Account" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="settingsTab"
          animated>
          <q-tab-panel name="view">
            <div class="q-px-md promptTitle underlined">General</div>
            <div class="q-mb-xl">
              <div class="smallText borderStyleForTab q-mt-md">
                <q-list class="q-tb-md">
                  <q-item tag="label"
                    v-ripple>
                    <q-item-section>
                      <q-item-label>Dark-Mode</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-toggle color="accent"
                        v-model="isDarkModeTurnedOn"
                        val="battery" />
                    </q-item-section>
                  </q-item>

                  <q-item tag="label"
                    :v-ripple="false">
                    <q-item-section>
                      <q-item-label>Font</q-item-label>
                      <q-item-label caption>Use a non-pixel font.</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-btn-toggle v-model="isUsingNonPixelFont"
                        color="transparent"
                        text-color="primary"
                        glossy
                        unelevated
                        toggle-color="accent"
                        toggle-text-color="primary"
                        no-caps
                        :options="[
                          {label: '1', value: '1'},
                          {label: '2', value: '2'},
                          {label: '3', value: '3'}
                        ]" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            <div>
              <div class="q-px-md promptTitle underlined">Events</div>
              <div class="smallText borderStyleForTab q-mt-md">
                <q-list class="q-tb-md">
                  <q-item tag="label"
                    v-ripple>
                    <q-item-section>
                      <q-item-label>Show expand button</q-item-label>
                      <q-item-label caption>Show the button to expand individual events on the diary page.
                      </q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-toggle color="accent"
                        v-model="isShowingExpandButtonForEventsViaDiary"
                        val="battery" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="other">
            <div class="text-h6">Other</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="account">
            <div class="text-h6">Account</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </template>
      <template v-slot:footer></template>
    </BasePage>

  </q-page>
</template>

<script>
import { mapMutations } from "vuex";
import BasePage from "src/components/ui/BasePage.vue";

export default {
  components: { BasePage },
  data() {
    return {
      model: "1",
      notifications: "",
      settingsTab: 'view',
      isDarkModeTurnedOn: false,
      isUsingNonPixelFont: false,
      isShowingExpandButtonForEventsViaDiary: false,
    };
  },
  watch: {
    isDarkModeTurnedOn(newValue) {
      console.log(newValue);
      this.setDarkMode();
    },
    isShowingExpandButtonForEventsViaDiary(newValue) {
      console.log(newValue);
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
  },
};
</script>

<style scoped>
.borderStyleForTab {
  font-size: 12.5px;
  background: whitesmoke;
  border-radius: 0px;
}

.tab {
  font-size: 12.5px;
  background: whitesmoke;
}

.underlined {
  border-bottom: 1px solid var(--q-secondary);
  padding: 0 0 4px;
}

.promptTitle {

  font-size: 1.1em;
  color: lightgrey;
}
</style>
