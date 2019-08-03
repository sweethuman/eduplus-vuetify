# Documentatie

## EDU Plus
- platformă educaţională de învăţare personalizată a disciplinelor de bacalaureat
- se deosebeste de alte platforme prin unicitatea în prezentarea lecţiilor: fiecare lecţie este adaptată la stilul de învăţare al elevului

## Utilizare
- Selectezi disciplina la care vrei sa te pregatesti
- Parcurgi chestionarul pentru identificarea stilului de invatare
- Revii la pagina disciplinei si alegi lectia pe car vrei sa o parcurgi
- Lectia va fi afisata dirct in stilul tau de invatare
- Poti accesa celelalte stiluri de invatare prin intermediul butonului din coltul din dreapta jos al ecranului

## Mai ofera
- Buton de schimbat pe fond luminos sau intunecat (dark theme toggle)
- Continut aditional
- Sectiune de Bibliografie

## Descriere tehnica
Eduplus este o aplicatie web facuta in Vue.js.
Aceasta aplicatie genereaza fiecare pagina dinamic, insemnand ca fiecare pagina a aplicatiei este formata de componenta principala (App.vue) care se foloseste de o componenta router (router.js) pentru a genera ce vede utilizatorul, facand adaugarea si extinderea proiectului foarte usoara.
Respecta protocoalele pwa (cu ajutorul unui plugin), facand astfel posibila descarcarea aplicatiei web si folosirea acesteia ca pe orice alta aplicatie.
Are un design adaptabil rezolutiilor diverse ale dispozitivelor ce vor utiliza aplicatia. (Cu alte cuvinte, prezinta un Responsive Desgin)
Deoarece este o aplicatie web, este compatibila cu foarte multe dispozitive.
Generarea textelor este facuta cu ajutorul unei versiuni de Markdown imbunatatita cu niste pluginuri, unele scrise de noi.
Back End-ul aplicatiei este reprezentat de serviciile FireBase. (Pentru integrare in aplicatie folosim firebase web sdk).
Folosim Webpack pentru a „comprima” codul si Babel pentru „transpiling”.
Folosim Material design Icons pentru simbolurile prezente in aplicatie.

## Componente
firestore_rules.txt - contine Firestore Security Rules (regulile de securitate de la firestore) care sunt active in momentul actual pe Firestore(baza de date)
App.vue - Componenta principala a aplicatiei web, aceasta incapsuleaza paginile si restul logicii acestora in timpul rularii aplicatiei
firebase.js - Componenta ce integreaza Firebase in aplicatie
main.js - script principal al codului, primul element rulat de aplicatie
router.js - defineste adresele, parametrii de adresa si paginile corespunzatoare
views - contine componentele principale pentru fiecare pagina a aplicatiei
store - contine definitia Vuex si modulele Vuex
plugins - contine pluginurile Vue aplicatiei
mixins - contine cod reutilizabil de alte componente
jsUtilities - contine mici script-uri folosite de aplicatie si plugin-ul custom de Markdown
enums - contine obiecte inghetate utilizate global de aplicatie, emularea in javaScript a tipului de date Enums din alte limbaje
data - contine doar json-ul pentru testul de stil de invatare
css - contine partile din css ale aplicatiei
constructors - contine un constructor pentru obicetul de tip CardContent folosit in componenta contentCard
components - contine componentele Vue ale paginilor aplicatiei
assets - contine Logo-ul aplicatiei

# eduplus-vuetify

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
