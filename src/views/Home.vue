<template>
  <v-container>
    <v-layout justify-space-between>
      <v-flex shrink class="mr-4">
        <v-card class="d-inline-block elevation-12" style="position: -webkit-sticky; position: sticky; top: 70px;">
          <v-navigation-drawer floating permanent stateless value="true">
            <v-list>
              <template v-for="(item, i) in items">
                <v-list-tile
                  :key="item.title"
                  @click.stop.prevent="
                    //activeElement = i;
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
      <v-flex xs10>
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
      this.timeout = setTimeout(this.findIndex, 10);
    },
    findIndex() {
      if (this.currentOffset < 50) {
        this.activeElement = 0;
        return;
      }
      this.activeElement =
        this.$refs.cards.findIndex(card => {
          return card.$el.offsetTop - 30 > this.currentOffset;
        }) - 1;
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
