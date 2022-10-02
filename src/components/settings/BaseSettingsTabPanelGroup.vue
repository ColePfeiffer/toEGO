<template>
  <div>
    <div class="q-px-md promptTitle underlined">{{title}}</div>
    <div class="q-mb-xl">
      <div class="smallText borderStyleForTab q-mt-md">
        <q-list class="q-tb-md">
          <slot name="q-item-section-content">
          </slot>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSettingsTabPanelGroup",
  props: {
    title: String,
  },
  data() {
    return {
    };
  },
  methods: {

  },
  computed: {

  },
};
</script>

<style scoped>
.borderStyleForTab {
  font-size: 12.5px;
  background: whitesmoke;
  border-radius: 0px;
}

.underlined {
  border-bottom: 1px solid lightgrey;
  padding: 0 0 4px;
}

.promptTitle {
  font-size: 12.px;
  color: lightgrey;
}
</style>
