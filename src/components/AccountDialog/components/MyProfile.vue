<template>
  <v-card>
    <v-toolbar dark color="primary" :card="$vuetify.breakpoint.lgAndUp">
      <v-toolbar-side-icon @click="$emit('close-dialog')"><v-icon>mdi-close</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Profilul Meu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon color="error" @click="$store.commit('userManagement/resetState')">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('close-dialog')"><v-icon>mdi-content-save</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout fill-height :column="!$vuetify.breakpoint.lgAndUp">
      <v-flex xs12 md4 my-3>
        <v-layout column align-space-between justify-center fill-height>
          <v-hover>
            <template #default="{ hover }">
              <v-flex shrink align-self-center>
                <label :for="uploadId">
                  <v-avatar size="200">
                    <v-img
                      src="https://source.unsplash.com/1000x1000/?landscape,nature"
                      lazy-src="https://source.unsplash.com/30x30/?landscape,nature"
                      alt="profile_picture"
                      style="border-radius: 100%; cursor: pointer;"
                      aspect-ratio="1"
                    >
                      <template #placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </template>
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-out-slow-in grey white--text align-center justify-center transparent"
                          style="height: 100%; width: 100%; opacity: .5; cursor: pointer; position: absolute; bottom: 0;"
                        >
                          <v-icon class="display-2">mdi-camera</v-icon>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-avatar>
                </label>
              </v-flex>
            </template>
          </v-hover>
          <v-flex shrink mt-3 align-self-center>
            <upload-btn
              title="Schimba Poza de Profil"
              large
              round
              :file-changed-callback="fileChanged"
              accept="image/*"
              :personalized-id="uploadId"
            >
              <template #icon-left>
                <v-icon left dark style="transform: rotate(-45deg)">mdi-attachment</v-icon>
              </template>
            </upload-btn>
          </v-flex>
          <v-flex v-if="file != null && file.name != null" shrink mx-1>
            <v-text-field solo readonly :value="file.name" hide-details append-icon="mdi-attachment"></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex shrink mx-1>
        <v-divider :vertical="$vuetify.breakpoint.lgAndUp" :style="{ borderTopWidth: hrBorderTopWidth }"></v-divider>
      </v-flex>
      <v-flex grow>
        <v-card tile height="100%" flat>
          <v-card-title>Setari</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import UploadBtn from "../../UploadButton";
export default {
  name: "MyProfile",
  components: {
    UploadBtn,
  },
  data() {
    return {
      file: null,
      uploadId: "profilePictureUpload",
    };
  },
  computed: {
    hrBorderTopWidth() {
      return this.$vuetify.breakpoint.mdAndDown ? "3px" : "0";
    },
  },
  methods: {
    fileChanged(file) {
      this.file = file;
    },
  },
};
</script>

<style scoped></style>
