<template>
  <!-- whole thing -->
  <q-dialog class="baseDialog full-height"
    persistent>
    <!-- row -->
    <div style="box-shadow: none"
      class="row justify-center items-center q-pa-none">
      <div :style="styleForDialog"
        class="col-12 col-xs-10 col-sm-8 col-md-7 col-lg-4 col-xl-3">
        <div class="window row">
          <!-- Title Bar -->
          <div class="title-bar col-12"
            :style="$store.getters['layout/getStyleForTitleBar']('default')">
            <div class="title-bar-text">
              <div class="q-pr-lg row justify-between items-center no-wrap">
                <div style="padding: 4px">
                  <q-icon :name="icon"
                    size="19px" />
                </div>
                <div class="q-pl-sm">
                  {{ dialogTitle }}
                </div>
              </div>
            </div>
            <div class="title-bar-controls">
              <slot name="title-bar-controls">
                <BaseButtonForTitleBar v-if="hasHelpOption"
                  class="no-box-shadow q-mr-xs"
                  icon="bi-question"
                  size="10px"
                  @click-button="showHelp"></BaseButtonForTitleBar>

                <BaseButtonForTitleBar class="no-box-shadow q-mr-xs"
                  icon="bi-x"
                  size="10px"
                  @click-button="closeDialog"></BaseButtonForTitleBar>
              </slot>

            </div>
          </div>

          <!-- Content -->
          <div class="col-12"
            :style="styleForContent">
            <BaseScrollArea :style="getStyleForScrollArea"
              :positionToTheRight="1">
              <template v-slot:content>
                <slot name="content">
                </slot>
              </template>

            </BaseScrollArea>



            <!-- Footer Slot | Option to hide buttons -->
            <div class="col-12">
              <!--     position: absolute; bottom: 12%; right: 12%; -->
              <div class="row justify-end items-center no-wrap">
                <div class="col-auto"
                  :style="styleForFooterButtons">
                  <slot name="footer-buttons">
                    <BaseButtonForFooter v-if="button1.isShown"
                      class="q-mr-sm"
                      :buttonText="button1.text"
                      @click-button="closeDialog">
                    </BaseButtonForFooter>
                    <BaseButtonForFooter v-if="button2.isShown"
                      style="margin-right:2px"
                      :buttonText="button2.text"
                      :disabled="isButton2Disabled"
                      @click-button="saveChanges">
                    </BaseButtonForFooter>
                  </slot>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import BaseButtonForFooter from '../common/BaseButtonForFooter.vue';
import BaseButtonForTitleBar from '../common/BaseButtonForTitleBar.vue';
import BaseScrollArea from "../common/BaseScrollArea.vue";
export default {
  name: "ImprovedBaseDialog",
  components: { BaseButtonForFooter, BaseButtonForTitleBar, BaseScrollArea },
  emits: ["closeDialog", "save", "showHelp"],
  props: {
    dialogTitle: String,
    icon: String,
    minHeight: {
      type: Number,
      default: 300,
    },
    hasHelpOption: {
      type: Boolean,
      default: false
    },
    isButton2Disabled: {
      type: Boolean,
      default: false,
    },
    button1: Object,
    button2: Object
  },
  data() {
    return {
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    saveChanges() {
      this.$emit("save");
    },
    showHelp() {
      this.$emit("showHelp");
    },
  },
  computed: {
    getStyleForScrollArea() {
      let style = {};
      style["height"] = this.$store.state.layout.height * 0.69 + "px";
      style["margin-top"] = "0px";
      style["margin-bottom"] = "0px";
      return style;
    },
    styleForDialog() {
      let style = {};
      style["width"] = this.$store.state.layout.width * 0.90 + "px";
      style["box-shadow"] = "none";
      return style;
    },
    styleForFooterButtons() {
      let style = {};
      style["margin-top"] = "15px";
      style["margin-bottom"] = "20px";
      style["margin-right"] = "15px";
      return style;
    },
    styleForContent() {
      let style = {};

      if (this.$store.getters["data/isDarkModeActive"]) {
        style = {
          "background-color": this.$store.state.layout.dark,
          "min-height": this.minHeight,
        };
      }
      else {
        style = {
          "background-color": this.$store.state.layout.whitesmoke,
          "min-height": this.minHeight,
        };
      }
      return style;
    },
  },

};
</script>

<style scoped src="98.css">
.dialogBox {
  background-color: whitesmoke;
}

.baseDialog :deep(.q-dialog__inner > div) {
  box-shadow: none;
}
</style>
