<template>
  <div class="session_background">
    <div class="form_container">
      <form @submit.prevent="addTicket" class="ticket_form">
        <div class="form_group">
          <label for="email">Email:</label>
          <input type="email" v-model="ticketData.email" @input="validateEmail(ticketData.email)" required>
        </div>
        <div class="form_group">
          <label for="emailPlace">Payer's Email:</label>
          <input type="email" v-model="newEmailPlace.email" required @change="emailCheck" @input="validateEmail(newEmailPlace.email)">
          <p v-if="emailExists" class="error_message">This email already exists</p>
        </div>
        <div class="form_group">
          <label for="place">Place:</label>
          <input type="number" v-model="newEmailPlace.place" required @input="checkPlace" min="0" :max="session.quantityAvailablePlaces">
          <p v-if="placeAlreadyBooked" class="error_message">This place is already booked or in your current order</p>
        </div>
        <p v-if="invalidEmail" class="error_message">Please enter a valid email address</p>
        <p v-if="exceedsAvailableSeats" class="error_message">Not enough available seats</p>
        <div class="button_container">
          <button type="submit" :disabled="emailExists || invalidEmail || exceedsAvailableSeats || placeAlreadyBooked || isAnyFieldEmpty()" class="submit_button">Add Ticket</button>
          <button @click="buyTicket" :disabled="isEmailPlaceEmpty()" class="submit_button">Buy Tickets</button>
        </div>
      </form>
      <ul class="ticket_list">
        <li v-for="(place, email) in ticketData.emailPlace" :key="email">
          Payer's Email: {{ email }}, Place: {{ place }}
        </li>
      </ul>
      <h3>Available Seats (White available, Grey unavailable)</h3>
      <div class="seats_display">
        <span v-for="seat in totalSeats" :key="seat" :class="{ available: !isBooked(seat), unavailable: isBooked(seat) }">
          {{ seat }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as ticketAPI from '@/services/ticketAPI';
import * as sessionAPI from '@/services/sessionAPI';
import { buyTickets } from '@/services/stripe';

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
        await buyTickets(this.ticketData.email, this.ticketData.sessionId, this.ticketData.emailPlace);
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
<style>
.session_background {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/session_background.png');
}

.form_container {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(44px);
  padding: 20px;
  height: 580px;
  border-radius: 40px;
  color: white;
  width: 60%;
  max-width: 500px;
  text-align: center;
  margin-left: 90px;
  margin-top: 70px;
}

.ticket_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.form_group {
  width: 100%;
  text-align: left;
}

.form_group label {
  display: block;
  margin-bottom: 5px;
  font-family: Cormorant Garamond;
  font-size: 34px;
  font-weight: 400;
  line-height: 41.17px;
  text-align: left;
  color: #FFFFFF;
}

.form_group input {
  width: 100%;
  border: none;
  border-bottom: 2px solid white;
  outline: none;
  background: transparent;
  color: white;
}

.error_message {
  color: white;
  position: fixed;
  font-size: 14px;
  top: 260px;
}

.button_container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
}

.submit_button {
  background: rgba(79, 15, 134, 1);
  border-radius: 30px;
  color: white;
  border: none;
  font-family: Cormorant Garamond;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 30px;
}


.ticket_list {
  list-style-type: none;
  padding: 15px;
  font-family: Cormorant Garamound;
}

.seats_display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  font-family: Cormorant Garamond;
  font-size: 18px;
  line-height: 34.5px;
  text-align: left;

}
h3{
  font-family: Cormorant Garamond;
  font-size: 20px;
  font-weight: 800;
  line-height: 54.5px;
  text-align: center;

}

.seats_display span {
  padding: 3px;
  font-size: 18px;
  font-family: Cormorant Garamound;
}

.available {
  color: white;
}

.unavailable {
  color: grey;
}
</style>
