<template>
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
</template>

<script>
import UploadBtn from "../../../../UploadButton";
export default {
  name: "ProfilePicture",
  components: {
    UploadBtn,
  },
  data() {
    return {
      file: null,
      uploadId: "profilePictureUpload",
    };
  },
  methods: {
    fileChanged(file) {
      this.file = file;
    },
  },
};
</script>

<style scoped></style>
