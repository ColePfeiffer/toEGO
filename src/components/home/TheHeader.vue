<template>
  <div class="q-px-md q-pt-md"
    :class="{ 'q-pb-md': !expanded, 'q-pb-xs': expanded}">
    <q-expansion-item v-model="expanded"
      dense
      icon="bi-eye-fill"
      size="12px"
      icon-size="xs"
      :label="getIntentionText"
      class="smallText q-pa-xs text-center text-white"
      :style="$store.state.data.sTextAccentShadow"
      expand-icon="bi-chevron-down"
      expanded-icon="bi-chevron-up"
      expand-icon-class="text-accent">
      <q-card class="my-card  shadow-3 q-pa-sm q-pb-md q-mt-md   "
        :style="getStyleForTransparentCard">
        <q-card-section>
          <div class="cursor-pointer smallText"
            :style="getStyleForText">
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
  name: "infoHeader",
  emits: ["save-changes", "toggle-dialogCashUp"],
  components: {},
  data() {
    return {
      //text: "Going outside and doing some cool stuff",
      text: "Be productive. Get the project done! Celebrate yourself.",
      expanded: false,
      transparentCardDark: {
        "background-color": "#000000a8",
        "text-shadow": "rgb(0 0 0) 2px 2px 2px",
        "color": "white !important"
      },
      transparentCard: {
        "background-color": "#ffffff80",
        "text-shadow": "2px 2px 3px rgba(255,255,255,0.1)",
        "color": "black !important"
      },
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
    saveChangesInProfilePage(roomie, changeData) {
      roomie.username = changeData.username;
      roomie.description = changeData.description;
      roomie.profilePicture = changeData.profilePicture;
      roomie.color = changeData.color;

      roomie.showProfilePage = false;
    },

    saveChanges() {
      this.$emit("save-changes", this.roomie, this.changeData);
    },

    toggleDialogCashUp() {
      this.$emit("toggle-dialogCashUp", true);
    },
  },
  computed: {
    getIntentionText() {
      if (this.expanded) {
        return ""
      } else {
        return this.$store.state.data.intentionText
      }

    },
    getStyleForTransparentCard() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.transparentCardDark;
      } else {
        return this.transparentCard;
      }
    },
    getStyleForText() {
      if (this.$store.getters["data/isDarkModeActive"]) {
        return this.$store.state.data.sTextBasicShadowDarkWhiteFont;
      } else {
        return this.$store.state.data.sTextBasicBlackFont;
      }
    },

  }
};
</script>

<style scoped>
.smallIcon {
  font-size: 5px !important;
}

.card-input {
  color: white;
  border-left: 1px solid black;
}

.statusElementIcon {
  width: 35px;
  height: 35px;
  padding: 2px;
}

.transparent-card {
  background-color: #ffffff80;
}

.statusElementText {
  width: 35px;
  height: 35px;
  padding: 10px;

  font-weight: bold;
  font-size: 85%;
}
</style>
