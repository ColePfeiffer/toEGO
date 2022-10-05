<template>
  <div class="q-px-md q-pt-md"
    :class="{ 'q-pb-md': !expanded, 'q-pb-xs': expanded}">
    <q-expansion-item v-model="expanded"
      dense
      icon="bi-eye-fill"
      size="12px"
      icon-size="xs"
      :label="getIntentionText"
      class="q-pa-xs text-center text-white"
      :style="{...{'font-size': '12.5px'}, ...$store.state.layout.sTextAccentShadow}"
      expand-icon="bi-chevron-down"
      expanded-icon="bi-chevron-up"
      expand-icon-class="text-accent">
      <q-card class="q-pa-sm q-pb-md q-mt-md   "
        :style="$store.getters['layout/getStyleForTransparentCard']">
        <q-card-section>
          <div class="cursor-pointer"
            :style="$store.getters['layout/getStyleForText']">
            {{ text }}
            <q-popup-edit v-model="text"
              auto-save
              v-slot="scope">
              <q-input type="textarea"
                v-model="scope.value"
                autofocus
                counter
                @keyup.enter="scope.set" />
            </q-popup-edit>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      text: "Be productive. Get the project done! Celebrate yourself.",
      expanded: false,
    };
  },
  methods: {
    getShortenedIntentionText() {
      if (this.text.length >= 25) {
        return this.text.substring(0, 25) + "...";
      } else {
        return this.text;
      }
    },
  },
  computed: {
    getIntentionText() {
      if (this.expanded) {
        return ""
      } else {
        return this.$store.state.data.intentionText
      }

    }
  }
};
</script>
