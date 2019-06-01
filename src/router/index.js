import Vue from 'vue';
import Router from 'vue-router';
import Scores from '@/components/Scores';
import Competition from '@/components/Competition';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/scores',
      name: 'Scores',
      component: Scores,
    },
    {
      path: '/',
      name: 'Cats',
      component: Competition,
    },
  ],
});
