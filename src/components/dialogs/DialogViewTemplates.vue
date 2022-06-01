<template>
  <baseDialog
    v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="pasteTemplate"
    :widthOfDialog="315"
  >
    <template v-slot:confirm-button> Paste </template>
    <template v-slot:close-button> Cancel </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Template Viewer
    </template>
    <template v-slot:content>
      <!-- v-for list of templates, kommt später weg -->
      <div class="row items-center justify-center">
        <div class="column items-center justify-center">
          <q-btn-dropdown
            ref="btnDropdown"
            class="btnDropdown"
            color="primary"
            label="Template"
          >
            <q-virtual-scroll
              style="max-height: 300px"
              :items="templates"
              separator
              v-slot="{ item, index }"
            >
              <q-item :key="index" dense clickable>
                <q-item-section>
                  <q-btn flat @click="setTemplate(index)"
                    >#{{ index }} - {{ item.name }}</q-btn
                  >
                </q-item-section>
              </q-item>
            </q-virtual-scroll>
          </q-btn-dropdown>

          <q-card flat bordered class="templateCard bg-grey-1">
            <q-card-section>
              <div class="text-h6">{{ currentTemplate.name }}</div>
            </q-card-section>

            <q-card-section class="templateTextContainer">
              <div v-if="currentTemplate.text.length >= 350">
                <div
                  v-html="currentTemplate.text.substring(0, 350) + ' [...]'"
                ></div>
              </div>
              <div v-else v-html="currentTemplate.text"></div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn
                class="cardButton"
                :icon="defaultTemplateIcon"
                @click="setDefaultStatus"
                flat
              >
                <q-tooltip
                  >Make default: Every new entry will start with this
                  template.</q-tooltip
                ></q-btn
              >
              <q-btn class="cardButton" icon="bi-trash" flat />
              <q-btn
                class="cardButton"
                icon="bi-journal-plus"
                @click="pasteTemplate(currentTemplate.text)"
                flat
              />
            </q-card-actions>
          </q-card>
          <br />
          <div class="text q-pl-md">
            <q-icon name="bi-arrow-90deg-up"></q-icon>
            <div>
              You can set a default template here. Every newly created entry
              will start with this template.
            </div>
          </div>
        </div>
      </div>
    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/baseDialog2.vue";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate", "deleteTemplate", "closeDialog"],
  components: {
    baseDialog,
  },
  data() {
    return {
      icon: true,
      menuIcon: "bi-file-earmark-font",

      currentTemplate: this.$store.state.data.diaryTemplates[0],
    };
  },
  methods: {
    setDefaultStatus() {
      this.$store.commit(
        "data/setDefaultStatusOfTemplate",
        this.currentTemplate.id
      );
    },
    setTemplate(index) {
      console.log("biep");
      this.currentTemplate = this.templates[index];
      this.$refs.btnDropdown.hide();
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    deleteTemplate() {
      this.$emit("deleteTemplate");
    },
    pasteTemplate() {
      this.$emit("pasteTemplate");
    },
  },
  computed: {
    defaultTemplateIcon() {
      if (this.currentTemplate.isSetToDefault === true) {
        return "bi-bookmark-star-fill";
      } else {
        return "bi-bookmark-star";
      }
    },
    templates() {
      return this.$store.state.data.diaryTemplates.slice();
    },
    isDialogVisible: {
      get() {
        if (
          this.$store.state.data.dialogSettings.isVisible === true &&
          this.$store.state.data.dialogSettings.nameOfCurrentDialog ===
            "dialogViewTemplates"
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        let payload = {
          isVisible: value,
          isBackgroundVisible:
            this.$store.state.data.dialogSettings.isBackgroundVisible,
          nameOfCurrentDialog:
            this.$store.state.data.dialogSettings.nameOfCurrentDialog,
        };
        this.$store.commit("data/setDialogVisibility", payload);
      },
    },
  },
};
</script>

<style scoped>
.templateCard {
  width: 200px;
}
.templateTextContainer {
  min-height: 250px;
  max-height: 300px;
}

.btnDropdown {
  width: 200px;
}

.cardButton {
  font-size: 10px;
}
</style>