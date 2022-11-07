<template>
  <div class="q-px-sm q-mt-xl q-pt-lg stepper-container"
    :style="getStepperStyle">

    <q-stepper v-model="computedStep"
      class="my-stepper"
      vertical
      padding="xs"
      ref="stepper"
      :color="colorForStepper"
      done-color="secondary"
      :active-color="activeColorForStepper"
      inactive-color="grey-4"
      animated>
      <q-btn icon="bi-x"
        class="close-button-for-stepper absolute-top-right"
        size="11px"
        dense
        flat
        color="secondary"
        @click="finish">
      </q-btn>
      <slot name="steps">

      </slot>

      <slot name="content-without-scroll-area">
        <BaseScrollArea :style="getStyleForScrollArea">
          <template v-slot:content>
            <div class="q-pt-sm   row justify-center items-center"
              style="font-size: 12px">
              <slot name="step-content">
              </slot>
            </div>
          </template>
        </BaseScrollArea>
      </slot>

      <div class="q-pt-md   row justify-center items-center">
        <div class="col-12">
          <slot name="stepper-navigation">
            <q-stepper-navigation>
              <div class="row justify-end items-center">
                <q-img class="col-3 q-mr-sm"
                  :src="'/images/ghost-pink-hue.gif'"
                  :style="styleForGhost"
                  spinner-color="white" />
                <q-btn class="col-3 q-mr-sm"
                  v-if="step != 1"
                  flat
                  @click="goStepBack"
                  label="Back" />
                <div class="col-3 q-mr-sm"
                  v-else>
                </div>
                <q-btn v-if="step != numberOfSteps"
                  class="col-3"
                  @click="goStepForward"
                  color="primary"
                  label="Next" />
                <q-btn class="col-3"
                  v-else
                  @click="finish"
                  color="primary"
                  label="Finish" />
              </div>
            </q-stepper-navigation>
          </slot>
        </div>
      </div>
    </q-stepper>



  </div>
</template>

<script>
import BaseScrollArea from "../ui/BaseScrollArea.vue";

export default {
  name: "BaseStepper",
  emits: ["go-step-forward", "go-step-backward", "finish"],
  components: { BaseScrollArea },
  props: {
    numberOfSteps: Number,
    step: Number
  },
  data() {
    return {};
  },
  methods: {
    goStepForward() {
      if (this.step != this.numberOfSteps) {
        this.$emit("go-step-forward");
      }
    },
    goStepBack() {
      if (this.step != 1) {
        this.$emit("go-step-backward");
      }
    },
    finish() {
      this.$emit("finish");
    }
  },
  computed: {
    colorForStepper() {
      if (this.$store.getters["layout/isDarkModeActive"]) {
        return "secondary"
      } else {
        return "black"
      }
    },
    activeColorForStepper() {
      if (this.$store.getters["layout/isDarkModeActive"]) {
        return "white"
      } else {
        return "black"
      }
    },
    styleForGhost() {
      if (this.$store.getters["layout/isDarkModeActive"]) {
        return {
          'height': "50px",
          'max-width': "50px",
          "opacity": "1"
        }
      } else {
        return {
          'height': "50px",
          'max-width': "50px",
          "opacity": "0.5"
        }
      }

    },
    getStyleForScrollArea() {
      let style = {};
      style['height'] = this.$store.state.layout.height * 0.25 + "px";
      return style;
    },
    getStepperStyle() {
      let style = {};
      let width = this.$store.state.layout.innerWidth;
      //style["height"] = this.$store.state.layout.height * 0.7 + "px";
      style["font-family"] = "Inter";
      style["width"] = width + "px";
      style["margin-left"] = -width / 2 + "px";
      return style;
    },
    computedStep: {
      get() {
        return this.step;
      },
      set() {
      }
    }
  },

};
</script>

<style lang="sass">
.my-stepper
  .q-stepper__nav
    padding-top: 0px

.my-stepper
    padding-top: 12px
    padding-bottom: 12px
    padding-left: 30px
    padding-right: 25px


.my-stepper
  .q-stepper__step-inner
    padding: 0px

.my-stepper
    .q-stepper__tab
        padding-left: 0px
        padding-right: 0px
        padding-top: 10px
        padding-bottom: 10px

.stepper-container
    position: absolute
    z-index: 2
    left: 50%



.close-button-for-stepper
    margin-top: 25px
    margin-right: 7px
    padding: 10px
    z-index: 2


</style>
