<template>
  <q-dialog
    :value="isVisible"
    class="dialogBox"
    full-width
    full-height
    persistent
  >
    <div
      class="dialogBox column full-height q-pa-sm"
      style="border: 1px solid white"
    >
      <div class="col-1">
        <div class="topContainer row">
          <div class="col text-overline text-left">
            <div class="iconTitleContainer q-pa-xs">
              <slot name="dialogTitle"></slot>
            </div>
          </div>
        </div>
      </div>

      <slot name="content"></slot>

      <!-- The footer slot is used for modals without buttons -->
      <slot name="footer">
        <div class="col=1 text-right">
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
      console.log("Saving!");
      this.$emit("save");
    },
  },
};
</script>

<style>
.dialogBox {
  background-color: #000;
  opacity: 0.65;
  color: #fff;
}
.button {
}

.iconTitleContainer {
  border-bottom: 1px solid white;
}
</style>