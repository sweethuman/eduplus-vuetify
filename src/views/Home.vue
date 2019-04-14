<template>
  <v-container>
    <v-layout fill-height align-center justify-center>
      <v-flex shrink class="mr-1" v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn fab @click="prev()" class="peach-gradient-reversed" dark large>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 md12 lg8 xlg8>
        <v-window class="elevation-0 my-5" v-model="slide" dark>
          <v-window-item v-for="i in 5" :key="i">
            <v-layout align-center justify-space-between fill-height>
              <v-flex xs12 md4 v-for="j in $vuetify.breakpoint.mdAndUp ? 3 : 1" :key="'' + i + j">
                <v-card class="mx-1" min-height="200px" hover>
                  <v-layout fill-height column>
                    <v-flex grow>
                      <v-card-title primary-title>
                        <h3 class="headline mb-0">
                          <span class="font-weight-bold">{{ "" + i + j }}:</span> Is Seaweed good Seaweed?
                        </h3>
                      </v-card-title>
                    </v-flex>

                    <v-flex shrink>
                      <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-window-item>
        </v-window>
      </v-flex>
      <v-flex shrink class="ml-1" v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn fab @click="next" class="peach-gradient" dark large>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-expansion-panel
      v-model="expansionPanel"
      class="elevation-12 mb-4"
      style="position: -webkit-sticky; position: sticky; top: 0; z-index: 1"
      v-if="!$vuetify.breakpoint.mdAndUp"
    >
      <v-expansion-panel-content ripple>
        <template #header>
          <div class="py-1">Cuprins</div>
        </template>
        <v-list style="padding: 0; overflow: hidden">
          <template v-for="(item, i) in items">
            <v-list-tile
              :key="item.title"
              @click.stop.prevent="
                $vuetify.goTo(`#${item.title.toLowerCase().replace(/\s/g, '')}`, {
                  duration: 1000,
                  easing: 'easeInOutQuad',
                  offset: 6,
                })
              "
              v-model="item.active"
              ripple
              class="active-border-default"
              active-class="primary--text active-border"
              v-scroll="onScroll"
            >
              <v-list-tile-action>
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="i" v-if="i !== items.length"></v-divider>
          </template>
          <v-list-tile @click="expansionPanel = null" ripple>
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
      <v-flex shrink class="mr-4" v-if="$vuetify.breakpoint.mdAndUp">
        <v-card class="d-inline-block elevation-12" style="position: -webkit-sticky; position: sticky; top: 70px;">
          <v-navigation-drawer floating permanent stateless value="true">
            <v-list style="padding: 0">
              <template v-for="(item, i) in items">
                <v-list-tile
                  :key="item.title"
                  @click.stop.prevent="
                    $vuetify.goTo(`#${item.title.toLowerCase().replace(/\s/g, '')}`, {
                      duration: 1000,
                      easing: 'easeInOutQuad',
                      offset: 6,
                    })
                  "
                  v-model="item.active"
                  ripple
                  class="active-border-default"
                  active-class="primary--text active-border"
                  v-scroll="onScroll"
                >
                  <v-list-tile-action>
                    <v-icon>mdi-{{ item.icon }}</v-icon>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="i" v-if="i !== items.length - 1"></v-divider>
              </template>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-flex>
      <v-flex xs12 md10>
        <v-card
          class="mb-4"
          v-for="(item, i) in items"
          :key="i"
          :id="item.title.toLowerCase().replace(/\s/g, '')"
          ref="cards"
        >
          <v-card-title class="headline">{{ item.title }}</v-card-title>
          <v-card-text class="text-xs-justify"
            ><p>
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
export default {
  data() {
    return {
      items: [
        {
          title: "Welcome Message",
          icon: "human-handsup",
          content: null,
          active: null,
        },
        {
          title: "Quick Guide",
          icon: "owl",
          content: null,
          active: null,
        },
        {
          title: "Overview",
          icon: "compass",
          content: null,
          active: null,
        },
        {
          title: "Aditional Content",
          icon: "book-multiple-plus",
          content: null,
          active: null,
        },
        {
          title: "Support",
          icon: "help",
          content: null,
          active: null,
        },
      ],
      right: null,
      activeElement: null,
      currentOffset: 0,
      timeout: null,
      slide: 0,
      expansionPanel: null,
    };
  },
  //TODO can just use old value
  watch: {
    activeElement: function() {
      for (let item in this.items) this.items[item].active = this.activeElement == item;
    },
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
        return card.$el.offsetTop - 75 >= this.currentOffset;
      });
      this.activeElement = element === 0 ? 0 : element - 1;
      this.activeElement = element === -1 ? this.$refs.cards.length - 1 : this.activeElement;
    },
    prev() {
      this.slide = this.slide - 1 < 0 ? 4 : this.slide - 1;
    },
    next() {
      this.slide++;
    },
  },
  mounted() {
    this.findIndex();
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
