<template>
  <q-dialog
    :value="isVisible"
    class="baseDialog"
    full-height
    full-width
    persistent
  >
    <div class="test row justify-center" :style="boxShadowStyle">
      <div class="col-12 col-md-7">
        <div class="window dialogBox column full-height" :style="styleB">
          <!-- Title Bar -->
          <div class="col-1">
            <div class="title-bar row" style="background: #dfd4f5">
              <div class="title-bar-text">
                <slot name="dialogTitle"></slot>
              </div>
              <div class="title-bar-controls">
                <button aria-label="Help"></button>
                <button aria-label="Close"></button>
              </div>
            </div>
          </div>

          <!-- Content Slot -->
          <slot name="content"></slot>

          <!-- Footer Slot | Option to hide buttons -->
          <slot name="footer">
            <div class="col-1 q-pa-sm">
              <div class="row">
                <q-btn
                  class="button col-3 col-md-2 offset-5 offset-md-7 q-mx-xs"
                  flat
                  @click="closeDialog"
                >
                  <slot name="close-button"> Close </slot>
                </q-btn>

                <q-btn
                  class="button col-3 col-md-2 q-mx-xs"
                  @click="saveChanges"
                >
                  <slot name="confirm-button"> Save </slot>
                </q-btn>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
/*

for main container

color: white; background-color: black


*/
export default {
  name: "baseDialog",
  emits: ["close, save"],
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      boxShadowStyle: {
        "box-shadow": "none",
      },
      styleA: {
        "background-color": "#121212 ",
        color: "white",
        opacity: "0.8",
      },
      styleB: {
        "background-color": "#989898 ",
        color: "black",
      },

      mobileModeActive: true,
      // inline css style with variables
      classSmall: { "full-width": true },
      classBig: { "max-width": "80%", width: "70%" },
    };
  },
  methods: {
    closeDialog() {
      console.log("Closing!");
      this.$emit("close");
    },
    saveChanges() {
      console.log("Saving!!");
      this.$emit("save");
    },
  },
  computed: {
    // a computed getter
    setStyle() {
      var style = {};
      console.log("display mode changed");

      if (this.mobileModeActive) {
        console.log("mobile");
        // `this` points to the vm instance
        style = this.styleA;
      } else {
        console.log("desktop view");
        style = this.styleB;
      }

      return style;
    },
  },
};
</script>

<style scoped src="98.css">
.baseDialog >>> .window {
  color: #fff;
}

.iconTitleContainer {
  border-bottom: 1px solid white;
}

.baseDialog >>> .q-dialog__inner > div {
  box-shadow: none;
}
</style>