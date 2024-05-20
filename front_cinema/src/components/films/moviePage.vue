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
</template>

<script>
import * as movieAPI from '@/services/movieAPI'

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
        };
    },
    methods: {
        async getMovie() {
            this.response = await movieAPI.getMovie(this.$route.params.id);
            if (this.response != null){
                this.movie = this.response.movie;
            }
        },
    },
    mounted() {
        this.getMovie();
    },

};

</script>

