<template>
    <div>
      <ul>
        <li v-for="(movie, index) in response" :key="index">
          <router-link :to="{ name: 'MovieDetails', params: {id: movie._id}}">
            {{ movie.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-for="(movie, index) in response" :key="index">
            {{ movie.name }}
        </div>
</template>


<script>
import * as movieAPI from '@/services/movieAPI'

export default {
data () {
    return{
        response: [],
    };
},
methods: {
    async getAllMovies() {
        this.response = await movieAPI.getAllMovies();
    },
},
mounted() {
    this.getAllMovies();
},

};

</script>