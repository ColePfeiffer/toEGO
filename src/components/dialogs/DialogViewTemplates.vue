<template>
  <baseDialog v-model="isDialogVisible" @closeDialog="closeDialog" @save="pasteTemplateAndClose" @showHelp="showHelp"
    :widthOfDialog="315" :hasHelpOption="true" :isSaveButtonDisabled="!isAtLeastOneTemplateCreated">
    <template v-slot:confirm-button>Paste</template>
    <template v-slot:close-button> Back </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Template Viewer
    </template>
    <template v-slot:content>
      <!-- v-for list of templates, kommt später weg -->
      <div class="row items-center justify-center q-pa-md fixedHeight">
        <div class="column items-center justify-center">
          <div class="row no-wrap justify-center items-center">

            <div v-if="isAtLeastOneTemplateCreated === true" :style="'width: 300px'">
              <!-- Template and Filter Dropdown Buttons -->
              <div class="row no-wrap justify-center items-center containerForHeaderOfTemplateViewer">
                <!-- Pick template Dropdown Button  -->
                <q-btn-dropdown ref="btnDropdown " class="col-8" :ripple="false" flat no-caps color="transparent"
                  text-color="black" label="Pick Template">
                  <q-virtual-scroll style="max-height: 300px" :items="templates" separator v-slot="{ item, index }">
                    <q-item :key="index" dense clickable>
                      <q-item-section>
                        <q-btn flat @click="setTemplate(index)">#{{ index }} - {{ item.name }}</q-btn>
                      </q-item-section>
                    </q-item>
                  </q-virtual-scroll>
                </q-btn-dropdown>
                <!-- Filter Dropdown Button -->
                <q-btn-dropdown ref="btnDropdown " class="col-4 " :ripple="false" flat no-caps color="transparent"
                  text-color="black" label="Filter">
                  <q-virtual-scroll style="max-height: 300px" :items="templates" separator v-slot="{ item, index }">
                    <q-item :key="index" dense clickable>
                      <q-item-section>
                        <q-btn flat @click="setTemplate(index)">#{{ index }} - {{ item.name }}</q-btn>
                      </q-item-section>
                    </q-item>
                  </q-virtual-scroll>

                </q-btn-dropdown>
              </div>


              <q-card flat bordered square class=" bg-grey-1">
                <q-card-section>
                  <div class="text-h6">{{ currentTemplate.name }}</div>
                </q-card-section>

                <q-card-section class="templateTextContainer">
                  <q-scroll-area :style="StyleTmplateTextScrollArea">
                    <div v-if="
                      currentTemplate.text.length >= maxNumberOfDisplayedChars
                    ">
                      <div v-html="
                        currentTemplate.text.substring(
                          0,
                          maxNumberOfDisplayedChars
                        ) + ' [...]'
                      "></div>
                    </div>
                    <div v-else v-html="currentTemplate.text"></div>
                  </q-scroll-area>
                </q-card-section>
                <q-separator />

                <q-card-actions class="row justify-center items-center">
                  <q-btn class="cardButton" icon="bi-tags" @click="openSetCategoryMenu" flat :ripple="false">
                    <q-menu dense anchor="top middle" self="bottom middle">
                      <q-list dense style="min-width: 100px">




                        <q-item clickable @click="openSetCategoryMenu">
                          <q-item-section avatar>
                            <q-icon color="primary" name="bi-plus" />
                          </q-item-section>
                          <q-item-section>New category</q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="openSetCategoryMenu">
                          <q-item-section avatar>
                            <q-icon color="primary" name="bi-gear" />
                          </q-item-section>
                          <q-item-section>Settings</q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="openSetCategoryMenu">
                          <q-item-section avatar>
                            <q-icon color="primary" name="bi-x" />
                          </q-item-section>
                          <q-item-section>Unset all</q-item-section>
                        </q-item>
                        <q-separator />

                        <!-- For Folders -->
                        <q-item dense clickable v-for="folder in $store.state.data.foldersForDiary" :key="folder">
                          <q-item-section>{{ folder.name }}</q-item-section>
                          <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                          </q-item-section>
                          <!-- Submenu -->
                          <q-menu anchor="top end" self="top start" auto-close>
                            <q-list>

                              <q-item class="row align-center items-center" v-for="n in $store.getters['data/getFolderContent'](
                                folder
                              )" :key="n" dense clickable>
                                <q-item-section>{{ n.name }}</q-item-section>
                                <q-item-section side top>
                                  <q-badge color="teal" label="10k" />
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-item>


                        <q-separator />


                        <q-item dense clickable v-for="category in getFolderlessCategories" :key="category">
                          <div v-if="category.isInFolder === false">
                            <q-item-section>{{ category.name }}</q-item-section>
                          </div>
                        </q-item>


                      </q-list>
                    </q-menu>
                  </q-btn>

                  <q-btn class="cardButton" :icon="defaultTemplateIcon" @click="setDefaultStatus" flat>
                    <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">Set as default
                      template
                    </q-tooltip>
                  </q-btn>
                  <q-btn class="cardButton" icon="bi-clipboard-plus" @click="pasteTemplate(currentTemplate.text)" flat>
                    <q-tooltip class="bg-secondary text-body2 text-black" :offset="[10, 10]" :delay="300">Paste template
                    </q-tooltip>
                  </q-btn>


                  <div>
                    <q-fab flat direction="right" padding="md">
                      <template v-slot:icon="{ opened }">
                        <q-icon :class="{
                          'example-fab-animate--hover': opened !== true,
                        }" name="bi-trash" size="20px" style="top: -1px" />
                      </template>

                      <q-fab-action style="left: -30px" class="fabButton" flat color="accent" @click="deleteTemplate"
                        icon="bi-check" />

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
                <q-icon class="q-px-sm" name="bi-bookmark-star" size="15px"></q-icon>
                Make default: Every new entry will start with this template.
              </div>
              <div class="q-pa-sm q-ml-md">
                <q-icon class="q-px-sm" name="bi-journal-plus" size="15px"></q-icon>
                Paste template.
              </div>
              <div class="q-pa-sm q-ml-md">
                <q-icon class="q-px-sm" name="bi-trash" size="15px"></q-icon>
                Delete template.
              </div>
            </div>
          </div>


        </div>

      </div>

    </template>
  </baseDialog>
</template>

<script>
import baseDialog from "../ui/BaseDialog2.vue";

export default {
  name: "dialogViewTemplates",
  emits: ["pasteTemplate", "deleteTemplate", "closeDialog"],
  components: {
    baseDialog,
  },
  props: { templateList: Array },
  data() {
    return {
      icon: true,
      menuIcon: "bi-file-earmark-font",
      isHelpShown: false,
      currentTemplate: this.templateList[0],
      maxNumberOfDisplayedChars: 1200,
      StyleTmplateTextScrollArea: {
        height: "270px",
      },
    };
  },
  watch: {
    // whenever the length of templates changes, this will reset the currentTemplate
    lengthOfTemplates(newLength) {
      this.currentTemplate = this.templateList[0];
    },
  },
  methods: {
    openSetCategoryMenu() {
      console.log("MEHEHE")
    },
    setDefaultStatus() {
      let payload = {
        id: this.currentTemplate.id,
        templateList: this.templateList,
      };
      this.$store.commit("data/setDefaultStatusOfTemplate", payload);
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
    pasteTemplateAndClose() {
      this.$emit("pasteTemplate", this.currentTemplate);
      this.closeDialog();
    },
  },
  computed: {

    getFolderlessCategories() {
      return this.$store.state.data.categoriesForDiary.filter(category => { return category.isInFolder === false });
    },
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
      return this.templateList.slice();
    },
    lengthOfTemplates() {
      return this.templateList.length;
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
.containerForHeaderOfTemplateViewer {
  background-color: var(--q-secondary);
}


.fixedHeight {
  height: 600px;
}

.templateTextContainer {
  min-height: 250px;
  max-height: 300px;
}



.cardButton {
  font-size: 11px;
}

.fabButton {
  font-size: 10px;
  font-size: 88px !important;
}
</style>
