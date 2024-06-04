<template>
  <div>
    <div class="main_background" ></div>

    <div class="main">
      <div class="main-text-1">
        <a>Cine Virtuoso</a>
      </div>
      <div class="main-text-2">
        <a>Discover the latest premieres, explore the most anticipated films, and review ratings from renowned critics. Our platform offers you a journey through the world of cinema from the first frames to the closing credits, from classics to innovation.</a>
      </div>
      <img src="@/assets/UFO-1.png" class="UFO-1" alt="UFO">
      <img src="@/assets/popcorn.png" class="popcorn-1" alt="popcorn">
      <button onclick="window.location.href='/registration'" class="join_now_button">
        <span class="join-now-text-button">join us right now →</span>
      </button>
    </div>
    <div class="slider-zone-text">
      <div class="slider-text-1">
        <a>. . . . . . . .</a>
      </div>
      <div class="slider-text-2">
        <a>Cinema Poster</a>
      </div>
      <div class="slider-text-3">
        <a>. . . . . . . . </a>
      </div>
    </div>
    <div class="slider-zone">

      <swiper
          :modules="[Navigation, Pagination, Scrollbar, EffectCoverflow, A11y]"
          effect="coverflow"
          :slides-per-view="4"
          :space-between="120"
          centered-slides
          loop
          :coverflow-effect="{ rotate: 0, stretch: 120, depth: 120, modifier: 1.1, slideShadows: true}"
          :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
          :pagination="{ clickable: true, el: '.swiper-pagination' }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :keyboard="swiperOptions.keyboard"
          :mousewheel="swiperOptions.mousewheel"
          allowMouseEvents="true"

      >
        <!-- <swiper-slide><img src="@/assets/slide1.jpeg" alt="Slide 1"></swiper-slide>
        <swiper-slide><img src="@/assets/slide2.webp" alt="Slide 2"></swiper-slide>
        <swiper-slide><img src="@/assets/slide3.jpeg" alt="Slide 3"></swiper-slide>
        <swiper-slide><img src="@/assets/slide4.jpeg" alt="Slide 4"></swiper-slide>
        <swiper-slide><img src="@/assets/slide5.jpeg" alt="Slide 5"></swiper-slide>
        <swiper-slide><img src="@/assets/slide6.jpeg" alt="Slide 6"></swiper-slide>
        <swiper-slide><img src="@/assets/slide7.jpeg" alt="Slide 6"></swiper-slide> -->
        <swiper-slide v-for="movie in movies" :key="movie.id">
          <router-link :to="{ name: 'MovieDetails', params: {id: movie._id}}">
            <img :src="movie.photoUrl" :alt="`Slide ${movie.id}`">
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <div class="why-us-zone-text">
    <div class="why-text-1">
      <a>. . . . . . . . . .</a>
    </div>
    <div class="why-text-2">
      <a>Why us?</a>
    </div>
    <div class="why-text-3">
      <a>. . . . . . . . . .</a>
    </div>
    <img src="@/assets/figure-background-1.png" class="figure_background_1" alt="figure">
    <div class="main-why-text-1">
      <a>★ Experience movies like never before with our cutting-edge audio and visual technology, creating an immersive atmosphere that transports you into the heart of the story.</a>
    </div>
    <div class="main-why-text-2">
      <a>★ Immerse yourself in the world of cinema with our interactive events, including filmmaker Q&A sessions, behind-the-scenes tours, and themed movie nights, offering an enriching and engaging experience for movie enthusiasts of all ages.</a>
    </div>
    <div class="main-why-text-3">
      <a>★ Unlock exclusive perks and rewards with our membership program, including priority booking, discounts on tickets and concessions, and access to members-only events, ensuring you get the most out of your moviegoing experience.</a>
    </div>
  </div>
  <footer>
    <img src="@/assets/figure-background-2.png" class="figure_background_2" alt="figure">
    <div class="footer-text-1">
      <a>Where Every Movie is a Masterpiece</a>
    </div>
    <div class="stripe-footer">
    </div>
    <div class="arrow-1">
      <a href="/registration"> →</a>
    </div>
    <div class="footer-text-2">
      <a>join us right now </a>
    </div>
    <div class="footer-text-3">
      <a>We are on social media </a>
    </div>
    <a href="https://x.com/">
      <img src="@/assets/twitter.png" class="twitter" alt="twitter">
    </a>
    <a href="https://www.instagram.com">
      <img src="@/assets/instagram.png" class="instagram" alt="instagram">
    </a>
    <a href="https://www.facebook.com">
      <img src="@/assets/facebook.png" class="facebook" alt="facebook">
    </a>
    <div class="footer-text-4">
      <a>Menu </a>
    </div>
    <div class="footer-text-5">
      <a href="/">Main page </a>
    </div>
    <div class="footer-text-6">
      <a href="/profile">Account </a>
    </div>
    <div class="footer-text-7">
      <a>Now showing </a>
    </div>

    <div class="opening-container">
      <div class="footer-text-8">
        <a>Opening Hours</a>
      </div>
      <ul class="opening-hours">
        <li>Monday: 10:00 AM - 11:00 PM</li>
        <li>Tuesday: 10:00 AM - 11:00 PM</li>
        <li>Wednesday: 10:00 AM - 11:00 PM</li>
        <li>Thursday: 10:00 AM - 11:00 PM</li>
        <li>Friday: 10:00 AM - 12:00 AM</li>
        <li>Saturday: 10:00 AM - 12:00 AM</li>
        <li>Sunday: 11:00 AM - 10:00 PM</li>
      </ul>
    </div>

  </footer>

</template>


<script>
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

import {ref} from "vue";
import * as movieAPI from "@/services/movieAPI";

export default {
  methods: {A11y, Navigation, EffectCoverflow, Scrollbar, Pagination},
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperRef = ref(null);
    const onSwiper = (swiper) => {
      swiperRef.value = swiper;
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    const handleLeftArrow = () => {
      if (swiperRef.value) {
        swiperRef.value.slidePrev();
      }
    };

    const handleRightArrow = () => {
      if (swiperRef.value) {
        swiperRef.value.slideNext();
      }
    };

    return {
      onSwiper,
      onSlideChange,
      handleLeftArrow,
      handleRightArrow,
    };
  },
  data() {
    return {
      swiperOptions: {
        mousewheel: true,
        keyboard: true,
      },
      movies : [],
    };
  },
  async mounted() {
    this.movies = await movieAPI.getAllMovies();
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.handleLeftArrow();
      } else if (e.key === 'ArrowRight') {
        this.handleRightArrow();
      }
    });
  },
};



</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #000115;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.main_background {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 944px;
  gap: 0;
  background-image: url('@/assets/main_background.png');
}
.main-text-1 {
  position: absolute;
  width: 606px;
  height: 116px;
  top: 239px;
  left: 50px;
  gap: 0;
  font-family: Cormorant SC,serif;
  font-size: 96px;
  font-weight: 700;
  line-height: 116px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}

.main-text-2 {
  position: absolute;
  width: 760px;
  height: 205px;
  top: 369px;
  left: 50px;
  gap: 0;
  font-family: Cormorant Garamond,serif;
  font-size: 34px;
  font-weight: 1200 !important;
  line-height: 41px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.UFO-1 {
  position: absolute;
  width: 922px;
  height: 710px;
  top: 60px;
  right: 0;
  gap: 0;
}
.popcorn-1 {
  position: absolute;
  width: 329px;
  height: 439px;
  top: 308px;
  right: 180px;
  gap: 0;
}
.join_now_button {
  position: absolute;
  width: 375px;
  height: 52px;
  top: 623px;
  left: 455px;
  gap: 0;
  border-radius: 40px 40px 40px 40px;
  z-index: 2;
  background: rgba(144, 56, 158, 0.5);
  border-color: rgba(144, 56, 158, 0.5);
}
.join-now-text-button {
  width: 400px;
  height: 44px;
  top: 625px;
  left: 415px;
  gap: 0;
  font-family: Cormorant,serif;
  font-size: 36px;
  font-weight: 600;
  line-height: 43px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.slider-zone-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  top: 1000px;
}
.slider-text-1 {
  position: absolute;
  width: 25vw;
  top: 985px;
  height: 85px;
  font-family: Cormorant SC, serif;
  font-size: 5vw;
  font-weight: 2000 !important;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 320px;
  transform: translateX(-50%);
}
.slider-text-2 {
  position: absolute;
  width: 33vw;
  height: 85px;
  top: 1000px;
  font-family: Cormorant SC, serif;
  font-size: 5vw;
  font-weight: 1000 !important;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 50%;
  transform: translateX(-50%);
}
.slider-text-3 {
  position: absolute;
  top: 990px;
  width: 25vw;
  height: 85px;
  font-family: Cormorant SC, serif;
  font-size: 5vw;
  font-weight: 2000 !important;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 80%;
  transform: translateX(-50%);
}
.slider-zone {
  position: absolute;
  width: 100%;
  height: 785px;
  top: 1150px;
  gap: 0;
}
swiper {
  position: absolute;
  width: 100vw;
  height: 100%;
  background-color: #000115;
}
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s, opacity 0.3s;
}
.swiper-slide img {
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 15px;
  transition: transform 0.3s, filter 0.3s;
}
.swiper-slide-next img,
.swiper-slide-prev img {
  transform: scale(0.8);
  filter: blur(2px);
  width: 284px;
  height: 600px;
}
.swiper-slide-active img {
  width: 330px;
  height: 614px;

  transform: scale(1);
  filter: blur(0);
}
.swiper-slide:not(.swiper-slide-active):not(.swiper-slide-next):not(.swiper-slide-prev) img {
  transform: scale(0.6);
  filter: blur(4px);
  opacity: 0.5;
  width: 284px;
  height: 519px;
}
.figure_background_1 {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  transform: translateY(12%);
  gap: 0;
}
.why-us-zone-text {
  font-weight: 1000 !important;
  position: relative;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  top: 900px;

}
.why-text-1 {
  position: absolute;
  width: 28vw;
  top: 244px;
  height: 85px;
  font-family: Cormorant SC, serif;
  z-index: 1;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 320px;
  transform: translateX(-50%);
}
.why-text-2 {
  position: absolute;
  z-index: 1;
  width: 33vw;
  height: 85px;
  top: 255px;
  font-family: Cormorant SC, serif;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 50%;
  transform: translateX(-50%);
}
.why-text-3 {
  position: absolute;
  z-index: 1;
  top: 242px;
  width: 28vw;
  height: 85px;
  font-family: Cormorant SC, serif;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 80%;
  transform: translateX(-50%);
}
.main-why-text-1{
  z-index: 1;
  position: absolute;
  width: 500px;
  height: 116px;
  top: 42%;
  left: 4%;
  gap: 0;
  font-family: Cormorant Garamond,serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.main-why-text-2{
  width: 500px;
  height: 145px;
  top: 53%;
  left: 37%;
  gap: 0;
  font-family: Cormorant Garamond,serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  z-index: 1;
  position: absolute;
}
.main-why-text-3{
  width: 480px;
  height: 145px;
  top: 74%;
  left: 67%;
  gap: 0;
  font-family: Cormorant Garamond,serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  z-index: 1;
  position: absolute;
}
.figure_background_2{
  position: absolute;
  margin-top: 1200px;
  width: 100%;
  left: 0;
  height: 422px;
  gap: 0;
  opacity: 1;
  z-index: 1;

}
.footer-text-1{
  position: relative;
  z-index: 1;
  width: 626px;
  height: 52px;
  left: 34px;
  top: 1240px;
  gap: 0;
  font-family: Cormorant SC,serif;
  font-size: 34px;
  font-weight: 1000;
  line-height: 41px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.footer-text-2{
  width: 370px;
  height: 31px;
  top: 1200px;
  left: 42px;
  gap: 0;
  font-family: Playfair Display,serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  position: relative;
  z-index: 1;
}
.stripe-footer{
  position: relative;
  width: 575px;
  height: 0;
  left: 35px;
  gap: 0;
  border: 2px solid rgba(255, 255, 255, 1);
  top: 1300px;
  z-index: 1;
}
.arrow-1{
  z-index: 1;
  position: relative;
  width: 28px;
  height: 53px;
  top: 1240px;
  left: 565px;
  gap: 0;
  font-family: Cormorant Unicase,serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 54px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.footer-text-3{
  position: relative;
  z-index: 1;
  width: 626px;
  height: 52px;
  left: 34px;
  top: 1290px;
  gap: 0;
  font-family: Cormorant SC, serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 41px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.twitter{
  height: 38px;
  top: 1320px;
  left: 42px;
  gap: 0;
  font-family: Playfair Display, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  position: relative;
  z-index: 1;
}
.instagram{
  height: 38px;
  top: 1320px;
  left: 82px;
  gap: 0;
  font-family: Playfair Display, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  position: relative;
  z-index: 1;
}
.facebook{
  height: 34px;
  top: 1317px;
  left: 125px;
  gap: 0;
  font-family: Playfair Display, serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  position: relative;
  z-index: 1;
}
.footer-text-4{
  position: relative;
  z-index: 1;
  width: 124px;
  height: 52px;
  left: 835px;
  top: 1018px;
  gap: 0;
  font-family: Cormorant SC, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.footer-text-5{
  position: relative;
  z-index: 1;
  width: 116px;
  height: 31px;
  left: 835px;
  top: 1025px;
  gap: 0;
  font-family: Cormorant Garamond, serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.footer-text-6{
  position: relative;
  z-index: 1;
  width: 116px;
  height: 31px;
  left: 835px;
  top: 1045px;
  gap: 0;
  font-family: Cormorant Garamond, serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 31px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.footer-text-7{
  position: relative;
  z-index: 1;
  width: 116px;
  height: 31px;
  left: 835px;
  top: 1065px;
  gap: 0;
  font-family: Cormorant Garamond, serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 31px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.footer-text-8{
  position: absolute;
  right: 52px;
  transform: translateY(-10%);
  z-index: 1;
  top: calc(100% - 58px);
  width: 380px;
  font-family: Cormorant SC, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  list-style-type: none;
  margin: 0;
}
.opening-container {
  position: relative;
  top: 935px;
}
.opening-hours {
  position: absolute;
  right: 40px;
  transform: translateY(-10%);
  z-index: 1;
  width: 380px;
  padding: 10px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  font-weight: 400;
  line-height: 31px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  list-style-type: none;
  margin: 0;
}
.opening-hours li {
  margin: 5px 0;
}
.arrow-1 a,
.footer-text-6 a,
.footer-text-5 a {
  text-decoration: none;
  color: inherit;
}
</style>
