<template>
  <!-- available slots: headername -->
  <!-- Name and button to create a new item -->
  <q-item-label header>
    <div class="row justify-between items-center no-wrap">
      <!-- Header -->
      <div v-if="!isCreatingNewItem"
        :style="styleForHeaderText"
        class="header col-10">
        <slot name="headername">Headername</slot>
      </div>
      <!-- Creating new folder mode: Input field -->
      <div v-else
        class="col-10">
        <div class="row justify-between items-center">
          <div class="col-1">
            <!-- Button: Cancel Creation of new folder -->
            <q-btn dense
              round
              flat
              color="secondary"
              icon="bi-chevron-left"
              size="10px"
              :ripple="false"
              @click="cancelCreatingNewItem">
            </q-btn>
          </div>
          <!-- Input field -->
          <q-input class="col-9"
            input-class="inputField"
            ref="nameRef"
            bottom-slots
            v-model="newItemName"
            counter
            maxlength="20"
            dense
            lazy-rules
            :rules="nameRules">
            <template v-slot:hint>Enter a name</template>
          </q-input>
        </div>
      </div>
      <!-- Buttons -->
      <div class="col-2 row justify-end no-wrap">
        <div class="col-2 q-pr-lg">
          <!-- Button: Initiate Creation of new folder -->
          <q-btn v-if="!isCreatingNewItem"
            class="col-2 q-px-md"
            color="accent"
            dense
            round
            flat
            icon="bi-plus-lg"
            size="10px"
            :ripple="false"
            @click="initiateCreatingNewItem">
          </q-btn>
          <!-- Button: Confirm Creation of new folder -->
          <q-btn v-else
            class="col-2 q-px-md"
            dense
            round
            flat
            color="teal"
            icon="bi-check"
            size="10px"
            :ripple="false"
            @click="submitName">
          </q-btn>
        </div>
      </div>
    </div>
  </q-item-label>
  <q-resize-observer @resize="onResize" />

  <!-- Content -->
  <q-scroll-area style="height: 134px">
    <div :style="styleForContent">
      <slot name="itemsToDisplay"></slot>
    </div>
  </q-scroll-area>
</template>

<script>

export default {
  name: "BaseSection",
  emits: ["create-new-item"],
  components: {
  },
  data() {
    return {
      styleForContent: { width: "200px" },
      isCreatingNewItem: false,
      newItemName: "",
      nameRules: [
        (val) => (val && val.length > 0) || "Please name the folder.",
      ],
    };
  },
  computed: {
    styleForHeaderText() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return { 'color': 'white' };
      } else {
        return { 'color': 'black' };
      }
    }
  },
  methods: {
    onResize(size) {
      this.styleForContent = {
        height: size.height - 2 + "px",
        width: size.width - 2 + "px",
        "max-height": "120px",
      };
      //report.value = size;
    },
    cancelCreatingNewItem() {
      this.isCreatingNewItem = false;
      this.$refs.nameRef.resetValidation();
      this.newItemName = "";
    },
    initiateCreatingNewItem() {
      this.isCreatingNewItem = true;
    },
    submitName() {
      let nameInput = this.$refs.nameRef;
      nameInput.validate();
      // if form has error
      if (nameInput.hasError) {
      } else {
        this.$q.notify({
          icon: "bi-check",
          color: "secondary",
          textColor: "black",
          message: "New item created.",
        });
        this.createNewItem();
      }
    },
    createNewItem() {
      this.$emit("create-new-item", this.newItemName);
      this.cancelCreatingNewItem();
    },
  },
};

</script>
