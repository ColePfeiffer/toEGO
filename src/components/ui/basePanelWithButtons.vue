<template>
  <div class="promptContainer col q-mx-md q-mt-xs q-pa-md">
    <div class="row justify-center items-center">
      <div class="col-12 ButtonWrapper" :style="hideBorder">
        <q-btn-toggle
          v-model="panel"
          toggle-color="accent"
          flat
          :options="[
            { value: 'button1', slot: 'button1' },
            { value: 'button2', slot: 'button2' },
          ]"
        >
          <template v-slot:button1>
            <baseButton
              :text="names[0]"
              :changeColor="false"
              :setStyleTo="'styleA'"
              class="FloatingButton"
              @onClick="setPanel(names[0])"
            ></baseButton>
          </template>

          <template v-slot:button2>
            <baseButton
              :text="names[1]"
              :changeColor="false"
              :setStyleTo="'styleB'"
              class="FloatingButton"
              @onClick="setPanel(names[1])"
            ></baseButton>
          </template>
        </q-btn-toggle>

        <!-- Panels -->
        <div v-if="showPanels === true">
          <q-tab-panels
            v-model="panel"
            animated
            class="noBackground row justify-center q-mt-none items-center"
            style="margin-top: -15px"
          >
            <q-tab-panel
              name="option.name"
              ref="option.name"
              v-for="option in options"
              :key="option.value"
            >
              <div class="text-h6">{{ option.value }}</div>
              <div class="underlined promptTitle"></div>

              <slot :name="[option.value]"> </slot>

              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseButton from "./baseButton.vue";

export default {
  props: {
    options: [],
    names: [],
  },
  data() {
    return {
      panel: "",
      showPanels: false,
    };
  },
  components: {
    baseButton,
  },
  created() {
    console.log("bleeee");
  },
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
  emits: ["scroll"],
  methods: {
    scroll() {
      this.$emit("scroll");
    },
    onClick() {
      this.$emit("onClick", this.refName);
    },
    expandItem() {
      console.log("EXPAND ITEM!");
      //const ele = document.getElementById("oneToFiveMethode");

      //this.$nextTick(() => this.$refs[refName].$el.scrollIntoView());
      //this.scroll(+200);
      this.scroll();
      /*
      this.$nextTick(() =>
        this.$refs[refName].$el.scrollIntoView({
          block: "center",
          inline: "end",
        })
      );*/
    },

    setPanel(name) {
      console.log("Panel: " + this.panel);
      // Show Panel again by double-clicking on a tab
      if (this.panel === name && this.showPanels === false) {
        this.showPanels = true;
        this.panel = name;

        this.expandItem(name);
        // Showing Panel or switching to a different panel
      } else if (this.panel != name) {
        console.log("Changing!");
        this.panel = name;
        this.showPanels = true;

        this.expandItem(name);

        // Hide Panel
      } else {
        console.log("Setting to hidden!");
        this.showPanels = false;
        this.panel = "hidden";
      }
      console.log("Panel: " + this.panel);
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