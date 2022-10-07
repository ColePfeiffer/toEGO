<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center items-center q-pa-md q-pt-xl">
      <!-- Header / Titlebar-->
      <div class="title-bar col-md-11 col-12 row shadow-1"
        :style="$store.getters['layout/getStyleForTitleBar'](isTransparent)">

        <div class="title-bar-text "
          :class="{ 'marginForTitleBarElements': isTransparent }">
          <div class="q-pr-lg row justify-between items-center no-wrap"
            :class="{ 'iconBiggerPadding': isTransparent, 'iconDefaultPadding': !isTransparent  }">
            <slot name="title-bar-icon"
              class="q-pl-xl"></slot>
            <div class="q-pl-sm">
              {{ titleOfPage }}
            </div>
          </div>
        </div>
        <div class="title-bar-controls"
          :class="{ 'marginForTitleBarElements': isTransparent }">
          <slot name="title-bar-controls"></slot>
        </div>
      </div>
      <!-- Content -->
      <div class="col-md-11 col-12 q-mt-sm shadow-2"
        :style="$store.getters['layout/getStyleForBasePage'](isTransparent)">
        <q-scroll-area :thumb-style="thumbStyle"
          :bar-style="barStyle"
          :style="getStyleForScrollArea">
          <slot name="content"></slot>
        </q-scroll-area>
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
    titleOfPage: String,
    isTransparent: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'var(--q-secondary)',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: 'var(--q-secondary)',
        width: '9px',
        opacity: 0.2
      }
    }
  },
  computed: {
    getStyleForScrollArea() {
      let style = {};
      if (this.isTransparent) {
        style["height"] = "592px";
        style["margin-top"] = "6px";
      } else {
        style["height"] = "595px";
        style["margin-top"] = "0px";
      }
      return style;
    }
  }
};
</script>

<style scoped src="98.css">

</style>

<style scoped>
.marginForTitleBarElements {
  margin-top: 4px;
}

.iconBiggerPadding {
  padding-left: 7px;
  padding-right: 5px;
  margin-right: 5px;
}

.iconDefaultPadding {
  padding-left: 2px;
  padding-right: 5px;
  margin-right: 5px;
}
</style>
