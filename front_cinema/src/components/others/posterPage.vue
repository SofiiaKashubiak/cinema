<template>
  <div class="movies-container">
    <ul class="movies-list">
      <li v-for="(movie, index) in response" :key="index" class="movie-item">
        <img :src="movie.photoUrl" class="movie-poster">
        <router-link :to="{ name: 'MovieDetails', params: {id: movie._id}}" class="movie-title">
          {{ movie.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import * as movieAPI from '@/services/movieAPI'

export default {
  data() {
    return {
      response: [],
    };
  },
  methods: {
    async getAllMovies() {
      try {
        this.response = await movieAPI.getAllMovies();
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
  mounted() {
    this.getAllMovies();
  },
};

</script>
<style>
.movies-container {
  display: flex;
  justify-content: center;
  padding: 120px;
}

.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 1400px;
  justify-content: center;
}

.movie-item {
  flex: 0 1 calc(33.333% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.movie-item:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.movie-title {
  color: white;
  text-decoration: none;
  font-family: Cormorant Garamond;
  font-size: 35px;
  font-weight: 700;
  line-height: 54.5px;
  text-align: center;
}

.movie-title:hover {
  text-decoration: underline;
}

</style>


