<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    :fullscreen="!this.$vuetify.breakpoint.mdAndUp"
    :transition="this.$vuetify.breakpoint.mdAndUp ? 'dialog-transition' : 'dialog-bottom-transition'"
    content-class="white"
  >
    <template #activator="{ on }">
      <v-btn class="orange-gradient" flat large v-on="on">
        <v-icon left>mdi-login-variant</v-icon>
        Login
      </v-btn>
    </template>
    <v-tabs
      v-model="activeTab"
      color="#F27121"
      dark
      slider-color="#E94057"
      grow
      icons-and-text
      style="background: white;"
    >
      <v-tab ripple class="wiretap-gradient-reversed">
        Login
        <v-icon>{{ tabIcon(0, "mdi-account") }}</v-icon>
      </v-tab>
      <v-btn
        @click="dialog = false"
        style="margin: auto"
        v-if="!this.$vuetify.breakpoint.mdAndUp"
        class="wiretap-gradient-halved"
        round
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
            <v-form v-model="validLogin">
              <v-text-field
                prepend-icon="mdi-account"
                name="loginId"
                label="Username/Email"
                type="text"
                color="orange"
                v-model="loginId"
                :rules="loginIdRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                color="red"
                v-model="loginPassword"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="wiretap-gradient-angled" @click="dialog = false" large>Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                label="Username"
                type="text"
                color="orange"
              ></v-text-field>
              <v-text-field prepend-icon="mdi-at" name="email" label="Email" type="text" color="#FF8C00"></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                color="red"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="passwordRepeat"
                label="Repeat Password"
                type="password"
                color="#8b0000"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="wiretap-gradient-angled" @click="dialog = false" large>Create Account </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</template>
<script>
export default {
  name: "AccountDialog",
  data() {
    return {
      activeTab: 0,
      dialog: false,
      validLogin: false,
      loginId: "",
      loginPassword: "",
      loginIdRules: [v => !!v || "Username/Email is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  methods: {
    tabIcon: function(tabNumber, baseIconName) {
      return tabNumber === this.activeTab ? baseIconName : baseIconName + "-outline";
    }
  }
};
</script>
