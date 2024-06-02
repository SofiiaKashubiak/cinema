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
                <input type="number" v-model="newEmailPlace.place" required @input="checkPlace()" min="0" :max="this.session.quantityAvailablePlaces">
                <p v-if="placeAlreadyBooked">This place is already booked or in your current order</p>
            </div>
            <p v-if="invalidEmail">Please enter a valid email address</p>
            <p v-if="exceedsAvailableSeats">Not enough available seats</p>
            <button type="submit" :disabled="emailExists || invalidEmail || exceedsAvailableSeats || placeAlreadyBooked || isAnyFieldEmpty()">Add Ticket</button>
        </form>
        <button type="submit" @click="buyTicket" :disabled="isEmailPlaceEmpty()">Buy Tickets</button>
        <h3>Tickets</h3>
        <ul>
            <li v-for="(place, email) in ticketData.emailPlace" :key="email">
                Payer's Email: {{ email }}, Place: {{ place }}
            </li>
        </ul>
        <h3>Available Seats (White available, Grey unavailable)</h3>
        <div>
            <span v-for="seat in totalSeats" :key="seat">
                <span v-if="!isBooked(seat)" :style="{ color: 'white' }">
                     {{ seat + " " }}
                </span>
                <span v-if="isBooked(seat)" :style="{ color: 'grey' }">
                    {{ seat + " " }}
                </span>
            </span>
        </div>
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
            placeAlreadyBooked: false,
            tickets: [],
            session: {},
            totalSeats: []
        };
    },
    methods: {
        addTicket() {
            if (!this.emailExists && !this.exceedsAvailableSeats && !this.placeAlreadyBooked) {
                this.ticketData.emailPlace[this.newEmailPlace.email] = this.newEmailPlace.place;
                this.newEmailPlace.email = '';
                this.newEmailPlace.place = '';
                this.updateSeats();
            }
        },
        checkPlace() {
            this.placeAlreadyBooked = this.isBooked(this.newEmailPlace.place) || Object.values(this.ticketData.emailPlace).includes(this.newEmailPlace.place);
        },
        isEmailPlaceEmpty() {
            return Object.keys(this.ticketData.emailPlace).length === 0;
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
            if (!this.emailExists && !this.exceedsAvailableSeats && !this.placeAlreadyBooked && !this.isEmailPlaceEmpty()) {
                alert(await ticketAPI.buyTickets(this.ticketData));
            }
        },
        async getTicketsBySessionId() {
            this.tickets = await ticketAPI.getTicketsBySessionId(this.$route.params.id);
            this.updateSeats();
        },
        async getSession() {
            this.session = await sessionAPI.getSession(this.$route.params.id);
            this.updateSeats();
        },
        updateSeats() {
            const bookedSeats = this.tickets.map(ticket => ticket.place);
            const availableSeats = Array.from({ length: this.session.quantityAvailablePlaces }, (_, i) => i + 1);
            this.totalSeats = availableSeats.filter(seat => !bookedSeats.includes(seat)).concat(bookedSeats);
        },
        isBooked(seat) {
            return this.tickets.some(ticket => ticket.place === seat);
        }
    },
    mounted() {
        this.ticketData.sessionId = this.$route.params.id;
        this.getTicketsBySessionId();
        this.getSession();
    }
};


</script>
