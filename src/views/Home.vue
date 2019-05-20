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
          <template v-for="(item, i) in items">
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
            <v-divider v-if="i !== items.length" :key="i"></v-divider>
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
    <v-layout justify-space-between>
      <v-flex v-if="$vuetify.breakpoint.mdAndUp" shrink class="mr-4">
        <v-card class="d-inline-block elevation-12" style="position: -webkit-sticky; position: sticky; top: 70px;">
          <v-navigation-drawer floating permanent stateless value="true">
            <v-list style="padding: 0">
              <template v-for="(item, i) in items">
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
                <v-divider v-if="i !== items.length - 1" :key="i"></v-divider>
              </template>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-flex>
      <v-flex xs12 md10>
        <v-card
          v-for="(item, i) in items"
          :id="item.title.toLowerCase().replace(/\s/g, '')"
          :key="i"
          ref="cards"
          class="mb-4"
        >
          <v-card-title class="headline">{{ item.title }}</v-card-title>
          <v-card-text class="text-xs-justify">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Phasellus faucibus scelerisque eleifend donec. Vitae justo eget magna fermentum
              iaculis eu. Netus et malesuada fames ac turpis egestas integer eget aliquet. Purus in mollis nunc sed id.
              In arcu cursus euismod quis. Scelerisque viverra mauris in aliquam sem. Tempor nec feugiat nisl pretium.
              Malesuada fames ac turpis egestas. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Sed
              nisi lacus sed viverra tellus in hac habitasse. Sollicitudin aliquam ultrices sagittis orci a scelerisque
              purus.
            </p>

            <p>
              Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Eu feugiat pretium nibh ipsum
              consequat nisl. Erat imperdiet sed euismod nisi. Eu nisl nunc mi ipsum faucibus vitae. Elementum curabitur
              vitae nunc sed velit dignissim sodales ut. Posuere morbi leo urna molestie at elementum eu facilisis.
              Imperdiet sed euismod nisi porta lorem mollis. Pellentesque sit amet porttitor eget dolor morbi. Sit amet
              purus gravida quis blandit turpis cursus in. Placerat duis ultricies lacus sed turpis tincidunt id aliquet
              risus. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. In hac
              habitasse platea dictumst quisque. Odio pellentesque diam volutpat commodo sed egestas. Arcu dui vivamus
              arcu felis bibendum ut tristique. Viverra orci sagittis eu volutpat odio facilisis. Commodo nulla facilisi
              nullam vehicula ipsum a. Quis lectus nulla at volutpat diam ut venenatis tellus in. Cursus vitae congue
              mauris rhoncus.
            </p>

            <p>
              Porta nibh venenatis cras sed. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Velit laoreet
              id donec ultrices tincidunt. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Adipiscing
              commodo elit at imperdiet dui accumsan sit. Senectus et netus et malesuada fames. Eu feugiat pretium nibh
              ipsum consequat nisl. Egestas erat imperdiet sed euismod nisi. Et malesuada fames ac turpis egestas
              maecenas pharetra. Egestas diam in arcu cursus euismod quis viverra nibh. Accumsan in nisl nisi
              scelerisque eu ultrices vitae auctor. Hac habitasse platea dictumst quisque sagittis purus sit amet
              volutpat.
            </p>

            <p>
              Sit amet venenatis urna cursus eget nunc scelerisque viverra. Orci a scelerisque purus semper eget. Cursus
              eget nunc scelerisque viverra. Pulvinar elementum integer enim neque volutpat. Aliquam sem fringilla ut
              morbi. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Ut diam quam nulla porttitor
              massa id. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Senectus et netus et malesuada
              fames ac turpis. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Turpis egestas
              pretium aenean pharetra magna ac. Sed ullamcorper morbi tincidunt ornare. Risus nullam eget felis eget
              nunc lobortis mattis aliquam. Ut tortor pretium viverra suspendisse potenti nullam ac. Massa id neque
              aliquam vestibulum morbi.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FaqSection from "../components/FaqSection";
export default {
  name: "Home",
  components: { FaqSection },
  data() {
    return {
      items: [
        {
          title: "Welcome Message",
          icon: "human-handsup",
          content: null,
        },
        {
          title: "Quick Guide",
          icon: "owl",
          content: null,
        },
        {
          title: "Overview",
          icon: "compass",
          content: null,
        },
        {
          title: "Aditional Content",
          icon: "book-multiple-plus",
          content: null,
        },
        {
          title: "Support",
          icon: "help",
          content: null,
        },
      ],
      right: null,
      activeElement: 0,
      currentOffset: 0,
      timeout: null,
      expansionPanel: null,
    };
  },
  mounted() {
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
      let element = this.$refs.cards.findIndex(card => {
        return card.$el.offsetTop - this.$vuetify.clientHeight / 4 >= this.currentOffset;
      });
      this.activeElement = element === 0 ? 0 : element - 1;
      this.activeElement = element === -1 ? this.$refs.cards.length - 1 : this.activeElement;
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
