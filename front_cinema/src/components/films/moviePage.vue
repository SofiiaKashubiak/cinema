<template>
        Title {{ movie.title }}
        Year {{ movie.year }}
        Genre {{ movie.genre }}
        <div v-for="(genre, index) in movie.genres" :key="index">
            {{ genre }}
        </div>
        Language {{ movie.language }}
        trailerLink {{ movie.trailerLink }}
        Actors {{ movie.actors }}
        <div v-for="(actor, index) in movie.actors" :key="index">
            {{ actor }}
        </div>
        director {{ movie.director }}
        Duration {{ movie.duration }}
        Rating {{ movie.rating }}
        Description {{ movie.description }}
</template>

<script>
import axios from "axios";

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
        };
    },
    methods: {
        getMovie() {
            axios.get("http://localhost:3000/movie/getMovie/" + this.$route.params.id)
            .then(response => {
                this.movie = response.data.data.movie;
            })
            .catch(error => {
                alert(error)
            });
        },
    },
    mounted() {
        this.getMovie();
    },

};

</script>

