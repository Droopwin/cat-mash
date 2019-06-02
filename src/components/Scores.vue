<template id='Comparison'>
  <div class='Comparison'>
    <h1>{{ msg }}</h1>
      <ul v-if='cats.length'>
        <div class='row' v-for='cat in cats' :key='cat.id'>
          <Cat :cat='cat' :action='() => {}'/>
          Cuteness : {{cat.info.score}} %
          <div id='progressbar'>
            <progress :value='cat.info.score' min='0' max='100'></progress>
          </div>
        </div>
      </ul>
      <br><br><br>
      <div class='bottom_bar'>
        <button v-on:click='() => {voteAgain()}'>Vote again</button>
      </div>
  </div>
</template>

<script>
import Cat from '@/components/Cat';
import db from './../firebase';

export default {
  name: 'Comparison',
  components: {
    Cat,
  },
  data() {
    return {
      msg: 'Cat\'s score',
      cats: [],
    };
  },
  methods: {
    voteAgain() {
      this.$router.push('/');
    },
  },
  created() {
    db.collection('cats').orderBy('score', 'desc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.cats.push({ id: doc.id, info: doc.data() });
      });
    });
  },
  destroyed() {

  },
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

h1 {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  width: 100%;
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
button {
  background-color: #4CAF50;
  border-radius: 8px;
  padding: 14px 40px;
  font-size: 25px;
  color: white;
  border: none;
  margin-bottom: 10px;
  margin-top: 10px;
}

.bottom_bar{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  background-color: white;
  bottom: 0;
  width: 100%;
}

progress[value] {
  width: 25%;
  height: 40px;
}

</style>
