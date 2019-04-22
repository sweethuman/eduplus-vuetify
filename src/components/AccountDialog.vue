<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    :fullscreen="!this.$vuetify.breakpoint.mdAndUp"
    :transition="this.$vuetify.breakpoint.mdAndUp ? 'dialog-transition' : 'dialog-bottom-transition'"
  >
    <template #activator="{ on }">
      <v-btn class="orange-gradient" flat large v-on="on">
        <v-icon left>mdi-login-variant</v-icon>
        Login
      </v-btn>
    </template>
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
          @click="dialog = false"
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
                  v-model="loginId"
                  prepend-icon="mdi-account"
                  name="loginId"
                  label="Username sau Email"
                  type="text"
                  color="orange"
                  :error-messages="loginIdErrors"
                  @blur="$v.loginId.$touch"
                ></v-text-field>
                <v-text-field
                  v-model="loginPassword"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Parola"
                  type="password"
                  color="red"
                  :error-messages="loginPasswordErrors"
                  @blur="$v.loginPassword.$touch"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="wiretap-gradient-angled" large @click="dialog = false">Login </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-form ref="form">
                <v-text-field
                  v-model="registerUsername"
                  prepend-icon="mdi-account"
                  name="registerUsername"
                  label="Username"
                  type="text"
                  color="orange"
                  :error-messages="registerUsernameErrors"
                  hint="Lungime minima de 5 caractere"
                  @blur="$v.registerUsername.$touch"
                ></v-text-field>
                <v-text-field
                  v-model="registerEmail"
                  prepend-icon="mdi-at"
                  name="registerEmail"
                  label="Email"
                  type="text"
                  color="#FF8C00"
                  :error-messages="registerEmailErrors"
                  @blur="$v.registerEmail.$touch"
                ></v-text-field>
                <v-text-field
                  v-model="registerPassword"
                  prepend-icon="mdi-lock"
                  name="registerPassword"
                  label="Parola"
                  type="password"
                  color="#ff4500"
                  :error-messages="registerPasswordErrors"
                  hint="Parola trebuie sa aiba minim 8 caractere"
                  @blur="$v.registerPassword.$touch"
                ></v-text-field>
                <v-text-field
                  v-model="registerPasswordRepeat"
                  prepend-icon="mdi-lock"
                  name="registerPasswordRepeat"
                  label="Repeta Parola"
                  type="password"
                  color="#ff4500"
                  :error-messages="registerPasswordRepeatErrors"
                  @blur="$v.registerPasswordRepeat.$touch"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="wiretap-gradient-angled" large @click="dialog = false">Creeaza Cont </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>
<script>
import { required, minLength, email, alphaNum, sameAs, or, and } from "vuelidate/lib/validators";

export default {
  name: "AccountDialog",
  validations: {
    loginId: { required, emailOrUsername: or(email, and(minLength(5), alphaNum)) },
    loginPassword: { required, minLength: minLength(8) },
    registerUsername: { required, minLength: minLength(5), alphaNum },
    registerEmail: { required, email },
    registerPassword: { required, minLength: minLength(8) },
    registerPasswordRepeat: { required, sameAsRegisterPassword: sameAs("registerPassword") },
  },
  data() {
    return {
      activeTab: 0,
      dialog: false,
      loginId: "",
      loginPassword: "",
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPasswordRepeat: "",
    };
  },
  computed: {
    loginIdErrors() {
      const errors = [];
      if (!this.$v.loginId.$dirty) return errors;
      !this.$v.loginId.required && errors.push("Username sau Email este necesar");
      !this.$v.loginId.emailOrUsername && errors.push("Username sau Email invalid");
      return errors;
    },
    loginPasswordErrors() {
      const errors = [];
      if (!this.$v.loginPassword.$dirty) return errors;
      !this.$v.loginPassword.required && errors.push("Parola este necesara");
      !this.$v.loginPassword.minLength && errors.push("Lungimea minima este de 8 caractere");
      return errors;
    },
    registerUsernameErrors() {
      const errors = [];
      !this.$v.registerUsername.alphaNum && errors.push("Trebuie sa fie doar cifre si/sau numere");
      if (!this.$v.registerUsername.$dirty) return errors;
      !this.$v.registerUsername.minLength && errors.push("Trebuie sa aiba minim 5 caractere");
      !this.$v.registerUsername.required && errors.push("Numele contului este necesar");
      return errors;
    },
    registerEmailErrors() {
      const errors = [];
      if (!this.$v.registerEmail.$dirty) return errors;
      !this.$v.registerEmail.email && errors.push("Trebuie sa fie un Email Valid");
      !this.$v.registerEmail.required && errors.push("Emailul este necesar");
      return errors;
    },
    registerPasswordErrors() {
      const errors = [];
      if (!this.$v.registerPassword.$dirty) return errors;
      !this.$v.registerPassword.required && errors.push("Parola este necesara");
      !this.$v.registerPassword.minLength && errors.push("Trebuie sa aiba minim 8 caractere");
      return errors;
    },
    registerPasswordRepeatErrors() {
      const errors = [];
      if (!this.$v.registerPasswordRepeat.$dirty) return errors;
      !this.$v.registerPasswordRepeat.sameAsRegisterPassword &&
        errors.push("Trebuie sa fie identica cu parola originala!");
      !this.$v.registerPasswordRepeat.required && errors.push("Repetarea Parolei este necesara");
      return errors;
    },
  },
  methods: {
    tabIcon: function(tabNumber, baseIconName) {
      return tabNumber === this.activeTab ? baseIconName : baseIconName + "-outline";
    },
  },
};
</script>
