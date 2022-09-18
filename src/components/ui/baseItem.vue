<template>
  <!-- TODO q item functions... -->
  <q-item dense clickable @click="manageCategoryForTemplate(item)" :style="getTextColorForCategory(item)">
    <!-- ICON -->
    <q-item-section avatar>
      <q-icon color="secondary" size="xs" name="icon" />
    </q-item-section>
    <!-- NAME -->
    <q-item-section :style="getColorForLabel">{{ item.name }}</q-item-section>

    <!-- is showing templates -->
    <q-item-section v-if="isShowingTemplates" side top>
      <q-btn dense round flat :icon="expandIcon">
      </q-btn>
    </q-item-section>
    <q-menu v-if="isShowingTemplates" fit dense separate-close-popup class="no-border-radius" v-model="qMenuModel">
      <q-list dense>


        <!-- Templates inside Category -->
        <q-item style="max-width: 350px" v-for="template in $store.getters['data/getTemplatesFromCategory'](
          category,
          templates
        )" :key="template" dense v-close-popup="2" clickable @click="templateClicked(template)">
          <TemplateItem :template="template"> </TemplateItem>
        </q-item>
      </q-list>
    </q-menu>

    <!-- isn't showing templates -->
    <q-item-section v-else avatar>
      <q-btn dense :color="color" round flat :icon="isTemplateIDInCategory">
      </q-btn>
    </q-item-section>
  </q-item>
  <q-btn class="baseButton" @click="onClick" :style="buttonStyling">
    <slot name="confirm-button"> {{ text }} </slot>
  </q-btn>
</template>

<script>
export default {
  name: "baseDialog",
  emits: ["onClick"],
  data() {
    return {
      icon: "bi-collection",

      buttonID: 0,
      btnClicked: false,
      btnClickedStyle: {
        "background-color": "var(--q-primary)",
        color: "white",
        height: "33px",
        "border-style": "unset",
        border: "1px solid black",
        "box-shadow": "none",
      },
    };
  },
  props: {
    text: String,
    changeColor: Boolean,
    setStyleTo: Object,
  },
  methods: {
    onClick() {
      this.$store.commit("data/changeButtonColorOnClick", this.buttonID);
      this.$emit("onClick");
    },
  },
  mounted() {
    this.buttonID = uid();
  },
  computed: {
    // a computed getter
    buttonStyling() {
      if (this.$store.state.data.lastButtonClicked === this.buttonID) {
        return this.btnClickedStyle;
      } else {
        return this.setStyleTo;
      }
    },
  },
};
</script>
