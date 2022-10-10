<template>
  <q-page class="q-pa-sm">
    <div class="row justify-center items-center q-pa-md q-pt-lg">
      <!-- Header / Titlebar-->
      <div class="title-bar col-md-11 col-12 row shadow-1"
        :style="$store.getters['layout/getStyleForTitleBar'](mode)">
        <div class="title-bar-text"
          :style="getMargin">
          <div class="q-pr-lg row justify-between items-center no-wrap"
            :style="getPadding">
            <slot name="title-bar-icon"
              class="q-pl-xl"></slot>
            <div class="q-pl-sm">
              {{ titleOfPage }}
            </div>
          </div>
        </div>
        <div class="title-bar-controls"
          :style="getMargin">
          <slot name="title-bar-controls"></slot>
        </div>
      </div>

      <!-- Content -->
      <div class="col-md-11 col-12 q-mt-sm shadow-2"
        :style="$store.getters['layout/getStyleForBasePage']({'mode': mode, 'backgroundColor': backgroundColor})">

        <div style="height: 70vh">
          <q-resize-observer @resize="onResize" />
          <q-scroll-area :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="getStyleForScrollArea">
            <slot name="content"></slot>
          </q-scroll-area>
        </div>

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
    mode: {
      type: String,
      default: "solid",
    }, backgroundColor: {
      type: String,
      default: "#ffffff54",
    },
  },
  data() {
    return {
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'var(--q-secondary)',
        width: '8px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: "var(--q-info)",
        width: '11px',
        opacity: 0.2
      }
    }
  },
  methods: {
    onResize(size) {
      if (size.height != 0) {
        this.$store.commit("layout/setInnerSize", size);
      }
    },
  },
  computed: {
    getStyleForScrollArea() {
      let style = {};
      style["height"] = this.$store.state.layout.innerHeight * .97 + "px";
      if (this.mode === 'retro') {
        style["margin-top"] = "6px";
      } else {
        style["margin-top"] = "0px";
      }
      return style;
    },
    getMargin() {
      let style = {};
      if (this.mode === 'retro') {
        style["margin-top"] = "4px";
      } else {
        style["margin-top"] = "0px";
      }
      return style;
    },
    getPadding() {
      if (this.mode === 'retro') {
        return {
          "padding-left": "7px",
          "padding-right": "5px",
          "margin-right": "5px"
        }
      } else {
        return {
          "padding-left": "2px",
          "padding-right": "5px",
          "margin-right": "5px",
        }
      }
    }

  }
};
</script>

<style scoped src="98.css">

</style>
