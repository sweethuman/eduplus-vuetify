<template>
  <v-card>
    <v-tabs v-model="activeTab" color="#F27121" dark slider-color="#E94057" grow icons-and-text>
      <v-tab ripple class="wiretap-gradient-reversed">
        Login
        <v-icon>{{ tabIcon(0, "mdi-account") }}</v-icon>
      </v-tab>
      <v-btn
        v-if="!this.$vuetify.breakpoint.mdAndUp"
        style="margin: auto"
        class="wiretap-gradient-halved"
        round
        @click="$emit('close-dialog')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-tab ripple class="wiretap-gradient">
        Register
        <v-icon>{{ tabIcon(1, "mdi-account-plus") }}</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="loginForm.loginId"
                prepend-icon="mdi-account"
                name="loginId"
                label="Username sau Email"
                type="text"
                color="orange"
                :error-messages="loginIdErrors"
                @blur="$v.loginForm.loginId.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="loginForm.loginPassword"
                prepend-icon="mdi-lock"
                name="password"
                label="Parola"
                type="password"
                color="red"
                :error-messages="loginPasswordErrors"
                @blur="$v.loginForm.loginPassword.$touch"
                @keyup.enter="callFuncAfterInputEvent($event, submitLogin)"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="wiretap-gradient-angled" large @click="submitLogin">Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <form ref="form">
              <v-text-field
                v-model="registerForm.registerUsername"
                prepend-icon="mdi-account"
                name="registerUsername"
                label="Username"
                type="text"
                color="orange"
                :error-messages="registerUsernameErrors"
                hint="Lungime minima de 5 caractere"
                @blur="$v.registerForm.registerUsername.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerEmail"
                prepend-icon="mdi-at"
                name="registerEmail"
                label="Email"
                type="text"
                color="#FF8C00"
                :error-messages="registerEmailErrors"
                @blur="$v.registerForm.registerEmail.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerPassword"
                prepend-icon="mdi-lock"
                name="registerPassword"
                label="Parola"
                type="password"
                color="#ff4500"
                :error-messages="registerPasswordErrors"
                hint="Parola trebuie sa aiba minim 8 caractere"
                @blur="$v.registerForm.registerPassword.$touch"
                @keyup.enter="focusNextInputOnEvent"
              ></v-text-field>
              <v-text-field
                v-model="registerForm.registerPasswordRepeat"
                prepend-icon="mdi-lock"
                name="registerPasswordRepeat"
                label="Repeta Parola"
                type="password"
                color="#ff4500"
                :error-messages="registerPasswordRepeatErrors"
                @blur="$v.registerForm.registerPasswordRepeat.$touch"
                @keyup.enter="callFuncAfterInputEvent($event, submitRegister)"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="wiretap-gradient-angled" large @click="submitRegister">Creeaza Cont </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-alert
      v-model="alert.show"
      :type="alert.type"
      transition="scale-transition"
      dismissible
      mode="in-out"
      style="margin-bottom: 0; margin-top: 4px"
    >
      {{ alert.message }}</v-alert
    >
  </v-card>
</template>

<script>
import { required, minLength, email, alphaNum, sameAs, or, and, helpers } from "vuelidate/lib/validators";
import { formUtilitiesMixin } from "../../../mixins/formUtilitiesMixin";

function usernameNotExist(value) {
  return !helpers.req(value) || !this.$store.getters["userDatabase/checkIfUsernameExists"](value);
}

function emailNotExist(value) {
  return !helpers.req(value) || !this.$store.getters["userDatabase/checkIfEmailExists"](value);
}

export default {
  name: "LogIn",
  mixins: [formUtilitiesMixin],
  validations: {
    loginForm: {
      loginId: { required, emailOrUsername: or(email, and(minLength(5), alphaNum)) },
      loginPassword: { required, minLength: minLength(8) },
    },
    registerForm: {
      registerUsername: { required, minLength: minLength(5), alphaNum, usernameNotExist },
      registerEmail: { required, email, emailNotExist },
      registerPassword: { required, minLength: minLength(8) },
      registerPasswordRepeat: { required, sameAsRegisterPassword: sameAs("registerPassword") },
    },
  },
  data() {
    return {
      activeTab: 0,
      loginForm: {
        loginId: "",
        loginPassword: "",
      },
      registerForm: {
        registerUsername: "",
        registerEmail: "",
        registerPassword: "",
        registerPasswordRepeat: "",
      },
      alert: {
        show: false,
        type: "error",
        message: "GENERIC ERROR",
      },
    };
  },
  computed: {
    loginIdErrors() {
      const errors = [];
      if (!this.$v.loginForm.loginId.$dirty) return errors;
      !this.$v.loginForm.loginId.required && errors.push("Username sau Email este necesar");
      !this.$v.loginForm.loginId.emailOrUsername && errors.push("Username sau Email invalid");
      return errors;
    },
    loginPasswordErrors() {
      const errors = [];
      if (!this.$v.loginForm.loginPassword.$dirty) return errors;
      !this.$v.loginForm.loginPassword.required && errors.push("Parola este necesara");
      !this.$v.loginForm.loginPassword.minLength && errors.push("Lungimea minima este de 8 caractere");
      return errors;
    },
    registerUsernameErrors() {
      const errors = [];
      !this.$v.registerForm.registerUsername.alphaNum && errors.push("Trebuie sa fie doar cifre si/sau numere");
      !this.$v.registerForm.registerUsername.usernameNotExist && errors.push("Username deja prezent");
      if (!this.$v.registerForm.registerUsername.$dirty) return errors;
      !this.$v.registerForm.registerUsername.minLength && errors.push("Trebuie sa aiba minim 5 caractere");
      !this.$v.registerForm.registerUsername.required && errors.push("Numele contului este necesar");
      return errors;
    },
    registerEmailErrors() {
      const errors = [];
      !this.$v.registerForm.registerEmail.emailNotExist && errors.push("Email deja prezent");
      if (!this.$v.registerForm.registerEmail.$dirty) return errors;
      !this.$v.registerForm.registerEmail.email && errors.push("Trebuie sa fie un Email Valid");
      !this.$v.registerForm.registerEmail.required && errors.push("Emailul este necesar");
      return errors;
    },
    registerPasswordErrors() {
      const errors = [];
      if (!this.$v.registerForm.registerPassword.$dirty) return errors;
      !this.$v.registerForm.registerPassword.required && errors.push("Parola este necesara");
      !this.$v.registerForm.registerPassword.minLength && errors.push("Trebuie sa aiba minim 8 caractere");
      return errors;
    },
    registerPasswordRepeatErrors() {
      const errors = [];
      if (!this.$v.registerForm.registerPasswordRepeat.$dirty) return errors;
      !this.$v.registerForm.registerPasswordRepeat.sameAsRegisterPassword &&
        errors.push("Trebuie sa fie identica cu parola originala!");
      !this.$v.registerForm.registerPasswordRepeat.required && errors.push("Repetarea Parolei este necesara");
      return errors;
    },
  },
  methods: {
    tabIcon: function(tabNumber, baseIconName) {
      return tabNumber === this.activeTab ? baseIconName : baseIconName + "-outline";
    },
    async submitLogin() {
      this.$v.loginForm.$touch();
      if (this.$v.loginForm.$invalid) {
        this.displayError("Sunt greseli in formularul de Login");
        return;
      }
      try {
        await this.$store.dispatch("userManagement/logIn", {
          loginId: this.loginForm.loginId,
          password: this.loginForm.loginPassword,
        });
        this.hideError();
        this.clearFields(this.loginForm);
        this.$emit("close-dialog");
        this.$v.loginForm.$reset();
      } catch (e) {
        this.displayError(e.message);
      }
    },
    submitRegister() {
      this.$v.registerForm.$touch();
      if (this.$v.registerForm.$invalid) {
        this.displayError("Sunt greseli in formularul de Inregistrare");
        return;
      }
      const newUser = {};
      newUser.username = this.registerForm.registerUsername;
      newUser.email = this.registerForm.registerEmail;
      newUser.password = this.registerForm.registerPassword;
      this.$store.commit("userDatabase/addUser", newUser);
      this.hideError();
      this.clearFields(this.registerForm);
      this.$emit("close-dialog");
      this.$v.registerForm.$reset();
    },
    clearFields(object) {
      this._.forEach(object, (value, key) => {
        object[key] = "";
      });
    },
    displayError(message) {
      this.alert.message = message;
      this.alert.type = "error";
      this.alert.show = true;
    },
    hideError() {
      this.alert.show = false;
    },
  },
};
</script>

<style scoped></style>
