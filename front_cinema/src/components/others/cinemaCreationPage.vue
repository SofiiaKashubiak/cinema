<template>
    <form @submit.prevent="createCinema()">
        Назва <input type="text" v-model="cinema.name" >
        
        location <input type="text" v-model="cinema.location" >
        
        Ряди <input type="number" v-model="cinema.quantityRows" >
        
        Кількість місць в ряду <input type="number" v-model="cinema.quantityPlacesInRow" >

        <button type="submit" :disabled="isAnyFieldEmpty()">Let's Go</button>
        <div v-if="isAnyFieldEmpty()">Do not leave fields blank</div>
    </form>
</template>

<script>
import * as cinemaAPI from '@/services/cinemaAPI'

export default {
    data() {
        return {
            cinema: {
                name: '',
                location: '',
                quantityRows: 0,
                quantityPlacesInRow: 0,
            },
        };
    },
    methods: {
        isAnyFieldEmpty() {
            return !this.cinema.name || !this.cinema.location || !this.cinema.quantityRows || !this.cinema.quantityPlacesInRow
        },
        async createCinema() {
                await cinemaAPI.createCinema(this.cinema);
                this.$router.push("/");
        },
    },
};
</script>
