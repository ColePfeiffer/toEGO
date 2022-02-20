<template>
  <div class="col-12 ButtonWrapper" :style="hideBorder">
    <q-btn-toggle v-model="panel" toggle-color="accent" flat :options="options">
      <div v-for="option in options" :key="option.name">
        <template :slot="option.name">
          <baseButton
            :text="option.name"
            :changeColor="false"
            :setStyleTo="'styleA'"
            class="FloatingButton"
            @onClick="onClick(option.value)"
          ></baseButton>
        </template>
      </div>
    </q-btn-toggle>

    <!-- Panels -->
    <div v-if="showPanels === true">
      <q-tab-panels
        v-model="panel"
        animated
        class="noBackground row justify-center q-mt-none items-center"
        style="margin-top: -15px"
      >
        <q-tab-panel name="methods" ref="methods">
          <div class="text-h6">Methods</div>
          <div class="underlined promptTitle"></div>
          <fiveToOneMethod @onShow="scrollDown"></fiveToOneMethod>
          <handlingEmotions @onShow="scrollDown"></handlingEmotions>

          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="templates" ref="templates">
          <div class="text-h6">Templates</div>
          <div class="underlined promptTitle"></div>

          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import baseMethod from "./baseMethod.vue";

export default {
  components: { baseMethod },
  computed: {
    hideBorder() {
      var style = {};

      if (this.showPanels) {
        console.log("Computed: Show panels");

        style = { border: "1px solid black" };
      } else {
        console.log("Computed:  Hide panels");
        style = { border: "none" };
      }

      return style;
    },
  },
  data() {
    return {
      panel: "",
      showPanels: false,
    };
  },

  methods: {
    onShow() {
      this.$emit("onShow", this.refName);
    },
  },
};
</script>

<style scoped>
.ButtonWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 5%;
  margin-right: 5%;
  box-sizing: border-box;
  margin-bottom: 5%;
  margin-top: 5%;
  border: 1px solid black;
}
</style>