<template>
  <div class="session_background">  </div>
  <div class="parent-container-8">
    <div class="session-film-container">
      <div class="session_container-2">
        <div class="session-form">
          <h2>Movies</h2>
          <div class="title-session-page">
            {{ movie.title }}
          </div>
          <div class="details-session-page">
            {{ formattedDate }} | {{ session.time }}
          </div>
          <div class="price-session-page">
            {{ session.price }}$
          </div>
          <div class="discount-session-page">
            {{ session.discount }}%
          </div>
          <div class="available-place-session-page">
            Available place: {{ session.quantityAvailablePlaces }}
          </div>
        <router-link :to="{name: 'BuyTicket', params: {id: this.session._id}}">
          <button class="buy_ticket_button">
            <span>Buy Ticket</span><i class="bx bx-arrow-back"></i>
          </button>
        </router-link>
        <router-link :to="{name: 'UpdateSession', params: {id: this.session._id}}" v-if="isAdmin()">
          <button class="update_session_button">Update</button>
        </router-link>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
import * as sessionAPI from '@/services/sessionAPI';
import * as movieAPI from '@/services/movieAPI';

export default {
  data() {
    return {
      session: {},
      movie: {},
      response: [],
    };
  },
  computed: {
    formattedDate() {
      if (!this.session.date) return '';
      const date = new Date(this.session.date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(2);
      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    async getSession() {
      this.response = await sessionAPI.getSession(this.$route.params.id);
      if (this.response != null) {
        this.session = this.response;
        this.movie = await movieAPI.getMovie(this.response.movieId);
      }
    },
    isAdmin() {
      return localStorage.getItem('isAdmin');
    },
  },
  mounted() {
    this.getSession();
  },
};
</script>

<style>
.session_background {
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  gap: 0;
  background-image: url('@/assets/session_background.png');
  display: flex;
  justify-content: center;
  align-items: center;
}
.parent-container-8 {
  position: fixed;
  top: 25px;
  left: -223px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.session_container-2 {
  width: 654px;
  height: 627px;
  position: relative;
  margin-top: 9%;
  left: -100px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(44px);
  border-radius: 40px;
  opacity: 1;
}
h2{
  position: fixed;
  width: 95px;
  height: 41px;
  top: 0;
  left: 40px;
  gap: 0px;
  opacity: 0px;
  angle: -0 deg;
  font-family: Cormorant Garamond;
  font-size: 34px;
  font-weight: 400;
  line-height: 41.17px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.title-session-page{
  position: fixed;
  width: 489px;
  height: 41px;
  top: 82px;
  left: 40px;
  gap: 0px;
  opacity: 0px;
  angle: -0 deg;
  font-family: Cormorant Garamond;
  font-size: 45px;
  font-weight: 700;
  line-height: 54.5px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.details-session-page{
  width: 537px;
  height: 47px;
  position: fixed;
  top: 180px;
  left: 40px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant Garamond;
  font-size: 39px;
  font-weight: 400;
  line-height: 47.23px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.price-session-page{
  width: 143.89px;
  height: 61px;
  gap: 0px;
  opacity: 0px;
  position: fixed;
  top: 280px;
  left: 40px;
  font-family: Cormorant Garamond;
  font-size: 50px;
  font-weight: 400;
  line-height: 60.55px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.discount-session-page{
  width: 143.89px;
  height: 61px;
  gap: 0px;
  opacity: 0px;
  position: fixed;
  top: 285px;
  left: 240px;
  font-family: Cormorant Garamond;
  font-size: 50px;
  font-weight: 700;
  line-height: 60.55px;
  text-align: left;
  color: rgba(235, 210, 168, 1);
}
.available-place-session-page{
  width: 537px;
  height: 61px;
  gap: 0px;
  opacity: 0px;
  position: fixed;
  top: 390px;
  left: 40px;
  font-family: Cormorant Garamond;
  font-size: 50px;
  font-weight: 400;
  line-height: 60.55px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.buy_ticket_button{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 300px;
  height: 52px;
  top: 490px;
  left: 294px;
  border: none;
  border-radius: 30px;
  background: rgba(79, 15, 134, 1);
  font-family: Cormorant Garamond;
  margin: 5px;
  font-size: 36px;
  font-weight: 600;
  line-height: 43.6px;
  text-align: center;
  color: #FFFFFF;
}
.update_session_button{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 300px;
  height: 32px;
  top: 570px;
  left: 294px;
  border: none;
  border-radius: 30px;
  background: rgba(96, 53, 161, 1);
  font-family: Cormorant Garamond;
  margin: 5px;
  font-size: 26px;
  font-weight: 600;
  line-height: 43.6px;
  text-align: center;
  color: #FFFFFF;
}
</style>
