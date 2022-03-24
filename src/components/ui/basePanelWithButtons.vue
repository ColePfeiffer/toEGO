<template>
  <div class="row justify-center items-center">
    <div class="col-12 ButtonWrapper" :style="hideBorder">
      <q-btn-toggle
        v-model="panel"
        toggle-color="accent"
        flat
        :options="[
          { value: 'panelLeft', slot: 'button1' },
          { value: 'panelRight', slot: 'button2' },
        ]"
      >
        <template v-slot:button1>
          <baseButton
            :text="names[0]"
            :changeColor="false"
            :setStyleTo="'styleA'"
            class="FloatingButton"
            @onClick="togglePanelVisibility('panelLeft')"
          ></baseButton>
        </template>

        <template v-slot:button2>
          <baseButton
            :text="names[1]"
            :changeColor="false"
            :setStyleTo="'styleB'"
            class="FloatingButton"
            @onClick="togglePanelVisibility('panelRight')"
          ></baseButton>
        </template>
      </q-btn-toggle>
      <!-- Panels -->
      <div v-if="panelsSetToVisible">
        <q-tab-panels
          v-model="panel"
          animated
          class="noBackground row justify-center q-mt-none items-center"
          style="margin-top: -15px"
        >
          <q-tab-panel name="panelLeft" ref="panelLeft">
            <div class="text-h6">{{ names[0] }}</div>
            <div class="underlined promptTitle"></div>
            <slot name="panelLeftSlot"> </slot>
          </q-tab-panel>

          <q-tab-panel name="panelRight" ref="panelRight">
            <div class="text-h6">{{ names[1] }}</div>
            <div class="underlined promptTitle"></div>
            <slot name="panelRightSlot"> </slot>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import baseButton from "./baseButton.vue";

export default {
  components: {
    baseButton,
  },
  props: {
    options: {
      type: Array,
    },
    names: {
      type: Array,
    },
    hideBordersOnInit: Boolean,
  },
  emits: ["scroll"],
  data() {
    return {
      panel: "",
      panelsSetToVisible: false,
    };
  },
  computed: {
    hideBorder() {
      var style = {};
      if (this.hideBordersOnInit) {
        if (this.panelsSetToVisible) {
          style = { border: "1px solid black" };
        } else {
          style = { border: "none" };
        }
      } else {
        style = { border: "1px solid black" };
      }
      return style;
    },
    showPanel() {
      return this.panelsSetToVisible;
    },
  },
  mounted() {
    if (this.hideBordersOnInit) {
      this.panelsSetToVisible = false;
    } else {
      this.panelsSetToVisible = true;
      this.panel = "panelLeft";
    }
  },
  methods: {
    scroll() {
      this.$emit("scroll");
    },

    togglePanelVisibility(name) {
      // Show Panel again by double-clicking on a tab
      if (this.panel === name && this.panelsSetToVisible === false) {
        this.panelsSetToVisible = true;
        this.panel = name;
        this.scroll();

        // Showing Panel or switching to a different panel
      } else if (this.panel != name) {
        this.panel = name;
        this.panelsSetToVisible = true;
        this.scroll();

        // Hide Panel
      } else {
        this.panelsSetToVisible = false;
        this.panel = "hidden";
      }
    },
  },
};
</script>

<style scoped>
.FloatingButton {
  border: none;
  position: relative;
  bottom: 1.5em;
}
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

.noBackground {
  background: none;
}
</style>