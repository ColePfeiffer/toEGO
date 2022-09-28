<template>
  <q-page class="q-pa-md">
    <!-- TESTING AREA -->
    <div>
      <q-btn
        color="secondary"
        label="TEST ME"
        @click="testme"
      ></q-btn>
      <div>

        <br />
        <h5>Quick-Menu Structure</h5>
        <q-btn
          :ripple="false"
          no-caps
          square
          color="secondary"
          text-color="black"
          label="Pick Template"
        >
          <q-menu
            fit
            class="no-border-radius"
            v-model="qMenuModel"
          >
            <FolderCategoryTemplateStructure
              :currentTemplate="$store.state.data.diaryTemplates[0]"
              :isShowingTemplates="false"
              :templateVariantIsSetToClickable="true"
              :isShowingClickableVariant="true"
              :templates="$store.state.data.diaryTemplates"
              :categories="$store.state.data.categoriesForDiary"
              :folders="$store.state.data.foldersForDiary"
            ></FolderCategoryTemplateStructure>
          </q-menu>
        </q-btn>

        <br />
        <br />
        <h6>BIEPBOP TEMPLATE PICKER</h6>
        <q-btn
          :ripple="false"
          no-caps
          square
          color="secondary"
          text-color="black"
          label="Pick Template"
        >
          <q-menu
            fit
            class="no-border-radius"
            v-model="qMenuModel2"
          >
            <FolderCategoryTemplateStructure
              :currentTemplate="$store.state.data.diaryTemplates[0]"
              :isShowingTemplates="true"
              :templateVariantIsSetToClickable="true"
              :isShowingClickableVariant="true"
              :templates="$store.state.data.diaryTemplates"
              :categories="$store.state.data.categoriesForDiary"
              :folders="$store.state.data.foldersForDiary"
            ></FolderCategoryTemplateStructure>
          </q-menu>
        </q-btn>

        <br />
        <TemplateItem
          :isShowingButtonSectionWithButtons="false"
          :template="$store.state.data.diaryTemplates[0]"
          :parent="$store.state.data.categoriesForDiary[0]"
          @click-item="testme"
        >
        </TemplateItem>

        <CategoryItem
          :isShowingClickableVariant="true"
          :isShowingTemplates="false"
          :templateVariantIsSetToClickable="false"
          :category="$store.state.data.categoriesForDiary[1]"
          :templates="$store.state.data.diaryTemplates"
          :parent="$store.state.data.foldersForDiary[0]"
          @click-item="testme"
        >
        </CategoryItem>

        <FolderItem
          :isShowingTemplates="true"
          :templateVariantIsSetToClickable="false"
          :folder="$store.state.data.foldersForDiary[0]"
          :templates="$store.state.data.diaryTemplates"
          :categories="$store.state.data.categoriesForDiary"
          @click-item="testme"
        >

        </FolderItem>

      </div>


    </div>

    <div>SETTINGS</div>

    <div>
      <q-option-group
        v-model="group"
        :options="options"
        color="accent"
        type="toggle"
      >
        <template v-slot:label="isDarkModeOn">
          <div class="row items-center">
            <span>{{ isDarkModeOn.label }}</span>
            <q-icon
              :name="isDarkModeOn.icon"
              size="1.5em"
              class="q-ml-sm"
            />
          </div>
        </template>
      </q-option-group>
      <q-list
        padding
        class="menu-list"
      >
        <q-item
          clickable
          v-ripple
          @click="setDarkMode()"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-moon" />
          </q-item-section>

          <q-item-section>Dark-Mode</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="toggleExpandButtonForEventsOnDiaryPage()"
        >
          <q-item-section avatar>
            <q-icon name="drafts" />
          </q-item-section>
          <q-item-section>Show expand button for events on Diary Page?</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapMutations } from "vuex";
import FolderItem from "src/components/common/DialogTemplateViewer/FolderItem.vue";
import TemplateItem from "src/components/common/DialogTemplateViewer/TemplateItem.vue";
import CategoryItem from "src/components/common/DialogTemplateViewer/CategoryItem.vue";
import FolderCategoryTemplateStructure from "src/components/common/DialogTemplateViewer/FolderCategoryTemplateStructure.vue";

export default {
  components: { TemplateItem, CategoryItem, FolderItem, FolderCategoryTemplateStructure },
  data() {
    return {
      qMenuModel: false, // remove later
      qMenuModel2: false,
      group: [],
      options: [
        {
          label: "Dark-Mode",
          value: "isDarkModeOn",
          icon: "bi-moon",
        },
        {
          label: "Show expand button for events on Diary Page",
          value: "op2",
          icon: "bi-chevron-expand",
        },
        {
          label: "Option 3",
          value: "op3",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["./store/data/showModal", "store/data/showModal"]),
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    toggleExpandButtonForEventsOnDiaryPage() {
      this.$store.commit("data/toggleExpandButtonForEventsOnDiaryPage");
    },
    testme() {
      //this.$store.dispatch("data/deleteTemplate");
    },
  },
};
</script>
