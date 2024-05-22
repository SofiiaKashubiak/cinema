<template>
    <form @submit.prevent="createSession">
        <select v-model="session.movieId" @change="validateMovieId" required>
            <option value="" disabled>Select a movie</option>
            <option v-for="option in movies" :key="option.id" :value="option.id">
                {{ option.title }}
            </option>
        </select>

        <select v-model="session.cinemaId" @change="validateCinemaId" required>
            <option value="" disabled>Select a cinema</option>
            <option v-for="option in cinemas" :key="option.id" :value="option.id">
                {{ option.title }}
            </option>
        </select>

        <input type="date" v-model="session.date" @input="validateDate" required>
        <div v-if="invalidDate" >Date must be between May 21, 2000, and May 21, 2030</div>

        <input type="time" v-model="session.time" @input="validateTime" required>

        <input type="number" v-model="session.price" @input="validatePrice" required>
        <div v-if="invalidPrice" >Valid price is required</div>

        <input type="number" v-model="session.discount" @input="validateDiscount" required>
        <div v-if="invalidDiscount">Valid discount is required</div>

        <input type="number" v-model="session.quantityAvailablePlaces" @input="validateQuantityAvailablePlaces" required>
        <div v-if="invalidQuantityAvailablePlaces" >Valid quantity of available places is required</div>

        <button type="submit" :disabled="isAnyFieldEmpty() || invalidDate || invalidPrice || invalidDiscount || invalidQuantityAvailablePlaces">Let's Go</button>
        <div v-if="isAnyFieldEmpty()">Do not leave fields blank</div>
    </form>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';

export default {
    data() {
        return {
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
            invalidDate: false,
            invalidPrice: false,
            invalidDiscount: false,
            invalidQuantityAvailablePlaces: false,
        };
    },
    methods: {
        async getMovies() {
            this.movies = await movieAPI.getAllMovies();
        },
        validatePrice() {
            this.invalidPrice = this.session.price <= 0;
        },
        validateDiscount() {
            this.invalidDiscount = this.session.discount <= 0;
        },
        validateQuantityAvailablePlaces() {
            this.invalidQuantityAvailablePlaces = this.session.quantityAvailablePlaces <= 0;
        },
        validateDate() {
            const inputDate = new Date(this.session.date);

            const minDate = new Date('2000-05-21');
            const maxDate = new Date('2030-05-21');

            this.invalidDate = inputDate < minDate || inputDate > maxDate;
        },
        isAnyFieldEmpty() {
            return !this.session.movieId || !this.session.cinemaId || !this.session.time || !this.session.date
        },
        async createSession() {
                alert("Успіх")
                this.$router.push("/");
        },
    },
    // mounted() {
    //     this.getMovies();
    // },
};
</script>