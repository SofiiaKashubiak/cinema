<template>
    <div>
        <h2>Add Ticket</h2>
        <form @submit.prevent="addTicket">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="ticketData.email" @input="validateEmail(ticketData.email)" required>
            </div>
            <div>
                <label for="emailPlace">Payer's Email:</label>
                <input type="email" v-model="newEmailPlace.email" required @change="emailCheck" @input="validateEmail(newEmailPlace.email)">
                <p v-if="emailExists">This email already exists</p>
            </div>
            <div>
                <label for="place">Place:</label>
                <input type="number" v-model="newEmailPlace.place" required>
            </div>
            <p v-if="invalidEmail">Please enter a valid email address</p>
            <p v-if="exceedsAvailableSeats">Not enough available seats</p>
            <button type="submit" :disabled="emailExists || invalidEmail || exceedsAvailableSeats || isAnyFieldEmpty()">Add Ticket</button>
        </form>
        <button type="submit" @click="buyTicket" :disabled="emailExists || invalidEmail || exceedsAvailableSeats || isAnyFieldEmpty()">Buy Tickets</button>
        <h3>Tickets</h3>
        <ul>
            <li v-for="(place, email) in ticketData.emailPlace" :key="email">
                Payer's Email: {{ email }}, Place: {{ place }}
            </li>
        </ul>
    </div>
</template>

<script>
import * as ticketAPI from '@/services/ticketAPI'
import * as sessionAPI from '@/services/sessionAPI';

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
            emailExists: false,
            invalidEmail: false,
            exceedsAvailableSeats: false,
            tickets: [],
            session: {},
        };
    },
    methods: {
        addTicket() {
            if (!this.emailExists && !this.exceedsAvailableSeats) {
                this.ticketData.emailPlace[this.newEmailPlace.email] = this.newEmailPlace.place;
                this.newEmailPlace.email = '';
                this.newEmailPlace.place = '';
            }
        },
        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.invalidEmail = !emailPattern.test(email);
        },
        emailCheck() {
            this.emailExists = Object.prototype.hasOwnProperty.call(this.ticketData.emailPlace, this.newEmailPlace.email);
        },
        isAnyFieldEmpty() {
            return !this.ticketData.email || !this.ticketData.sessionId || !this.newEmailPlace.email || !this.newEmailPlace.place;
        },
        async buyTicket() {
            if (!this.emailExists && !this.exceedsAvailableSeats) {
                alert(await ticketAPI.buyTickets(this.ticketData));
            }
        },
        async getTicketsBySessionId() {
            this.tickets = await ticketAPI.getTicketsBySessionId(this.$route.params.id);
            this.checkAvailableSeats();
        },
        async getSession() {
            this.session = await sessionAPI.getSession(this.$route.params.id);
            this.checkAvailableSeats();
        },
        checkAvailableSeats() {
            const totalSeats = this.session.quantityAvailablePlaces;
            const bookedSeats = this.tickets.reduce((sum, ticket) => sum + ticket.place, 0);
            const requestedSeats = Object.values(this.ticketData.emailPlace).reduce((sum, place) => sum + place, 0) + Number(this.newEmailPlace.place || 0);
            this.exceedsAvailableSeats = requestedSeats > (totalSeats - bookedSeats);
        }
    },
    watch: {
        'newEmailPlace.place': 'checkAvailableSeats',
        'ticketData.emailPlace': 'checkAvailableSeats'
    },
    mounted() {
        this.ticketData.sessionId = this.$route.params.id;
        this.getTicketsBySessionId();
        this.getSession();
    }
};
</script>
