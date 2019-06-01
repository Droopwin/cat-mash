<template id='Competition'>
  <div>
    <h1>{{ msg }}</h1>
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
      leftCat: { id: '', info: { url: 'https://media.giphy.com/media/kodQslB005JIc/giphy.gif', score: 0, nbVotes: 0 } },
      rightCat: { id: '', info: { url: 'https://media.giphy.com/media/kodQslB005JIc/giphy.gif', score: 0, nbVotes: 0 } },
    };
  },
  methods: {
    chooseOne(cat) {
      db.collection('cats').doc(cat.id).update({ score: cat.info.score + 1, nbVotes: cat.info.nbVotes + 1 });
    },
  },
  created() {
    const leftCatPos = Math.floor((Math.random() * catList.length) + 1);
    let rightCatPos = Math.floor((Math.random() * catList.length) + 1);
    if (catList.length > 1) {
      while (leftCatPos === rightCatPos) {
        rightCatPos = Math.floor((Math.random() * catList.length) + 1);
      }
    }
    const docRef = db.collection('cats').doc(catList[leftCatPos].id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.leftCat = { id: catList[leftCatPos].id, info: doc.data() };
      } else {
        this.leftCat = {
          id: catList[leftCatPos].id,
          info: { url: catList[leftCatPos].url, score: 0, nbVotes: 0 },
        };
        db.collection('cats').doc(catList[leftCatPos].id).set({
          url: catList[leftCatPos].url,
          score: 0,
          nbVotes: 0,
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
          info: { url: catList[rightCatPos].url, score: 0, nbVotes: 0 },
        };
        db.collection('cats').doc(catList[rightCatPos].id).set({
          url: catList[rightCatPos].url,
          score: 0,
          nbVotes: 0,
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
</style>
