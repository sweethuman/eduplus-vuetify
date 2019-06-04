<template>
  <v-dialog v-model="dialog" width="900" lazy :fullscreen="$vuetify.breakpoint.smAndDown" :disabled="completed">
    <template #activator="{ on }">
      <span
        class="font-weight-bold default-transition default"
        :class="[spanClass, { 'shake-animation': shake }]"
        v-on="on"
        @animationend="shake = false"
      >
        {{ visibleText }}
        <v-icon style="font-size: inherit; color: inherit; transition: none">{{ textIcon }}</v-icon>
      </span>
    </template>

    <v-card style="height: 100%">
      <v-layout column fill-height>
        <v-flex shrink>
          <v-card-title
            class="display-1 grey justify-center"
            :class="[isDark ? 'darken-2' : 'lighten-2']"
            primary-title
          >
            <span
              class="font-weight-bold default-transition"
              :class="[spanClass, { 'shake-animation': shake }]"
              @animationend="shake = false"
            >
              {{ visibleText }}
            </span>
          </v-card-title>
        </v-flex>

        <v-flex grow>
          <v-layout align-center justify-center fill-height>
            <v-flex grow>
              <v-card-text>
                <v-layout v-if="dialog" wrap>
                  <v-flex
                    v-for="(option, index) in selectionOptions"
                    :key="index"
                    :xs6="selectionOptions.length !== 1 && $vuetify.breakpoint.mdAndUp"
                    :xs12="selectionOptions.length === 1 || $vuetify.breakpoint.smAndDown"
                    px-2
                  >
                    <v-btn
                      large
                      :class="[index % 2 === 0 ? 'soundcloud-gradient' : 'soundcloud-gradient-reversed']"
                      dark
                      depressed
                      block
                      @click="selected = option"
                    >
                      <span class="text-truncate">
                        {{ option }}
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { replaceAt } from "../jsUtilities/stringUtilities";
import { isDarkThemeOn } from "../mixins/utilitiesMixins";

export default {
  name: "FillWord",
  mixins: [isDarkThemeOn],
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      items: [{ title: "Click Me" }, { title: "Click Me" }, { title: "Click Me" }, { title: "Click Me 2" }],
      dialog: false,
      selected: null,
      shake: false,
      visibleText: "",
    };
  },
  computed: {
    selectionOptions() {
      return this.$store.getters["fillWord/getOptions"](this.text);
    },
    spanClass() {
      if (this.selected == null) return "";
      return this.selected === this.text ? "correct" : "wrong";
    },
    textIcon() {
      if (this.selected == null) return "mdi-play-circle-outline";
      if (this.selected !== this.text) return "mdi-close-circle-outline";
      return "";
    },
    completed() {
      return this.selected === this.text;
    },
  },
  watch: {
    selected(newValue) {
      this.shake = newValue !== this.text;
      this.visibleText = this.selected;
      if (newValue === this.text) {
        this.$store.commit("fillWord/removeWord", this.text);
        this.dialog = false;
      }
    },
  },
  created() {
    this.$store.commit("fillWord/addWord", this.text);
    if (this.text.length > 2) {
      let splitText = this.text.split(" ");
      let newText = "";
      for (let i = 0; i < splitText.length; i++) {
        newText += this.replaceCharsWithUnderscore(splitText[i]);
        newText += " ";
      }
      newText = replaceAt(newText, 0, this.text[0]);
      newText = replaceAt(newText, this.text.length - 1, this.text[this.text.length - 1]);
      newText = newText.substr(0, newText.length - 1);
      this.visibleText = newText;
    } else this.visibleText = "__";
  },
  beforeDestroy() {
    this.$store.commit("fillWord/removeWord", this.text);
  },
  methods: {
    replaceCharsWithUnderscore(word) {
      let wordLength = word.length;
      let underscore = "";
      for (let i = 0; i < wordLength; i++) {
        underscore += "_";
      }
      return underscore;
    },
  },
};
</script>

<style scoped lang="scss">
.default {
  cursor: pointer;
  user-select: none;
  &:hover {
    margin: 2px 2px -2px -2px;
    text-shadow: 5px 2px 5px rgba(0, 0, 0, 0.6);
  }
}
.correct {
  color: #4caf50;
}

.wrong {
  color: #ff5252;
}

.shake-animation {
  animation: shake 1s cubic-bezier(0.25, 0.8, 0.5, 1);
}

@keyframes shake {
  59% {
    margin-left: 0;
    margin-right: 0;
  }
  60%,
  80% {
    margin-left: 6px;
    margin-right: -6px;
  }
  70%,
  90% {
    margin-left: -6px;
    margin-right: 6px;
  }
}
</style>
