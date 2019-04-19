<template>
  <v-container class="backing" fill-height fluid>
    <v-layout row align-center justify-center
      ><v-flex v-if="this.$vuetify.breakpoint.mdAndUp" d-flex md3 offset-md3
        ><svg height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
              id="Polygon-1"
              d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
              stroke="#007FB2"
              stroke-width="6"
            ></path>
            <path
              id="Polygon-2"
              d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
              stroke="#EF4A5B"
              stroke-width="6"
            ></path>
            <path
              id="Polygon-3"
              d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
              stroke="#795D9C"
              stroke-width="6"
            ></path>
            <path
              id="Polygon-4"
              d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
              stroke="#F2773F"
              stroke-width="6"
            ></path>
            <path
              id="Polygon-5"
              d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
              stroke="#36B455"
              stroke-width="6"
            ></path>
          </g></svg
      ></v-flex>
      <v-flex xs12 md6>
        <v-layout column :align-center="!this.$vuetify.breakpoint.mdAndUp">
          <v-flex xs12 py-5>
            <h1 class="display-4 white--text">404</h1>
            <h2 class="display-2 white--text">Page not found</h2>
          </v-flex>
          <v-flex xs12>
            <v-btn onclick="history.back()" class="primary kingyna-gradient elevation-15">
              <v-icon left>mdi-arrow-left</v-icon>
              Go Back
            </v-btn>
            <v-btn dark to="/" class="kingyna-gradient elevation-15">
              <v-icon left>mdi-home-outline</v-icon>
              Go Home
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
.backing {
  background: #2f3242;
}

#Polygon-1,
#Polygon-2,
#Polygon-3,
#Polygon-4,
#Polygon-4,
#Polygon-5 {
  animation: float 1s infinite ease-in-out alternate;
}
#Polygon-2 {
  animation-delay: 0.2s;
}
#Polygon-3 {
  animation-delay: 0.4s;
}
#Polygon-4 {
  animation-delay: 0.6s;
}
#Polygon-5 {
  animation-delay: 0.8s;
}

@keyframes float {
  100% {
    transform: translateY(20px);
  }
}
</style>
