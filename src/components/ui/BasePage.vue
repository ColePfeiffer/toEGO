<template>
  <q-page class="q-pa-sm">
    <div class="outerContainer row justify-center items-center q-pa-md q-pt-xl">
      <!-- Header / Titlebar-->
      <div class="title-bar col-md-11 col-12 row shadow-1"
        :style="$store.getters['layout/getStyleForTitleBar']">
        <div class="title-bar-text">
          <div class="q-pr-lg">
            <slot name="title-bar-icon"></slot>
            {{ titleOfPage }}
          </div>
        </div>
        <div class="title-bar-controls">
          <slot name="title-bar-controls"></slot>
        </div>
      </div>
      <!-- Content -->
      <div class="col-md-11 col-12 container q-mt-sm shadow-2"
        :style="$store.getters['layout/getStyleForBasePage']">
        <slot name="content"></slot>
      </div>
      <!-- Footer / Buttons -->
      <div class="col-md-11 col-12 q-mt-md">
        <div class="row justify-end items-center no-wrap">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "BasePage",
  props: {
    icon: String,
    titleOfPage: String,
  },
};
</script>

<style scoped src="98.css">

</style>

<style scoped>
.container {
  background-color: white;
  height: 600px;
}
</style>
