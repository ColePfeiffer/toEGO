<template>
  <div>
    <BaseCardWithTape :tapeColor="$store.state.layout.accent">
      <template v-slot:content>
        <p class="cursor-pointer q-pa-xs q-mb-none text-center"
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
        </p>
      </template>
    </BaseCardWithTape>

  </div>

</template>

<script>
import BaseCardWithTape from '../ui/BaseCardWithTape.vue';
export default {
  name: "TheHeader",
  data() {
    return {
      text: "Be productive. Get the project done! Celebrate yourself.",
      expanded: false,
    };
  },
  components: { BaseCardWithTape }
};
</script>
