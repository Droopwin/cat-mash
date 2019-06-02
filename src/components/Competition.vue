<template id='Competition'>
  <div>
    <h1>{{ msg }}</h1>
    <div class='row'>
      <button v-on:click='() => {seeScores()}'>See Scores</button>
    </div>
    <div class='row'>
      <div class='column'>
        <Cat :cat='leftCat' :action='(cat) => chooseOne(cat)'/>
      </div>
      <div class='column'>
        <Cat :cat='rightCat' :action='(cat) => chooseOne(cat)'/>
      </div>
    </div>
  </div>
</template>

<script>
import Cat from '@/components/Cat';
import db from './../firebase';
import catList from './../assets/cats';

export default {
  name: 'Competition',
  components: {
    Cat,
  },
  data() {
    return {
      msg: 'Choose your favorite cat',
      leftCat: { id: '', info: { url: 'https://media.giphy.com/media/kodQslB005JIc/giphy.gif', score: 0, shown: 0, chosen: 0 } },
      rightCat: { id: '', info: { url: 'https://media.giphy.com/media/kodQslB005JIc/giphy.gif', score: 0, shown: 0, chosen: 0 } },
    };
  },
  methods: {
    chooseOne(cat) {
      let newScoreWinner;
      let newScoreLoser;
      if (cat.id === this.leftCat.id) {
        newScoreWinner = (this.leftCat.info.chosen + 1) / (this.leftCat.info.shown + 1);
        newScoreWinner *= 100;
        newScoreLoser = (this.rightCat.info.chosen) / (this.rightCat.info.shown + 1);
        newScoreLoser *= 100;
        newScoreWinner = Math.round(newScoreWinner * 100) / 100;
        newScoreLoser = Math.round(newScoreLoser * 100) / 100;
        db.collection('cats').doc(this.leftCat.id).update({ score: newScoreWinner, chosen: this.leftCat.info.chosen + 1 });
        db.collection('cats').doc(this.rightCat.id).update({ score: newScoreLoser, chosen: this.rightCat.info.chosen });
      } else {
        newScoreWinner = (this.rightCat.info.chosen + 1) / (this.rightCat.info.shown + 1);
        newScoreWinner *= 100;
        newScoreLoser = (this.leftCat.info.chosen) / (this.leftCat.info.shown + 1);
        newScoreLoser *= 100;
        newScoreWinner = Math.round(newScoreWinner * 100) / 100;
        newScoreLoser = Math.round(newScoreLoser * 100) / 100;
        db.collection('cats').doc(this.rightCat.id).update({ score: newScoreWinner, chosen: this.rightCat.info.chosen + 1 });
        db.collection('cats').doc(this.leftCat.id).update({ score: newScoreLoser, chosen: this.leftCat.info.chosen });
      }
      this.$router.push('scores');
    },
    seeScores() {
      db.collection('cats').doc(this.rightCat.id).update({ score: 100 * ((this.rightCat.info.chosen) / (this.rightCat.info.shown + 1)) });
      db.collection('cats').doc(this.leftCat.id).update({ score: 100 * ((this.leftCat.info.chosen) / (this.leftCat.info.shown + 1)) });
      this.$router.push('scores');
    },
  },
  destroyed() {
    db.collection('cats').doc(this.leftCat.id).update({ shown: this.leftCat.info.shown + 1 });
    db.collection('cats').doc(this.rightCat.id).update({ shown: this.rightCat.info.shown + 1 });
  },
  created() {
    const leftCatPos = Math.floor((Math.random() * catList.length) + 1);
    let rightCatPos = Math.floor((Math.random() * catList.length) + 1);
    if (leftCatPos === rightCatPos) {
      rightCatPos = (rightCatPos + 1) % catList.length;
    }
    const docRef = db.collection('cats').doc(catList[leftCatPos].id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.leftCat = { id: catList[leftCatPos].id, info: doc.data() };
      } else {
        this.leftCat = {
          id: catList[leftCatPos].id,
          info: { url: catList[leftCatPos].url, score: 0, shown: 0, chosen: 0 },
        };
        db.collection('cats').doc(catList[leftCatPos].id).set({
          url: catList[leftCatPos].url,
          score: 0,
          shown: 0,
          chosen: 0,
        });
      }
    });
    const docRefB = db.collection('cats').doc(catList[rightCatPos].id);
    docRefB.get().then((doc) => {
      if (doc.exists) {
        this.rightCat = { id: catList[rightCatPos].id, info: doc.data() };
      } else {
        this.rightCat = {
          id: catList[rightCatPos].id,
          info: { url: catList[rightCatPos].url, score: 0, shown: 0, chosen: 0 },
        };
        db.collection('cats').doc(catList[rightCatPos].id).set({
          url: catList[rightCatPos].url,
          score: 0,
          shown: 0,
          chosen: 0,
        });
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
* {
  box-sizing: border-box;
}
/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

button {
  background-color: #4CAF50;
  border-radius: 8px;
  padding: 14px 40px;
  font-size: 25px;
  color: white;
  border: none;
}
</style>
