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
        <li v-for="(ses, index) in session" :key="index">
            Дата сеансу: <router-link :to="{ name: 'SessionDetails', params: {id: ses._id}}">
            {{ ses.date }}
          </router-link>
        </li>
</template>

<script>
import * as movieAPI from '@/services/movieAPI'
import * as sessionAPI from '@/services/sessionAPI'

export default {
    data () {
        return{
            movie: {
                title: '',
                year: 0,
                genres: [],
                language: '',
                trailerLink: '',
                actors: [],
                director: '',
                duration: 0,
                rating: 0,
                description: '',
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
    },
    mounted() {
        this.getMovie();
        this.getAllSession();
    },

};

</script>

