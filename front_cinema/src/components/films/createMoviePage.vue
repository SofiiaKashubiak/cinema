<template>
  <div class="create_movie_background"></div>
  <div class="parent-container-2">
    <div class="upload_image_container">
      <img src="@/assets/upload_photo_image.png" class="upload_photo">
    </div>
    <div class="create_movie-container">
      <div class="movie_container">
        <div class="form-title-movie">
          <span>CREATE MOVIE</span>
        </div>
        <div class="movie-form">
          <div class="input-box-login">
            <input type="text" autocomplete="new-photo" id="photo_movie" v-model="movie.photoUrl" @input="isAnyFieldEmpty" required>
            <label for="photo_movie" class="label-photo-movie">Upload Photo</label>
          </div>
          <div class="input-box-login">
            <input type="text" autocomplete="new-title" id="title_movie" v-model="movie.title" @input="isAnyFieldEmpty" required>
            <label for="title_movie" class="label-title-movie">Title</label>
          </div>
          <div class="input-box-login">
            <input type="number"  id="year_movie" v-model="movie.year" @input="validateYear" required>
            <label for="year_movie" class="label-year-movie">Year</label>
            <div v-if="invalidYear" class="error-message-year-movie">Year must be a valid number from 2001 to 2024</div>
          </div>
          <div class="input-box-login">
            <input type="text" autocomplete="new-description" id="description_movie" v-model="movie.description" @input="isAnyFieldEmpty" required>
            <label for="description_movie" class="label-description-movie">Description</label>
          </div>
          <div class="input-box-login">
            <input type="text" autocomplete="new-language" id="language_movie" v-model="movie.language" @input="isAnyFieldEmpty" required>
            <label for="language_movie" class="label-language-movie">Language</label>
          </div>
          <div class="input-box-login">
            <input type="text" autocomplete="new-director" id="director_movie" v-model="movie.director" @input="isAnyFieldEmpty" required>
            <label for="director_movie" class="label-director-movie">Director</label>
          </div>
          <div class="input-box-login">
            <input type="number" autocomplete="new-duration" id="duration_movie" v-model="movie.duration" @input="validateDuration" required>
            <label for="duration_movie" class="label-duration-movie">Duration</label>
            <div v-if="invalidDuration" class="error-message-duration-movie">Duration must be a valid number</div>
          </div>
          <div class="input-box-login">
            <input type="text" autocomplete="new-link-trailer" id="link_trailer_movie" v-model="movie.trailerLink" @input="isAnyFieldEmpty" required>
            <label for="link_trailer_movie" class="label-link_trailer_movie">Trailer Link</label>
          </div>
          <div class="input-box-login">
            <input type="number" autocomplete="new-rating" id="rating_movie" v-model="movie.rating" @input="validateRating" required>
            <label for="rating_movie" class="label-rating_movie">Rating</label>
            <div v-if="invalidRating" class="error-message-rating-movie">Rating must be a valid number</div>
          </div>
          <div class="input-box-login">
            <label for="genre-movie" class="label-genre_movie">Genre</label>
            <div class="genre-movie-container">
              <div v-for="(genre, index) in movie.genres" :key="index" class="genre-select-container">
                <select v-model="movie.genres[index]" required class="genre-select">
                  <option v-for="option in genreOption" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
            <button class="button-remove-genre" type="button" @click="removeGenre(index)">
              <span>Remove</span>
            </button>
            <button type="button" class="button-add-genre" @click="addGenre">
              <span>Add Genre</span>
            </button>
            <div v-if="invalidGenres" class="error-message-genre-movie" >At least one genre is required</div>
          </div>
          <div class="input-box-login">
            <label for="actors-movie" class="label-actors_movie">Actors</label>
            <div class="actors-movie-container">
              <div v-for="(actor, index) in movie.actors" :key="index" >
                <input type="text" class="actor-input-container" v-model="movie.actors[index]" @input="validateActors" required />
                <button type="button" class="button-remove-actor" @click="removeActor(index)">Remove</button>
              </div>
            </div>
            <button type="button" class="button-add-actor" @click="addActor">Add Actor</button>
            <div v-if="invalidActors" class="error-message-actor-movie">At least one actor is required</div>
          </div>
          <div class="input-box-profile">
          <button @click="createMovie" class="button-create-movie" type="submit" :disabled="invalidYear || invalidActors || invalidGenres || invalidDuration || invalidRating || isAnyFieldEmpty()">
            <span>Create Movie</span><i class="bx bx-arrow-back"></i>
          </button>
          <div v-if="isAnyFieldEmpty()" class="error-message-fields-create-movie">Do not leave fields blank</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as movieAPI from '@/services/movieAPI';

export default {
    data() {
        return {
            movie: {
                title: '',
                year: 0,
                genres: [],
                language: '',
                trailerLink: '',
                actors: [],
                director: '',
                duration: 0,
                rating: 0,
                description: '',
                photoUrl: '',  
            },
            genreOption: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Thriller"],
            previewUrl: null,  
            invalidYear: false,
            invalidGenres: false,
            invalidActors: false,
            invalidDuration: false,
            invalidRating: false,
        };
    },
    methods: {
        addGenre() {
            this.movie.genres.push("");
        },
        removeGenre(index) {
            this.movie.genres.splice(index, 1);
        },
        addActor() {
            this.movie.actors.push("");
        },
        removeActor(index) {
            this.movie.actors.splice(index, 1);
        },
        validateYear() {
            this.invalidYear = this.movie.year <= 2000 || this.movie.year >= 2025;
            if(this.movie.year <= 2000) this.movie.year = 2001;
            if(this.movie.year >= 2025) this.movie.year = 2024;
        },
        validateGenres() {
            this.invalidGenres = this.movie.genres.length === 0 || this.movie.genres.some(genre => !genre.trim());
        },
        validateActors() {
            this.invalidActors = this.movie.actors.length === 0 || this.movie.actors.some(actor => !actor.trim());
        },
        validateDuration() {
            this.invalidDuration = this.movie.duration <= 0;
            if(this.movie.duration <= 0) this.movie.duration = 1;
        },
        validateRating() {
            this.invalidRating = this.movie.rating < 0 || this.movie.rating > 10;
        },
        isAnyFieldEmpty() {
            return !this.movie.title || !this.movie.language || !this.movie.trailerLink || !this.movie.director || 
            !this.movie.description || this.movie.genres.length === 0 || this.movie.actors.length === 0 || !this.movie.photoUrl;
        },
        async createMovie() {
            await movieAPI.createMovie(this.movie);
            this.$router.push("/");
        },
    },
};
</script>

<style>
.parent-container-2 {
  position: fixed;
  top: 25px;
  left: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.create_movie_background{
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  gap: 0;
  background-image: url('@/assets/movie_background.png');
}
.movie_container {
  width: 750px;
  height: 639px;
  position: relative;
  margin-top: 9%;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(44px);
  border-radius: 40px;
  opacity: 1;
}
.upload_image_container {
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
.form-title-movie{
  position: absolute;
  z-index: 5;
  width: 490px;
  height: 78px;
  top: -67px;
  left: -470px;
  gap: 0;
  font-family: Cormorant SC, serif;
  font-size: 58px;
  font-weight: 700 !important;
  line-height: 77.5px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
.upload_photo{
  position: absolute;
  top: 50px;
  left: 23px;
}

#photo_movie{
  position: absolute;
  width: 378px;
  top: 520px;
  left: -429px;
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
.label-photo-movie{
  position: absolute;
  top: 460px;
  left: -429px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}

#title_movie{
  position: fixed;
  width: 310px;
  top: 40px;
  left: 34px;
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
.label-title-movie{
  position: fixed;
  top: 10px;
  left: 34px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#year_movie{
  position: fixed;
  width: 310px;
  top: 40px;
  left: 400px;
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
.label-year-movie{
  position: fixed;
  top: 10px;
  left: 400px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#description_movie{
  position: fixed;
  width: 310px;
  top: 140px;
  left: 34px;
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
.label-description-movie{
  position: fixed;
  top: 100px;
  left: 34px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#language_movie{
  position: fixed;
  width: 310px;
  top: 140px;
  left: 400px;
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
.label-language-movie{
  position: fixed;
  top: 100px;
  left: 400px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#director_movie{
  position: fixed;
  width: 310px;
  top: 250px;
  left: 34px;
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
.label-director-movie{
  position: fixed;
  top: 210px;
  left: 34px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#duration_movie{
  position: fixed;
  width: 310px;
  top: 250px;
  left: 400px;
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
.label-duration-movie{
  position: fixed;
  top: 210px;
  left: 400px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#link_trailer_movie{
  position: fixed;
  width: 310px;
  top: 370px;
  left: 34px;
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
.label-link_trailer_movie{
  position: fixed;
  top: 325px;
  left: 34px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#rating_movie{
  position: fixed;
  width: 310px;
  top: 370px;
  left: 400px;
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
.label-rating_movie{
  position: fixed;
  top: 325px;
  left: 400px;
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.label-genre_movie{
  position: fixed;
  top: 441px;
  left: 34px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.genre-select-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.genre-movie-container{
  display: flex;
  max-width: 292px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  top: 445px;
  left: 120px;
  position: absolute;
}
.genre-select{
  border: 2px solid rgba(255, 255, 255, 1);
  border-radius: 25px;
  background: transparent;
  outline: none;
  color: rgba(255, 255, 255, 1);
  margin-right: 10px;
  transition: all 0.3s ease;
  font-family: Cormorant Garamond;
  font-size: 20px;
  font-weight: 200;
  line-height: 20px;
  text-align: left;
}
.genre-select-container {
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
}

.genre-select option {
  background: transparent;
  color: rgba(255, 255, 255, 1);
  padding: 10px;
  justify-content: space-between;
}

.button-add-genre{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 143px;
  height: 30px;
  top: 447px;
  left: 570px;
  border: none;
  border-radius: 30px;
  background: rgba(229, 69, 224, 0.15);
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.91px;
  text-align: center;
  color: #FFFFFF;
}
.button-remove-genre{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 116.9px;
  height: 30px;
  top: 447px;
  left: 430px;
  border: none;
  border-radius: 30px;
  background: rgba(210, 133, 207, 0.15);
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.91px;
  text-align: center;
  color: #FFFFFF;
}
.label-actors_movie{
  position: fixed;
  top: 521px;
  left: 34px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 33.91px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.actors-movie-container{
  display: flex;
  max-width: 345px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  top: 515px;
  left: 210px;
  position: absolute;
}
.actor-input-container{
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 1);
  background: transparent !important;;
  outline: none;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease;
  font-family: Cormorant Garamond;
  font-size: 20px;
  font-weight: 200;
  line-height: 20px;
  text-align: left;
  margin: 12px;
}
.button-remove-actor{
  align-items: center;
  justify-content: center;
  width: 117px;
  border: none;
  border-radius: 30px;
  background: rgba(210, 133, 207, 0.15);
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.91px;
  text-align: center;
  color: #FFFFFF;
}
.button-add-actor{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 143px;
  height: 30px;
  top: 523px;
  left: 570px;
  border: none;
  border-radius: 30px;
  background: rgba(229, 69, 224, 0.15);
  font-family: Cormorant Garamond;
  font-size: 28px;
  font-weight: 600;
  line-height: 33.91px;
  text-align: center;
  color: #FFFFFF;
}
.button-create-movie{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 300px;
  height: 36px;
  top: 590px;
  left: 230px;
  border: none;
  border-radius: 30px;
  background: rgba(155, 34, 154, 0.6);
  font-family: Cormorant Garamond, serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  color: #FFFFFF;
}
.error-message-fields-create-movie {
  position: absolute;
  top: -36px;
  left: -12px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-actor-movie {
  position: absolute;
  top: 558px;
  left: 260px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-genre-movie {
  position: absolute;
  top: 482px;
  left: 260px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-rating-movie {
  position: absolute;
  top: 395px;
  left: 190px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-duration-movie {
  position: absolute;
  top: 273px;
  left: 190px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
.error-message-year-movie {
  position: absolute;
  top: 63px;
  left: 170px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
</style>
