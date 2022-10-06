<template>
  <div>
    <q-card class="q-px-sm q-pb-none q-mt-lg noBorderRadius"
      :style="$store.getters['layout/getStyleForTransparentCard']">
      <q-card-section class="cardSection">
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
        <div class="tape tape-1"
          :style="{ 'background': $store.state.layout.accent+'59'}"></div>
      </q-card-section>
    </q-card>
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
};
</script>

<style scoped>
.noBorderRadius {
  border-radius: 0px;
}

.tape {
  position: absolute;
  top: -12px;
  left: 26%;
  height: 25px;
  width: 128px;
  transform: rotate(1deg);
}
</style>
