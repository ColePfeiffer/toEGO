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
          <!-- <div class="col text-overline text-right">[-] [x]</div> -->
        </div>
      </div>

      <slot name="content"></slot>

      <div class="col=1 text-right">
        <q-btn class="button" flat label="Close" @click="closeDialog" />
        <q-btn class="button" flat label="Save" @click="saveChanges" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["close-Dialog, save-Changes"],
  props: {
    isVisible: Boolean,
  },
  methods: {
    closeDialog() {
      console.log("Closing!");
      this.$emit("close-Dialog");
    },
    saveChanges() {
      console.log("Saving!");
      this.$emit("save-Changes");
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