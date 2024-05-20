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
import * as movieAPI from '@/services/movieAPI'

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
        async getMovies() {
            this.movies = await movieAPI.getAllMovies();
        },

    },
    mounted() {
       this.getMovies();
    },
};

</script>

