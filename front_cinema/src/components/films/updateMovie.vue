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
            <button @click="updateMovie()" class="button-create-movie" type="submit" :disabled="invalidYear || invalidActors || invalidGenres || invalidDuration || invalidRating || isAnyFieldEmpty()">
              <span>Update Movie</span><i class="bx bx-arrow-back"></i>
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
        },
        validateGenres() {
            this.invalidGenres = this.movie.genres.length === 0 || this.movie.genres.some(genre => !genre.trim());
        },
        validateActors() {
            this.invalidActors = this.movie.actors.length === 0 || this.movie.actors.some(actor => !actor.trim());
        },
        validateDuration() {
            this.invalidDuration = this.movie.duration <= 0;
        },
        validateRating() {
            this.invalidRating = this.movie.rating < 0 || this.movie.rating > 10;
        },
        isAnyFieldEmpty() {
            return !this.movie.title || !this.movie.language || !this.movie.trailerLink || !this.movie.director || 
            !this.movie.description || this.movie.genres.length === 0 || this.movie.actors.length === 0 || !this.movie.photoUrl;
        },
        async updateMovie() {
            await movieAPI.updateMovie(this.movie,this.$route.params.id);
            this.$router.push("/movie/"+this.$route.params.id)
        },
        async getMovie() {
            this.movie = await movieAPI.getMovie(this.$route.params.id);
        }
    },
    mounted(){
        this.getMovie();
    }
};
</script>

<style>
</style>
