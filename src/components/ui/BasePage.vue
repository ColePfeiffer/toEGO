<template>
  <q-page>
    <div class="row justify-center items-center q-pa-md q-pt-lg">
      <!-- Header / Titlebar-->
      <div class="title-bar col-md-11 col-12 row justify-center shadow-1"
        :style="$store.getters['layout/getStyleForTitleBar'](mode)">
        <slot name="titlebar">
          <div class="title-bar-text"
            :style="getMargin">
            <div class="q-pr-lg row justify-between items-center no-wrap"
              :style="getPadding">
              <slot name="title-bar-icon"
                class="q-pl-xl"></slot>
              <slot name="title">
                <div class="q-pl-sm">
                  {{ titleOfPage }}
                </div>
              </slot>
            </div>
          </div>
          <div class="title-bar-controls"
            :style="getMargin">
            <slot name="title-bar-controls"></slot>
          </div>
        </slot>
      </div>


      <!-- Content -->
      <div class="col-md-11 col-12 q-mt-sm shadow-2"
        :style="$store.getters['layout/getStyleForBasePage']({ 'mode': mode, 'backgroundColor': backgroundColor, 'isUsingBackgroundColorAsDefaultColor': isUsingBackgroundColorAsDefaultColor })">
        <div :style="getHeightForContent">
          <q-resize-observer @resize="onResize" />
          <slot name="content-without-scrollarea">
            <BaseScrollArea :style="getStyleForScrollArea"
              :positionToTheRight="1">
              <template v-slot:content>
                <slot name="content"></slot>
              </template>
            </BaseScrollArea>
          </slot>
        </div>

      </div>

      <!-- Footer / Buttons -->
      <div class="col-md-11 col-12 q-mt-md">
        <div class="row justify-end items-center no-wrap">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import BaseScrollArea from "./BaseScrollArea.vue";

export default {
  name: "BasePage",
  components: { BaseScrollArea },
  props: {
    titleOfPage: String,
    mode: {
      type: String,
      default: "solid",
    },
    backgroundColor: String,
    isUsingBackgroundColorAsDefaultColor: {
      type: Boolean,
      default: false,
    },
    heightForContent: {
      type: String,
      default: "70vh",
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onResize(size) {
      if (size.height != 0) {
        this.$store.commit("layout/setInnerSize", size);
      }
    },
  },
  computed: {
    getHeightForContent() {
      return { "height": this.heightForContent }
    },
    getStyleForScrollArea() {
      let style = {};
      style["height"] = this.$store.state.layout.innerHeight * .97 + "px";
      if (this.mode === 'retro') {
        style["margin-top"] = "6px";
      } else {
        style["margin-top"] = "0px";
      }
      return style;
    },
    getMargin() {
      let style = {};
      if (this.mode === 'retro') {
        style["margin-top"] = "4px";
      } else {
        style["margin-top"] = "0px";
      }
      return style;
    },
    getPadding() {
      if (this.mode === 'retro') {
        return {
          "padding-left": "7px",
          "padding-right": "5px",
          "margin-right": "5px"
        }
      } else {
        return {
          "padding-left": "2px",
          "padding-right": "5px",
          "margin-right": "5px",
        }
      }
    }

  }
};
</script>

<style scoped src="98.css">
.title-bar {
  max-height: 33px;
}
</style>
