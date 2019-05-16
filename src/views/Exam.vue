<template>
  <v-container align-content-space-around>
    <v-layout text-xs-center>
      <v-flex>
        <h2 class="display-3 my-5">Test Memorie</h2>
      </v-flex>
    </v-layout>
    <card-list-exam :exam-data="examData" />
  </v-container>
</template>

<script>
import CardListExam from "../components/CardListExam";

export default {
  name: "Exam",
  components: { CardListExam },
  data() {
    return {
      questions: [
        {
          id: 0,
          question:
            "De cele mai multe ori, numerele de telefon, numele de persoane, datele istorice, denumirile geografice, formulele, denumirile latinești ale plantelor sunt reținute pe baza memorării:",
          options: ["logice", "mecanica", "postvoluntare", "afective"],
          correctAnswer: 1,
        },
        {
          id: 1,
          question: "Uitarea este un fenomen psihic:",
          options: [
            "natural şi relativ necesar",
            "patologic şi selectiv",
            "întotdeauna pozitiv şi necesar",
            "nefiresc, manifestat sub forma erorilor sau omisiunilor",
          ],
          correctAnswer: [0, 3],
        },
        {
          id: 2,
          question:
            "Pentru cӑ ai înţeles cum poate fi combӑtutӑ uitarea, aplicând cunoştinţele dobândite la orele de psihologie, ai primit calificativul maxim la examen; acum ştii cӑ o memorare devine eficientӑ dacӑ repetarea materialului de memorat:",
          options: [
            "se reduce la simpla citire a textului",
            "este eşalonată în timp şi bazată pe reluarea la anumite intervale a repetiţiilor",
            "este comasată în timp şi bazată pe repetarea integrală a materialului",
            "depăşeşte numărul de repetiţii care au fost anterior necesare pentru întipărirea informaţiilor",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Memorarea logică pune în evidenţă:",
          options: [
            "implicarea afectivității în memorare",
            "implicarea repetiţiei în memorare",
            "implicarea percepţiei în memorare",
            "implicarea înţelegerii în memorare",
          ],
          correctAnswer: 3,
        },
        {
          id: 4,
          question:
            "Clasificarea formelor memoriei în memorie senzorială, memorie de scurtă durată şi memorie de lungă durată, are la bază:",
          options: [
            "rapiditatea întipăririi informaţiilor",
            "durata reactualizării informaţiilor",
            "rapiditatea reactualizării informaţiilor",
            "durata păstrării informaţiilor",
          ],
          correctAnswer: 3,
        },
        {
          id: 5,
          question: "Ca proces al memoriei si, totodată, etapă a acesteia, reactualizarea informaţiilor:",
          options: [
            "este numită si întipărire",
            "constă în reţinerea informaţiilor pentru o perioadă mai lungă sau mai scurtă de timp",
            "este procesul de rezolvare a problemelor cu ajutorul informaţiilor anterioare",
            "se realizează sub forma recunoasterilor si reproducerilor",
          ],
          correctAnswer: 3,
        },
        {
          id: 6,
          question:
            "Clasificarea formelor memoriei în memorie logică şi memorie mecanică are la bază: (test-question; correct-answers: 2 and 3)",
          options: [
            "prezenţa sau absenţa intenţiei de memorare",
            "durata păstrării informaţiilor",
            "gradul de înţelegere a celor memorate",
            "modalitatea informaţională preferenţială",
          ],
          correctAnswer: [1, 2],
        },
        {
          id: 7,
          question: "După prezența sau absența intenției de a memora, memorarea poate fi:",
          options: [
            "voluntară sau involuntară",
            "mecanică sau logică",
            "de scurtă durată sau de lungă durată",
            "perceptivă sau verbal",
          ],
          correctAnswer: 0,
        },
        {
          id: 8,
          question:
            "Faptul că omul reţine şi reactualizează doar o parte din informaţii evidenţiază o trăsătură a memoriei, şi anume caracterul ei:",
          options: ["selectiv", "mijlocit", "inteligibil", "active"],
          correctAnswer: 0,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
