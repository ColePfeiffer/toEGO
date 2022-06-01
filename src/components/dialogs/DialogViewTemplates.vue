<template>
  <baseDialog
    v-model="isDialogVisible"
    @closeDialog="closeDialog"
    @save="pasteTemplate"
    :widthOfDialog="500"
  >
    <template v-slot:confirm-button> Paste </template>
    <template v-slot:close-button> Cancel </template>
    <template v-slot:dialogTitle>
      <q-icon :name="menuIcon" size="22px" />
      Template Viewer
    </template>
    <template v-slot:content>
      <!-- v-for list of templates, kommt später weg -->
      <div class="row">
        <div v-for="template in templates" :key="template.id">
          <q-card flat bordered class="templateCard bg-grey-1">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6">{{ template.name }}</div>
                </div>
              </div>
            </q-card-section>

            <q-card-section>
              <div v-if="template.text.length >= 350">
                <div v-html="template.text.substring(0, 350) + ' [...]'"></div>
              </div>
              <div v-else v-html="template.text"></div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn flat>Delete</q-btn>
              <q-btn @click="pasteTemplate(template.text)" flat>Paste</q-btn>
            </q-card-actions>
          </q-card>
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
    };
  },
  methods: {
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
</style>