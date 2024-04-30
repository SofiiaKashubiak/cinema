<template>
    <form @submit.prevent="createMovie()">
        Title<input type="text" v-model="movie.title" required>
        Year<input type="number" v-model="movie.year" required>
        Genre
        <div v-for="(genre, index) in movie.genres" :key="index">
        <select v-model="movie.genres[index]" required>
        <option v-for="option in genreOption" :key="option" :value="option">
            {{ option }}
        </option>
        </select>
        <button type="button" @click="removeGenre(index)">Remove</button>
        </div>
        <button type="button" @click="addGenre">Add Genre</button>
        Language<input type="text" v-model="movie.language" required>
        trailerLink<input type="text" v-model="movie.trailerLink" required>
        Actors
        <div v-for="(actor, index) in movie.actors" :key="index">
            <input type="text" v-model="movie.actors[index]" />
            <button type="button" @click="removeActor(index)">Remove</button>
        </div>
        <button type="button" @click="addActor">Add Actor</button>
        Director<input type="text" v-model="movie.director" required>
        Duration<input type="number" v-model="movie.duration" required>
        Rating<input type="number" v-model="movie.rating" required>
        Description<input type="text" v-model="movie.description" required>
        <button type="submit">Lets Go</button>
    </form>
</template>

<script>
import axios from "axios";
const movieUrl = "http://localhost:3000/movie/";

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
            genreOption: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller"]
        };
    },
    methods: {
        addGenre() {
        this.movie.genres.push("");
        },
        removeGenre(index) {
        this.movie.genres.splice(index, 1);
        },
        addActor() {
        this.movie.actors.push("");
        },
        removeActor(index) {
        this.movie.actors.splice(index, 1);
        },
        createMovie() {
            axios.post(movieUrl + "createMovie", this.movie)
            .then(
                this.$router.push("/")
            )
            .catch(error => {
                alert(error)
            });
        },
    },

};

</script>

