<template>
  <v-card>
    <v-card-text>
      <h2 class="display-3 font-weight-regular mb-3">
        Felicitari! Stilul tau optim de invatare este
        <span class="orange--text">
          {{ styleData[finalStyle].name }}
          <v-icon large style="font-size: inherit; color: inherit;">{{ styleData[finalStyle].icon }}</v-icon>
        </span>
      </h2>
      <h6 class="headline">
        {{ styleData[finalStyle].description }}
      </h6>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LearningTestReslut",
  props: {
    finalStyle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      styleData: {
        visual: {
          name: "Vizual",
          description:
            "Întrucât vizualii se concentrează bine asupra detaliilor, modul lor de învăţare este frânat atunci când trebuie să rezume esenţa celor citite, pentru a obţine ideea principală. Ei se descurcă mai bine în reamintirea faptelor pe care le citesc decât în obţinerea tabloului general sau în producerea de speculaţii, deoarece acestea n-au fost formulate şi ei nu le-au văzut scrise în text. Ar trebui să le solicite profesorilor/instructorilor materiale vizuale, de tipul rezumatelor, îndrumarelor de studiu sau notiţelor ordonate secvenţial pe planşe, ca să-i ajute să vadă ce anume este important. Astfel, ei le-ar putea vedea, citi sau ar pune întrebări ca să-şi organizeze mental informaţiile. Îşi pot întocmi propriile lor notiţe, scriindu-le, sau dictându-le în mod organizat secvenţial, sub forma unor sinteze sau organigrame, pentru a vedea mental materialul. De multe ori, este necesar să-şi găseasca materiale sau cărţi scrise secvenţial, care să corespundă cu subiectul, pentru a-1 învăţa pe cont propriu.",
          icon: "mdi-eye",
        },
        audio: {
          name: "Auditiv",
          description:
            "Auditivii ar trebui sa-i roage pe profesori sa le prezinte materialele într-o modalitate auditiva, secventiala, prin prezentari, prelegeri şi discutii. Ei ar trebui sa foloseasca inregistrari audio şi să-şi faca propriile lor insemnari într-o modalitate liniara. Ei ar trebui sa citeasca materialele cu glas tare, şi eventual sa se inregistreze pe o caseta. De asemenea, este foarte util sa studieze cu un partener sau cu un grup de discutii.",
          icon: "mdi-ear-hearing",
        },
        tactile: {
          name: "Tactil",
          description:
            "Tactilii ar trebui sa-i roage pe profesori sa le ingaduie să-şi ia notiţe la cursuri, la prelegeri, din sinteze tiparite, manuale sau alte date prezentate secvential. Ca să-şi faca insemnari organizate secvential, au nevoie de manuale organizate secvential, dar şi de alte materiale scrise sau audio-vizuale. Ei pot explica profesorului sau colegilor ca au nevoie de o comunicare pozitiva şi de feedback. dacă într-un ambient negativ nu se petrece nici o modificare, îşi pot consemna gandurile şi sentimentele într-un jurnal, sau pot vorbi cu cineva. De asemenea, pot invaţa tehnici de relaxare şi metode de abordare a propriei lor sensibilitati emotionale.",
          icon: "mdi-gesture-double-tap",
        },
        puzzle: {
          name: "Kinestezic",
          description:
            "Kinestezicii ar trebui să-i roage pe profesori să le îngăduie să execute activităţi de mişcare într-o modalitate secvenţială, pentru a învăţa materialele. Dacă instruirea este prezentată sub forma unei prelegeri, trebuie să solicite planuri generale sau manuale de studiu, ori să-şi ia notiţe în ordine secvenţială, pe hârtie, ca să poată transpune cuvintele în acţiune, sub forma unui film mental în care ei joacă un rol, sau într-un cadru de ansamblu scris cu litere mari. Pot căuta materiale secvenţiale, fie scrise, fie în format audio-vizual, care au legatură cu subiectul şi-i ajută să transpună textul în acţiune.",
          icon: "mdi-puzzle",
        },
      },
    };
  },
};
</script>

<style scoped></style>
