<template>
  <q-dialog
    :value="isVisible"
    class="baseDialog"
    full-width
    full-height
    persistent
  >
    <div class="window dialogBox column full-height" style="opacity: 0.8">
      <div class="col-1">
        <div class="title-bar" style="background: #ee2e31">
          <div class="title-bar-text">
            <slot name="dialogTitle"></slot>
          </div>
          <div class="title-bar-controls">
            <button aria-label="Help"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
      </div>

      <slot name="content"></slot>

      <!-- The footer slot is used for modals without buttons -->
      <slot name="footer">
        <div class="col=1 text-right q-pa-sm mx-auto">
          <q-btn class="button" flat @click="closeDialog">
            <slot name="close-button"> Close </slot>
          </q-btn>
          <q-btn class="button" @click="saveChanges">
            <slot name="confirm-button"> Save </slot>
          </q-btn>
        </div>
      </slot>
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
};
</script>

<style scoped src="98.css">
.baseDialog >>> .window {
  background-color: #000;
  color: #fff;
}

.iconTitleContainer {
  border-bottom: 1px solid white;
}
</style>