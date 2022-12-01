<template>
  <BasePage titleOfPage="Login"
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
    BasePage,
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
      console.log("register");
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
