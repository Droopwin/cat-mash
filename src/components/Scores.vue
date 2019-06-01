<template id='Comparison'>
  <div class='Comparison'>
    <h1>{{ msg }}</h1>
      <button v-on:click='() => {voteAgain()}'>Vote again</button>
      <ul v-if='cats.length'>
        <div class='row' v-for='cat in cats' :key='cat.id'>
          <Cat :cat='cat' :action='() => {}'/>
          Cuteness : {{cat.info.score}} %
          <div id='progressbar'>
            <progress :value='cat.info.score' min='0' max='100'></progress>
          </div>
        </div>
      </ul>
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


progress[value] {
  width: 50%;
  height: 40px;
}

</style>
