<template>
  <div class="create_cinema_background"></div>
  <div class="parent-container-3">
    <div class="create_cinema-container">
      <div class="cinema_container">
        <div class="form-title-cinema">
          <span>CREATE CINEMA</span>
        </div>
        <div class="cinema-form">
          <div class="input-box-login">
            <input type="text" autocomplete="new-name" id="name_cinema" v-model="cinema.name">
            <label for="name_cinema" class="label-name-cinema">Name of cinema</label>
          </div>
          <div class="input-box-login">
            <input type="text" autocomplete="new-location" id="location_cinema" v-model="cinema.location">
            <label for="location_cinema" class="label-location-cinema">Location</label>
          </div>
          <div class="input-box-login">
            <input type="number" autocomplete="new-rows" id="rows_cinema" v-model="cinema.quantityRows">
            <label for="location_cinema" class="label-rows-cinema">Rows</label>
          </div>
          <div class="input-box-login">
            <input type="number" autocomplete="new-amount" id="amount_rows_cinema" v-model="cinema.quantityPlacesInRow">
            <label for="amount_rows_cinema" class="label-amount-rows-cinema">Amount of seats in a row</label>
          </div>
          <div class="input-box-login">
            <button type="submit" class="button-create-cinema"@click="createCinema" :disabled="isAnyFieldEmpty()">
              <span>Create Cinema</span><i class="bx bx-arrow-back"></i>
            </button>
            <div v-if="isAnyFieldEmpty()" class="error-message-fields-create-cinema">Do not leave fields blank</div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
<style>
.create_cinema_background{
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100vh;
  gap: 0;
  background-image: url('@/assets/cinema_creation_background.png');
}
.parent-container-3 {
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
.cinema_container {
  width: 1034px;
  height: 555px;
  position: relative;
  margin-top: 5%;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(34px);
  border-radius: 40px;
  opacity: 1;
}
.form-title-cinema{
  position: absolute;
  z-index: 5;
  width: 570px;
  height: 78px;
  top: 10px;
  left: 230px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant SC;
  font-size: 64px;
  font-weight: 700;
  line-height: 77.5px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}
#name_cinema{
  position: fixed;
  width: 422px;
  top: 190px;
  left: 30px;
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
.label-name-cinema{
  position: fixed;
  top: 120px;
  left: 30px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#location_cinema{
  position: fixed;
  width: 422px;
  top: 190px;
  left: 560px;
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
.label-location-cinema{
  position: fixed;
  top: 120px;
  left: 560px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#rows_cinema{
  position: fixed;
  width: 422px;
  top: 370px;
  left: 30px;
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
.label-rows-cinema{
  position: fixed;
  top: 300px;
  left: 30px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
#amount_rows_cinema{
  position: fixed;
  width: 422px;
  top: 370px;
  left: 560px;
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
.label-amount-rows-cinema{
  position: fixed;
  top: 300px;
  left: 560px;
  font-family: Cormorant Garamond;
  font-size: 32px;
  font-weight: 400;
  line-height: 38.75px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.button-create-cinema{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 490px;
  height: 52px;
  top: 450px;
  left: 270px;
  border: none;
  border-radius: 30px;
  background: rgba(96, 53, 161, 1);
  font-family: Cormorant Garamond, serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  color: #FFFFFF;
}
.error-message-fields-create-cinema {
  position: absolute;
  top: 514px;
  left: -12px;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
}
</style>