<template>
  <v-dialog v-model="updateDialog" width="500" persistent>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <v-icon left large color="red">mdi-alert-decagram</v-icon>
        Versiune Noua
      </v-card-title>

      <v-card-text>
        Exista o noua versiune a aplicatiei. Vrei sa o incarci?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" flat @click="refreshApp">
          <v-icon left>mdi-progress-download</v-icon>
          Incarca
        </v-btn>
        <v-btn color="orange" flat @click="updateDialog = false">
          <v-icon left>mdi-clock</v-icon>
          Mai tarziu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewUpdateDialog",
  data() {
    return {
      updateDialog: true,
      refreshing: false,
      registration: null,
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });

    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateDialog = true;
    },
    refreshApp() {
      this.updateDialog = false;

      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
  },
};
</script>

<style scoped></style>
