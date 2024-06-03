<template>
  <div class="movie_page_background"></div>
  <div class="parent-container-7">
    <div class="upload_image_container">
      <img :src="this.movie.photoUrl" class="image_movie_photo">
    </div>
    <div class="movie-film-container">
      <div class="movie_container-2">
        <div class="movie-form">
          <div class="title-movie-page">
            {{ movie.title }}
          </div>
          <div v-for="(ses, index) in session" :key="index" class="date-time-movie-page">
            <router-link :to="{ name: 'SessionDetails', params: {id: ses._id}}" class="date-link">
              {{ formatDate(ses.date) }}
            </router-link>
          </div>
          <div class="duration-movie-page">
             | {{ movie.duration }} hours duration
          </div>
          <div class="year-movie-page">
            {{ movie.year }} is the year the film was released
          </div>
          <div class="language-movie-page">
            {{ movie.language }}
          </div>
          <div class="description-label-movie-page">
            About
          </div>
          <div class="description-movie-page">
            {{ movie.description }}
          </div>
          <div class="genre-movie-page">
            {{ movie.genre }}
            <span v-for="(genre, index) in movie.genres" :key="index" class="genre-row">
              {{ genre }}
            </span>
          </div>
          <div class="director-movie-page">
            Director: {{ movie.director }}
          </div>
          <div class="rating-movie-page">
            {{ movie.rating }} /10
          </div>
          <div class="update-movie-movie-page">
            <router-link :to="{name: 'UpdateMovie', params: {id: this.movie._id}}" v-if="isAdmin()" class="date-link update-movie-movie-page">
              Update
            </router-link>
          </div>
          <div class="trailer-movie-page">
            <a :href="movie.trailerLink" target="_blank" rel="noopener noreferrer" class="date-link">Trailer Link</a>
          </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
import * as movieAPI from '@/services/movieAPI';
import * as sessionAPI from '@/services/sessionAPI';

export default {
  data() {
    return {
      movie: {},
      response: [],
      session: []
    };
  },
  methods: {
    async getMovie() {
      this.response = await movieAPI.getMovie(this.$route.params.id);
      if (this.response != null) {
        this.movie = this.response;
      }
    },
    async getAllSession() {
      const allSessions = await sessionAPI.getAllSessions();
      if (allSessions != null) {
        this.session = allSessions.filter(session => session.movieId === this.movie._id);
      }
    },
    isAdmin() {
      return localStorage.getItem("isAdmin");
    },
    formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    }
  },
  mounted() {
    this.getMovie();
    this.getAllSession();
  }
};
</script>

<style>
.movie_page_background {
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  gap: 0;
  background-image: url('@/assets/movie_page_background.png');
}
.parent-container-7 {
  position: fixed;
  top: 25px;
  left: 23px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.upload_image_container {
  z-index: 10;
  width: 90%;
  max-width: 437px;
  height: 639px;
  margin-top: 5%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(44px);
  border-radius: 40px;
  opacity: 1;
}
.image_movie_photo {
  width: 380px;
  height: 580px;
  position: absolute;
  border-radius: 40px;
  top: 38px;
  left: 25px;
}
.movie_container-2 {
  width: 767px;
  height: 616px;
  position: relative;
  margin-top: 9%;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(44px);
  border-radius: 40px;
  opacity: 1;
}
.title-movie-page {
  width: 622px;
  height: 47px;
  padding-top: 14px;
  padding-left: 40px;
  font-family: Cormorant;
  font-size: 40px;
  font-weight: 700;
  line-height: 48.44px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.date-time-movie-page,
.year-movie-page,
.language-movie-page,
.description-label-movie-page,
.description-movie-page,
.genre-movie-page,
.director-movie-page,
.rating-movie-page,
.trailer-movie-page {
  position: relative;
}

.duration-movie-page{
  width: 331.76px;
  height: 43.96px;
  top: 85px;
  padding-left: 190px;
  gap: 0px;
  position: relative;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 700;
  line-height: 36.33px;
  text-align: left;
  color: rgba(235, 210, 168, 1) !important;
}
.date-time-movie-page {
  cursor: pointer;
  height: 43.96px;
  position: fixed;
  top: 85px;
  left: 42px;
  gap: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 700;
  line-height: 36.33px;
  text-align: left;
}
.year-movie-page{
  width: 440px;
  height: 43.96px;
  position: fixed;
  top: 145px;
  left: 42px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 400;
  line-height: 36.33px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.language-movie-page{
  width: 440px;
  height: 43.96px;
  position: fixed;
  top: 205px;
  left: 42px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 400;
  line-height: 36.33px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.description-label-movie-page{
  width: 440px;
  height: 43.96px;
  position: fixed;
  top: 275px;
  left: 42px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 22px;
  font-weight: 400;
  line-height: 26.64px;
  text-align: left;
  color: rgba(235, 210, 168, 1);
}
.description-movie-page{
  width: 677px;
  height: 108px;
  position: fixed;
  top: 294px;
  left: 42px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 400;
  line-height: 36.33px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.genre-movie-page{
  width: 677px;
  height: 108px;
  position: fixed;
  top: 430px;
  left: 42px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 600;
  line-height: 36.33px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.genre-row {
  margin-right: 14px;
}
.director-movie-page{
  width: 677px;
  height: 108px;
  position: fixed;
  top: 490px;
  left: 42px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 600;
  line-height: 36.33px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.rating-movie-page{
  width: 96px;
  height: 36px;
  position: fixed;
  top: 545px;
  left: 42px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 30px;
  font-weight: 400;
  line-height: 36.33px;
  text-align: left;
  color: rgba(235, 210, 168, 1) ;
}
.trailer-movie-page{
  width: 200px;
  height: 36px;
  position: fixed;
  top: 547px;
  left: 242px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 25px;
  font-weight: 400;
  line-height: 36.33px;
  text-align: left;
  color: rgba(235, 210, 168, 1) ;
}
.update-movie-movie-page {
  width: 200px;
  height: 36px;
  position: relative;
  top: 50px; !important;
  left: 242px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 25px;
  font-weight: 400;
  line-height: 36.33px;
  text-align: left;
  color: rgba(235, 210, 168, 1);
}

.date-link {
  cursor: pointer;
  color: rgba(235, 210, 168, 1) !important;
}
</style>
