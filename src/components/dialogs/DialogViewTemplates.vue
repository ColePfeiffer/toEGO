<template>
  <baseDialog
    v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="pasteTemplate"
    @showHelp="showHelp"
    :widthOfDialog="315"
    :hasHelpOption="true"
    :isSaveButtonDisabled="!isAtLeastOneTemplateCreated"
  >
    <template v-slot:confirm-button>Paste</template>
    <template v-slot:close-button> Cancel </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Template Viewer
    </template>
    <template v-slot:content>
      <!-- v-for list of templates, kommt später weg -->
      <div class="row items-center justify-center q-pa-md">
        <div class="column items-center justify-center">
          <div v-if="isAtLeastOneTemplateCreated === true">
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

              <q-card-actions class="row justify-center items-center">
                <q-btn
                  class="cardButton"
                  :icon="defaultTemplateIcon"
                  @click="setDefaultStatus"
                  flat
                >
                </q-btn>
                <q-btn
                  class="cardButton"
                  icon="bi-journal-plus"
                  @click="pasteTemplate(currentTemplate.text)"
                  flat
                />
                <div>
                  <q-fab flat direction="right" padding="md">
                    <template v-slot:icon="{ opened }">
                      <q-icon
                        :class="{
                          'example-fab-animate--hover': opened !== true,
                        }"
                        name="bi-trash"
                        size="20px"
                        style="top: -1px"
                      />
                    </template>

                    <q-fab-action
                      style="left: -30px"
                      class="fabButton"
                      flat
                      color="accent"
                      @click="deleteTemplate"
                      icon="bi-check"
                    />
                  </q-fab>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div v-else>
            <q-card flat bordered class="templateCard bg-grey-1">
              <q-card-section>
                <div class="text-h6">There is nothing here.</div>
              </q-card-section>

              <q-card-section class="templateTextContainer">
                You have no saved templates yet.
              </q-card-section>
              <q-separator />
            </q-card>
          </div>

          <br />
          <div v-if="isHelpShown" class="text">
            <div class="q-pa-sm q-ml-md">
              <q-icon
                class="q-px-sm"
                name="bi-bookmark-star"
                size="15px"
              ></q-icon>
              Make default: Every new entry will start with this template.
            </div>
            <div class="q-pa-sm q-ml-md">
              <q-icon
                class="q-px-sm"
                name="bi-journal-plus"
                size="15px"
              ></q-icon>
              Paste template.
            </div>
            <div class="q-pa-sm q-ml-md">
              <q-icon class="q-px-sm" name="bi-trash" size="15px"></q-icon>
              Delete template.
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
      isHelpShown: false,
      currentTemplate: this.$store.state.data.diaryTemplates[0],
    };
  },
  watch: {
    // whenever the length of templates changes, this will reset the currentTemplate
    lengthOfTemplates(newLength) {
      this.currentTemplate = this.$store.state.data.diaryTemplates[0];
    },
  },
  methods: {
    setDefaultStatus() {
      this.$store.commit(
        "data/setDefaultStatusOfTemplate",
        this.currentTemplate.id
      );
    },
    setTemplate(index) {
      this.currentTemplate = this.templates[index];
      this.$refs.btnDropdown.hide();
    },
    deleteTemplate() {
      this.$emit("deleteTemplate", this.currentTemplate);
    },
    // for baseDialog
    showHelp() {
      this.isHelpShown = !this.isHelpShown;
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    pasteTemplate() {
      this.$emit("pasteTemplate", this.currentTemplate);
    },
  },
  computed: {
    isAtLeastOneTemplateCreated() {
      if (this.lengthOfTemplates != 0) {
        return true;
      } else {
        return false;
      }
    },
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
    lengthOfTemplates() {
      return this.$store.state.data.diaryTemplates.length;
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
  font-size: 11px;
}

.fabButton {
  font-size: 10px;
  font-size: 88px !important;
}
</style>
