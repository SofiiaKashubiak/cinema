<template>
  <div class="create_session_background"></div>
  <div class="parent-container-4">
    <div class="create_session-container">
      <div class="session_container">
        <div class="session-form">
          <div class="input-box-login">
            <label for="movie-select" class="label-movie-select">Select Movie</label>
            <select v-model="session.movieId" class="movie-select" @change="validateMovieId" required>
              <option value="" disabled></option>
              <option v-for="option in movies" :key="option._id" :value="option._id">
                {{ option.title }}
              </option>
            </select>
          </div>
          <div class="input-box-login">
            <label for="cinema-select" class="label-cinema-select">Select Cinema</label>
            <select v-model="session.cinemaId" class="cinema-select" @change="validateCinemaId" required>
              <option value="" disabled></option>
              <option v-for="option in cinemas" :key="option._id" :value="option._id">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="input-box-login">
            <input type="date" v-model="session.date" id="date-session" @input="validateDate" required>
            <label for="date_session" class="label-date-session">Date</label>
            <div v-if="invalidDate" class="error-message-date-create-session">Date must be between May 21, 2000, and May 21, 2030</div>
          </div>
          <div class="input-box-login">
            <input type="time" v-model="session.time" id="time-session" @input="validateTime" required>
            <label for="time_session" class="label-time-session">Time</label>
          </div>
          <div class="input-box-login">
            <input type="number" v-model="session.price" id="price-session" @input="validatePrice" required>
            <label for="price_session" class="label-price-session">Price</label>
            <div v-if="invalidPrice" class="error-message-price-create-session">Valid price is required</div>
          </div>
          <div class="input-box-login">
            <input type="number" v-model="session.discount" id="discount-session" @input="validateDiscount" required>
            <label for="discount_session" class="label-discount-session">Discount</label>
            <div v-if="invalidDiscount" class="error-message-discount-create-session">Valid discount is required</div>
          </div>
          <div class="input-box-login">
            <input type="number" v-model="session.quantityAvailablePlaces" id="places-session" @input="validateQuantityAvailablePlaces" required>
            <label for="places_session" class="label-places-session">Quantity Available Places</label>
            <div v-if="invalidQuantityAvailablePlaces" class="error-message-quantity-create-session">Valid quantity of available places is required</div>
          </div>
          <div class="input-box-login">
            <button type="submit" class="button-create-session" @click="updateSession()" :disabled="isAnyFieldEmpty() || invalidDate || invalidPrice || invalidDiscount || invalidQuantityAvailablePlaces">
              <span>Update Session</span><i class="bx bx-arrow-back"></i>
            </button>
            <div v-if="isAnyFieldEmpty()" class="error-message-fields-create-session">Do not leave fields blank</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';
import * as cinemaAPI from '@/services/cinemaAPI';
import * as sessionAPI from '@/services/sessionAPI';

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
        async getCinemas() {
            this.cinemas = await cinemaAPI.getAllCinemas();
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
        async updateSession() {
            sessionAPI.updateSession(this.session,this.$route.params.id);
            this.$router.push("/session/"+this.$route.params.id);
        },
        async getSession() {
            this.session = await sessionAPI.getSession(this.$route.params.id);
        }
    },
    mounted() {
         this.getMovies();
         this.getCinemas();
         this.getSession();
    },
};
</script>


<style>
.create_session_background {
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  gap: 0;
  background-image: url('@/assets/session_creation_background.png');
}
.parent-container-4 {
  position: fixed;
  top: 25px;
  left: -210px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.session_container {
  width: 776px;
  height: 695px;
  position: relative;
  margin-top: 5%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(34px);
  border-radius: 40px;
  opacity: 1;
}
.label-movie-select{
  position: absolute;
  top: 40px;
  left: 38px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.movie-select{
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  background: transparent;
  outline: none;
  margin-top: 90px;
  margin-left: -450px;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
  font-family: Cormorant Garamond;
  width: 248px;
  font-size: 26px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}
.movie-select option {
  background: transparent;
  color: rgba(255, 255, 255, 1);
  padding: 10px;
  justify-content: space-between;
}
.label-cinema-select{
  position: absolute;
  top: 40px;
  left: 440px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.cinema-select{
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  background: transparent;
  outline: none;
  margin-top: -35px;
  margin-left: 350px;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
  font-family: Cormorant Garamond;
  width: 248px;
  font-size: 26px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}
.cinema-select option {
  background: transparent;
  color: rgba(255, 255, 255, 1);
  padding: 10px;
  justify-content: space-between;
}

.label-date-session{
  position: absolute;
  top: 170px;
  left: 38px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.label-time-session{
  position: absolute;
  top: 170px;
  left: 440px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#date-session{
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  background: transparent;
  outline: none;
  margin-top: 110px;
  margin-left: -450px;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
  font-family: Cormorant Garamond;
  width: 248px;
  font-size: 26px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}
#time-session{
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  background: transparent;
  outline: none;
  margin-top: -38px;
  margin-left: 350px;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
  font-family: Cormorant Garamond;
  width: 248px;
  font-size: 26px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}
.label-price-session{
  position: absolute;
  top: 330px;
  left: 38px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.label-discount-session{
  position: absolute;
  top: 330px;
  left: 440px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#price-session{
  position: fixed;
  width: 248px;
  top: 395px;
  left: 38px;
  height: 23px;
  background: transparent !important;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
#discount-session{
  position: fixed;
  width: 248px;
  top: 395px;
  left: 440px;
  height: 23px;
  background: transparent !important;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.label-places-session{
  position: absolute;
  top: 485px;
  left: 38px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#places-session{
  position: fixed;
  width: 645px;
  top: 560px;
  left: 38px;
  height: 23px;
  background: transparent !important;
  outline: none;
  font-weight: 500;
  font-size: 26px;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, 1);
  font-family: 'Cormorant Garamond', serif;
}
.button-create-session{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 490px;
  height: 52px;
  top: 620px;
  left: 130px;
  border: none;
  border-radius: 30px;
  background: rgba(119, 21, 174, 1);
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.91px;
  text-align: center;
  color: #FFFFFF;
}
.error-message-fields-create-session {
  position: absolute;
  top: -28px;
  left: -22px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-quantity-create-session {
  position: absolute;
  top:580px;
  left: -22px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-discount-create-session {
  position: absolute;
  top:420px;
  left: 175px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-price-create-session {
  position: absolute;
  top:420px;
  left: -225px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-date-create-session {
  position: absolute;
  top:270px;
  left: -225px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
</style>