<template>
    <form @submit.prevent="createMovie">
        Title
        <input type="text" v-model="movie.title" @input="isAnyFieldEmpty" required>

        Year
        <input type="number" v-model="movie.year" @input="validateYear" required>
        <div v-if="invalidYear" >Year must be a valid number from 2001 to 2024</div>
        
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
        <div v-if="invalidGenres" >At least one genre is required</div>
        
        Language
        <input type="text" v-model="movie.language" @input="isAnyFieldEmpty()" required>

        Trailer Link
        <input type="text" v-model="movie.trailerLink" @input="isAnyFieldEmpty()" required>

        Actors
        <div v-for="(actor, index) in movie.actors" :key="index">
            <input type="text" v-model="movie.actors[index]" @input="validateActors" required />
            <button type="button" @click="removeActor(index)">Remove</button>
        </div>
        <button type="button" @click="addActor">Add Actor</button>
        <div v-if="invalidActors" >At least one actor is required</div>
        
        Director
        <input type="text" v-model="movie.director" @input="isAnyFieldEmpty" required>

        Duration
        <input type="number" v-model="movie.duration" @input="validateDuration" required>
        <div v-if="invalidDuration" >Duration must be a valid number</div>
        
        Rating
        <input type="number" v-model="movie.rating" @input="validateRating" required>
        <div v-if="invalidRating" >Rating must be a valid number</div>
        
        Description
        <input type="text" v-model="movie.description" @input="isAnyFieldEmpty" required>

        <button type="submit" :disabled="this.invalidYear || invalidActors || invalidGenres ||
                   this.invalidDuration || this.invalidRating || this.isAnyFieldEmpty()">Let's Go</button>
        <div v-if="isAnyFieldEmpty()">Do not leave fields blank</div>
    </form>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';

export default {
    data() {
        return {
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
            genreOption: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller"],
            invalidYear: false,
            invalidGenres: false,
            invalidActors: false,
            invalidDuration: false,
            invalidRating: false,
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
        validateYear() {
            this.invalidYear = this.movie.year <= 2000 || this.movie.year >= 2025;
        },
        validateGenres() {
            this.invalidGenres = this.movie.genres.length === 0 || this.movie.genres.some(genre => !genre.trim());
        },
        validateActors() {
            this.invalidActors = this.movie.actors.length === 0 || this.movie.actors.some(actor => !actor.trim());
        },
        validateDuration() {
            this.invalidDuration = this.movie.duration <= 0;
        },
        validateRating() {
            this.invalidRating = this.movie.rating < 0 || this.movie.rating > 10;
        },
        isAnyFieldEmpty() {
            return !this.movie.title || !this.movie.language || !this.movie.trailerLink || !this.movie.director || 
            !this.movie.description || this.movie.genres.length === 0 || this.movie.actors.length === 0;
        },
        async createMovie() {
                await movieAPI.createMovie(this.movie);
                this.$router.push("/");
        },
    },
};
</script>

<style>
</style>
