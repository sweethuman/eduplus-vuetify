<template>
  <v-container fluid>
    <faq-section></faq-section>
    <v-expansion-panel
      v-if="!$vuetify.breakpoint.mdAndUp"
      v-model="expansionPanel"
      class="elevation-12 mb-4"
      style="position: -webkit-sticky; position: sticky; top: 0; z-index: 1"
    >
      <v-expansion-panel-content ripple>
        <template #header>
          <div class="py-1">Cuprins</div>
        </template>
        <v-list style="padding: 0; overflow: hidden">
          <template v-for="(item, i) in homeCards.items">
            <v-list-tile
              :key="item.title"
              v-scroll="onScroll"
              :value="activeElement === i"
              ripple
              class="active-border-default"
              active-class="primary--text active-border"
              @click.stop.prevent="
                $vuetify.goTo(`#${item.title.toLowerCase().replace(/\s/g, '')}`, {
                  duration: 1000,
                  easing: 'easeInOutQuad',
                  offset: 6,
                })
              "
            >
              <v-list-tile-action>
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="i !== homeCards.items.length" :key="i"></v-divider>
          </template>
          <v-list-tile ripple @click="expansionPanel = null">
            <v-list-tile-action>
              <v-icon color="red">mdi-close-circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Inchide Cuprinsul</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-layout justify-center>
      <v-flex v-if="$vuetify.breakpoint.mdAndUp" shrink class="mr-4">
        <v-card class="d-inline-block elevation-12" style="position: -webkit-sticky; position: sticky; top: 70px;">
          <v-navigation-drawer floating permanent stateless value="true">
            <v-list style="padding: 0">
              <template v-for="(item, i) in homeCards.items">
                <v-list-tile
                  :key="item.title"
                  v-scroll="onScroll"
                  :value="activeElement === i"
                  ripple
                  class="active-border-default"
                  active-class="primary--text active-border"
                  @click.stop.prevent="
                    $vuetify.goTo(`#${item.title.toLowerCase().replace(/\s/g, '')}`, {
                      duration: 1000,
                      easing: 'easeInOutQuad',
                      offset: 6,
                    })
                  "
                >
                  <v-list-tile-action>
                    <v-icon>mdi-{{ item.icon }}</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="i !== homeCards.items.length - 1" :key="i"></v-divider>
              </template>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card
          v-for="(item, i) in homeCards.items"
          :id="item.title.toLowerCase().replace(/\s/g, '')"
          :key="i"
          ref="cards"
          class="mb-4"
        >
          <v-card-title class="headline">{{ item.title }}</v-card-title>
          <v-card-text
            v-if="item.source"
            class="text-xs-justify subheading"
            v-html="markation(item.source)"
          ></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FaqSection from "../components/FaqSection";
import markdownIt from "../jsUtilities/markdownIt";
import { firestore } from "../firebase";

export default {
  name: "Home",
  components: { FaqSection },
  data() {
    return {
      homeCards: {
        items: [],
      },
      right: null,
      activeElement: 0,
      currentOffset: 0,
      timeout: null,
      expansionPanel: null,
      pageTitle: "Home",
    };
  },
  async mounted() {
    await this.$bind("homeCards", firestore.collection("public_data").doc("homeCards"));
    this.findIndex();
  },
  methods: {
    onScroll() {
      this.currentOffset = window.pageYOffset || document.documentElement.offsetTop;
      clearTimeout(this.timeout);
      //TODO make this smaller if you want updates live instead of when scrolling stopped
      this.timeout = setTimeout(this.findIndex, 40);
    },
    findIndex() {
      console.log(this.$refs.cards);
      let element = this.$refs.cards.findIndex(card => {
        return card.$el.offsetTop - this.$vuetify.clientHeight / 4 >= this.currentOffset;
      });
      this.activeElement = element === 0 ? 0 : element - 1;
      this.activeElement = element === -1 ? this.$refs.cards.length - 1 : this.activeElement;
    },
    markation(markdownString) {
      return markdownIt.render(markdownString);
    },
  },
};
</script>

<style>
/* TODO RENAME CLASSES */
.active-border-default a {
  border-left: 0 solid #ffb618;
  transition: border-left-width 0.3s ease-in !important;
}

.active-border {
  border-left: 7px solid #ffb618 !important;
}
</style>
