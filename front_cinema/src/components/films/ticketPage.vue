<template>
    <div>
        <h2>Add Ticket</h2>
        <form @submit.prevent="addTicket">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="ticketData.email" required>
            </div>
            <div>
                <label for="emailPlace">Payer's Email:</label>
                <input type="email" v-model="newEmailPlace.email" required>
            </div>
            <div>
                <label for="place">Place:</label>
                <input type="number" v-model="newEmailPlace.place" required>
            </div>
            <button type="submit">Add Ticket</button>
        </form>
        <button type="submit" @click="buyTicket()">Buy Tickets</button>
        <h3>Tickets</h3>
        <ul>
            <li v-for="(place, index) in ticketData.emailPlace" :key="index">
                Payer's Email: {{ place.email }}, Place: {{ place.place }}
            </li>
        </ul>
    </div>
</template>
<script>
import * as ticketAPI from '@/services/ticketAPI'

export default {
    data() {
        return {
            ticketData: {
                sessionId: '',
                email: '',
                emailPlace: {}
            },
            newEmailPlace: {
                email: '',
                place: ''
            },
            emailExists: false // флаг для перевірки наявності електронної пошти
        };
    },
    methods: {
        addTicket() {
            if (Object.prototype.hasOwnProperty.call(this.ticketData.emailPlace, this.newEmailPlace.email)) {
                // Якщо електронна пошта вже існує, встановлюємо флаг на true
                this.emailExists = true;
            } else {
                this.emailExists = false;
                // Якщо електронна пошта ще не існує, додаємо новий об'єкт до emailPlace
                this.ticketData.emailPlace[this.newEmailPlace.email] = this.newEmailPlace.place;
                this.newEmailPlace.email = '';
                this.newEmailPlace.place = '';
            }
        },
        async buyTicket() {
            if (this.emailExists) {
                // Якщо флаг emailExists true, показуємо повідомлення про існуючу електронну пошту
                alert('This email already exists in the ticket list.');
                // Скидаємо флаг і забороняємо відправку
                this.emailExists = false;
            } else {
                // Якщо флаг emailExists false, відправляємо дані на сервер
                alert(await ticketAPI.buyTickets(this.ticketData));
            }
        }
    },
    mounted() {
        this.ticketData.sessionId = this.$route.params.id;
    }
};
</script>
