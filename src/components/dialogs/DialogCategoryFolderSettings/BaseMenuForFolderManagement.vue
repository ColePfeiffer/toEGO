<template>
  <q-item clickable
    :ripple="false">
    <q-menu fit
      square
      cover
      anchor="top left"
      class="no-border-radius"
      ref="qMenuModelRef"
      v-model="qMenuModel">
      <q-list>
        <!-- Header Item with name and buttons to rename and delete -->
        <q-item v-if="!isRenaming">
          <!-- Button: Close Dropdown Menu -->
          <q-item-section avatar>
            <q-btn size="10px"
              dense
              flat
              color="secondary"
              class="q-pl-sm"
              icon="bi-chevron-left"
              @click="toggleMenu">
            </q-btn>
          </q-item-section>
          <!-- Name and Buttons -->
          <q-item-section>
            <div class="row justify-center items-center">
              <!-- Name -->
              <div class="col-8 name">
                {{ item.name }}
              </div>
              <!-- Button: Edit-->
              <q-btn v-if="!isDeleting"
                class="col-2"
                dense
                round
                flat
                icon="bi-pencil"
                size="10px"
                :ripple="false"
                @click="initiateRenaming">
              </q-btn>
              <!-- Button: Cancel Deleting -->
              <q-btn v-else
                class="col-2"
                dense
                round
                flat
                icon="bi-x"
                size="10.5px"
                :ripple="false"
                @click="cancelDeleting">
              </q-btn>
              <!-- Button: Initiate Deletion -->
              <q-btn v-if="!isDeleting"
                class="col-2"
                dense
                round
                flat
                icon="bi-trash"
                size="10px"
                :ripple="false"
                @click="initiateDeletion">
              </q-btn>
              <!-- Button: Confirm Deleting -->
              <q-btn v-else
                class="col-2"
                dense
                round
                flat
                color="red"
                icon="bi-check"
                size="10.5px"
                :ripple="false"
                @click="deleteItem">
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
        <!-- Header Item when renaming process is on-going -->
        <q-item v-else>
          <!-- Button: Cancel Editing -->
          <q-item-section avatar>
            <q-btn size="10px"
              dense
              round
              flat
              color="secondary"
              class="q-pl-sm"
              icon="bi-chevron-left"
              @click="cancelRenaming">
            </q-btn>
          </q-item-section>
          <!-- Input for changing name -->
          <q-item-section>
            <div class="row justify-center items-center">
              <q-input input-class="inputField"
                class="col-10"
                ref="nameRef"
                bottom-slots
                v-model="newName"
                counter
                maxlength="20"
                dense
                lazy-rules
                :rules="nameRules">
                <template v-slot:hint>Renaming...</template>
              </q-input>
              <q-btn class="col-2"
                round
                dense
                flat
                icon="bi-check"
                color="teal"
                @click="submitNewName" />
            </div>
          </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <!-- Folder or Category Items -->
        <!-- TODO add items -->
        <slot name="children"></slot>
      </q-list>
    </q-menu>

    <!-- Category/Folder Icon -->
    <q-item-section avatar
      top>
      <q-avatar :icon="icon"
        color="transparent"
        text-color="secondary" />
    </q-item-section>

    <!-- Name of category/folder and amount -->
    <q-item-section>
      <q-item-label lines="1">{{ itemName }}</q-item-label>
      <q-item-label caption>{{ childAsText }} {{ getAmount() }}</q-item-label>
    </q-item-section>

    <!-- Icon to show expand status -->
    <q-item-section side>
      <div class="row justify-end items-center q-px-lg">
        <div class="col-1">
          <q-btn dense
            round
            flat
            :icon="expandIcon"
            color="secondary"
            size="10.5px"
            :ripple="false"
            @click="showQMenu">
          </q-btn>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "BaseMenuForFolderManagement",
  props: {
    item: Object,
    childAsText: String,
    icon: String, // bi-folder, or bi-collection
  },
  emits: ["delete-item", "rename-item"],
  components: {},
  data() {
    return {
      expandIcon: "bi-chevron-down",
      qMenuModel: false,
      qMenuModel2: false,
      isDeleting: false,
      isRenaming: false,
      newName: this.item.name,
      nameRules: [(val) => (val && val.length > 0) || "Please enter a name"],
    };
  },
  watch: {
    qMenuModel(newValue) {
      if (newValue === true) {
        this.expandIcon = "bi-chevron-up";
      } else {
        this.expandIcon = "bi-chevron-down";
      }
    },
  },
  computed: {
    itemName() {
      if (this.item.name.length > 15) {
        return this.item.name.substring(0, 15) + "...";
      } else {
        return this.item.name;
      }
    },
  },
  methods: {
    // looks up how many items are stored inside this one
    getAmount() {
      let amount;
      if (this.item.storedIDs != undefined) {
        amount = this.item.storedIDs.length;
      } else {
        amount = this.item.storedIDs.length;
      }
      return amount;
    },

    initiateDeletion() {
      this.isDeleting = true;
    },
    cancelDeleting() {
      this.isDeleting = false;
    },
    deleteItem() {
      this.$emit("delete-item", this.item);
    },
    initiateRenaming() {
      this.isRenaming = !this.isRenaming;
    },

    cancelRenaming() {
      this.$refs.nameRef.resetValidation();
      this.isRenaming = false;
      this.newName = this.item.name;
    },
    // TODO
    submitNewName() {
      let payload = { item: this.item, newName: this.newName };
      this.$emit("rename-item", payload);
      this.isRenaming = false;
    },
    showQMenu() {
      this.$refs.qMenuModelRef.show;
    },
    toggleMenu() {
      this.qMenuModel = !this.qMenuModel;
    },
  },
};
</script>

<style>
.name {
  font-weight: 500;
}

.inputField {
  margin-top: 15px;
  padding-top: 0px;
}
</style>
