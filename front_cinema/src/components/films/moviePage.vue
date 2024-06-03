<template>
        Title {{ movie.title }}
        Year {{ movie.year }}
        Genre {{ movie.genre }}
        <div v-for="(genre, index) in movie.genres" :key="index">
            {{ genre }}
        </div>
        Language {{ movie.language }}
        trailerLink {{ movie.trailerLink }}
        <div v-for="(actor, index) in movie.actors" :key="index">
            {{ actor }}
        </div>
        director {{ movie.director }}
        Duration {{ movie.duration }}
        Rating {{ movie.rating }}
        Description {{ movie.description }}
        <img :src="this.movie.photoUrl">
        <li v-for="(ses, index) in session" :key="index">
            Дата сеансу: <router-link :to="{ name: 'SessionDetails', params: {id: ses._id}}">
            {{ ses.date }}
          </router-link>
        </li>
        <router-link :to="{name: 'UpdateMovie', params: {id: this.movie._id}}" v-if="isAdmin()">
            Update
        </router-link>
</template>

<script>
import * as movieAPI from '@/services/movieAPI'
import * as sessionAPI from '@/services/sessionAPI'

export default {
    data () {
        return{
            movie: {
            },
            response: [],
            session: []
        };
    },
    methods: {
        async getMovie() {
            this.response = await movieAPI.getMovie(this.$route.params.id);
            if (this.response != null){
                this.movie = this.response;
            }
        },
        async getAllSession() {
            const allSessions = await sessionAPI.getAllSessions();
            if (allSessions != null) {
                this.session = allSessions.filter(session => session.movieId === this.movie._id);
            }
        },
        isAdmin() {
            return localStorage.getItem("isAdmin")
        }
    },
    mounted() {
        this.getMovie();
        this.getAllSession();
    },

};
</script>

<style>
.movie-poster {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>