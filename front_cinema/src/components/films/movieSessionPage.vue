<template>
    <form>
        <select v-model="session.movieId">
            <option v-for="option in movies" :key="option.value" :value="option.value">
                {{ option.title }}
            </option>
        </select>
        <select v-model="session.cinemaId">
            <option v-for="option in cinemas" :key="option.value" :value="option.value">
                {{ option.title }}
            </option>
        </select>
        <input type="date" v-model="session.date">
        <input type="time" v-model="session.time">
        <input type="number" v-model="session.price">
        <input type="number" v-model="session.discount">
        <input type="number" v-model="session.quantityAvailablePlaces">
        <button type="submit">Lets Go</button>
    </form>
</template>

<script>
import axios from "axios";
const movieUrl = "http://localhost:3000/movie/";
const cinemaUrl = "http://localhost:3000/cinema/"

export default {
    data () {
        return{
            session: {
                movieId: '',
                cinemaId: '',
                date: '',
                time: '',
                price: '',
                discount: '',
                quantityAvailablePlaces: '',
            },
            cinemas: [],
            movies: [],
        };
    },
    methods: {
        getMovies() {
            axios.get(movieUrl + "/getAllMovies")
            .then(response => {
                this.movies = response.data.data.movies;
            })
            .catch(error => {
                alert(error)
            });
        },
        getCinemas(){
            axios.get(cinemaUrl + "/getAllCinemas")
            .then(response => {
                this.cinemas = response.data.data.cinemas;
            })
            .catch(error => {
                alert(error)
            });
        }
    },
    mounted() {
       this.getMovies();
       this.getCinemas();
    },
};

</script>

