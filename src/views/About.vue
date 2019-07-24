<template>
  <div class="about">
    <v-container fluid grid-list-xs>
      <v-layout fill-height mb-5>
        <v-flex xs12 sm8 offset-sm2>
          <v-card class="elevation-15">
            <v-card-title primary-title>
              <div>
                <h1 class="display-4 font-weight-thin mb-1">EDU+</h1>
                <h4 class="display-1 font-weight-thin font-italic">
                  Aventura ta de învăţare începe aici!
                </h4>
              </div>
            </v-card-title>
            <v-card-text>
              <h5 class="headline">
                Aceasta este o platformă deschisă care te ajută să înveţi la disciplinele care contează pentru tine, în
                modul în care ai tu nevoie.
              </h5>
              <h5 class="headline">
                Pentru a începe, completează chestionarul de identificare a stilului de învăţare sau caută lecţia care
                îţi trebuie printre cele pe care ţi le oferim ca resurse.
              </h5>
              <h5 class="headline">
                Ai multe opţiuni de discipline, toate din planul de bacalaureat:
                <span class="font-weight-medium">Matematica</span>
                ,
                <span class="font-weight-medium">Limba Romana</span>
                ,
                <span class="font-weight-medium">Psihologie</span>
                si
                <span class="font-weight-medium">Istorie</span>
              </h5>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xs>
      <v-layout fill-height mb-5>
        <v-flex xs12 sm8 offset-sm2>
          <v-card class="elevation-15">
            <v-card-title primary-title>
              <div>
                <h1 class="display-4 font-weight-thin mb-1">Bibliografie</h1>
              </div>
            </v-card-title>
            <v-card-text>
              <h5 class="headline">
                Alexiu, Alina; Badea, Mariana; Iordache, Nicoleta; Milici, Talida; Ştefănescu, Carmen. Teste-grilă
                pentru pregătirea examenului de bacalaureat. Logică, argumentare şi comunicare. Psihologie. Sociologie.
                (2017)
              </h5>
              <h5 class="headline">
                Ioaneş, Diana. Psihologie. Teste grilă. (2018). Ed. Universitară, Bucureşti
              </h5>
              <h5 class="headline">
                Linksman, Ricki. Învăţare rapidă. (1999), Ed. Teora, Bucureşti
              </h5>
              <h5 class="headline">
                Neculau, Adrian (coord). (2008). Manual de psihologie. Editura Polirom, Iaşi
              </h5>
              <h5 class="headline">
                Zlate, Mielu; Creţu, Tinca; Mitrofan, Nicolae; Aniţei, Mihai. (2008). Manual de psihologie. Editura
                Aramis, Bucureşti
              </h5>
              <h5 class="headline">
                Baddeley, A. (1998). Memoria umană. Editura Teora, Bucureşti
              </h5>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="snackbar" color="error" :timeout="5000">
      Ne pare rau, lectia nu este activa inca.
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      pageTitle: "Despre",
    };
  },
};
</script>
