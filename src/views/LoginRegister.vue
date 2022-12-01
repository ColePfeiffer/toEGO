<template>
  <div class="row justify-center items-center">
    <div class="col-10 q-pa-md"
      style="padding-top: 50px;">
      <q-chat-message bg-color="secondary"
        text-color="white"
        sent
        :text="['Welcome to TOEgo [v.1]! ♥ ♥ ♥', 'If you don\'t have an account yet, please click on register and create one.',]">
        <template v-slot:avatar>
          <q-avatar square
            class="q-mr-sm q-mt-sm q-pt-sm">
            <img src="/images/ghost-pink-hue.gif">
          </q-avatar>
        </template>
      </q-chat-message>
      <div style="font-weight:600; text-shadow: 2px 2px 1px var(--q-info);"
        class="text-white text-right">
        Friendly Ghost
      </div>
    </div>
    <BasePage class="col-11"
      titleOfPage="Login"
      mode="retro"
      :backgroundColor="$store.getters['layout/getHomeBackgroundColor']">
      <template v-slot:title-bar-icon>
        <div style="padding: 4px">
          <q-icon name="bi-eye"
            size="19px" />
        </div>
      </template>
      <template v-slot:titlebar>
        <q-tabs v-model="tabs"
          :style="getStyleForTabsNavigation"
          dense
          indicator-color="accent"
          align="justify"
          no-caps
          narrow-indicator>
          <q-tab name="login"
            label="Login" />
          <q-tab name="register"
            label="Register" />
        </q-tabs>
      </template>

      <template v-slot:content-without-scrollarea>
        <div class="q-pa-xs">
          <q-tab-panels v-model="tabs"
            :style="styleForTabPanels"
            animated>
            <q-tab-panel name="login">
              <div class="q-pa-md">
                <form @submit.prevent="submitFormForLogin"
                  :style="styleForForm">
                  <q-input v-model="loginEmail"
                    type="email"
                    ref="loginEmail"
                    filled
                    :rules="[
                      (val) => !!val || '* Required',
                    ]"
                    stack-label
                    label="E-Mail Address"
                    bottom-slots>
                    <template v-slot:before>
                      <q-icon name="bi-envelope" />
                    </template>
                  </q-input>
                  <q-input v-model="loginPassword"
                    ref="loginPassword"
                    type="password"
                    filled
                    :rules="[
                      (val) => !!val || '* Required',
                      (val) => val.length >= 6 || 'Please use at least 6 characters',
                    ]"
                    stack-label
                    label="Password"
                    bottom-slots>
                    <template v-slot:before>
                      <q-icon name="bi-key" />
                    </template>
                  </q-input>
                  <div class="row justify-end">
                    <q-btn v-if="isUserLoggedIn"
                      label="Logout"
                      @click="logout"
                      :style="styleForButton"
                      color="secondary"></q-btn>
                    <q-btn v-else
                      label="Login"
                      square
                      :style="styleForButton"
                      type="submit"
                      color="secondary"></q-btn>
                  </div>
                </form>
              </div>
            </q-tab-panel>

            <q-tab-panel name="register">
              <div class="q-pa-md">
                <form @submit.prevent="submitFormForRegister"
                  :style="styleForForm">
                  <q-input v-model="createEmail"
                    ref="createEmail"
                    type="email"
                    filled
                    :rules="[
                      (val) => !!val || '* Required',
                    ]"
                    stack-label
                    label="E-Mail Address"
                    bottom-slots>
                    <template v-slot:before>
                      <q-icon name="bi-envelope" />
                    </template>
                  </q-input>
                  <q-input v-model="createPassword"
                    ref="createPassword"
                    type="password"
                    filled
                    :rules="[
                      (val) => !!val || '* Required',
                      (val) => val.length >= 6 || 'Please use at least 6 characters',
                    ]"
                    stack-label
                    label="Password"
                    bottom-slots>
                    <template v-slot:before>
                      <q-icon name="bi-key" />
                    </template>
                  </q-input>
                  <div class="row justify-end">

                    <q-btn label="Register"
                      :style="styleForButton"
                      type="submit"
                      color="secondary"></q-btn>
                  </div>
                </form>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </template>

    </BasePage>

  </div>
</template>


<script>
import BasePage from "src/components/common/BasePage.vue";

export default {
  data() {
    return {
      tabs: "login",
      createEmail: null,
      createPassword: null,
      loginEmail: null,
      loginPassword: null,
    };
  },
  components: {
    BasePage
  },
  methods: {
    logout() {
      this.$store.dispatch(
        "auth/logoutUser");
    },
    submitFormForLogin() {
      let email = this.$refs.loginEmail;
      let password = this.$refs.loginPassword;
      if (this.submitForm(email, password)) {
        this.login();
      }
    },
    submitFormForRegister() {
      let email = this.$refs.createEmail;
      let password = this.$refs.createPassword;
      if (this.submitForm(email, password)) {
        this.register();
      }
    },
    submitForm(email, password) {
      if (!email.hasError && !password.hasError) {
        return true;
      } else {
        return false;
      }
    },
    register() {
      let payload = { "email": this.createEmail, "password": this.createPassword };
      this.$store.dispatch(
        "auth/registerUser",
        payload
      );
    },
    login() {
      let payload = { "email": this.loginEmail, "password": this.loginPassword };
      this.$store.dispatch(
        "auth/loginUser",
        payload
      );
    },
    goToEventSetToEditingMode() {
      this.$router.push("Event");
    },
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.auth.isUserLoggedIn;
    },
    isDarkModeActive() {
      return this.$store.state.data.userSettings.isDarkModeActive;
    },
    styleForTabPanels() {
      let style = {};
      if (this.isDarkModeActive) {
        style["background-color"] = this.$store.state.layout.blacksmoke;
      } else {
        style["background-color"] = "whitesmoke";
      }
      return style;
    },
    styleForButton() {
      let style = {};
      style["border-radius"] = "0px";
      style["text-shadow"] = this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity + " 1px 1px 1px";
      return style;
    },
    styleForForm() {
      let style = {};
      style["font-size"] = "12px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      return style;
    },
    getStyleForTabsNavigation() {
      let style = {};
      style["font-size"] = "12px";
      style["background-color"] = "transparent";
      style["color"] = "white";
      style["width"] = this.$store.state.layout.width * 0.9 + "px";
      style["font-family"] = this.$store.state.layout.nonDefaultFont;
      style["text-shadow"] = this.$store.getters['layout/getLowOpacityShadowForAccent2'];
      return style;
    },
    styleForScrollArea() {
      if (this.isDarkModeActive) {
        style["background-color"] = "var(--q-dark)";
      } else {
        style["background-color"] = "white";
      }
      return style;
    },
  },
};
</script>

<style scoped>

</style>
