<template>
  <img src="@/assets/main_background.png" class="main_background">
    <header>
      <img src="@/assets/logo_header.png" class="logo-header">
      <div class="logo-text-1">
        <a>Cine</a>
      </div>
      <div class="logo-text-2">
        <a>Virtuoso</a>
      </div>
      <div class="header-text-3">
        <a>Authentication</a>
      </div>
      <img src="@/assets/burger-bar.png" class="burger-bar" id="burger-bar">
    </header>
  <div  class="main">
    <div class="main-text-1">
      <a>Cine Virtuoso</a>
    </div>
    <div class="main-text-2">
      <a>Discover the latest premieres, explore the most anticipated films, and review ratings from renowned critics. Our platform offers you a journey through the world of cinema from the first frames to the closing credits, from classics to innovation.</a>
    </div>
    <img src="@/assets/UFO-1.png" class="UFO-1">
    <img src="@/assets/popcorn.png" class="popcorn-1">
    <button class="join_now_button">
      <span class="join-now-text-button">join us right now →</span>
    </button>
  </div>
  <div class="slider-zone">
    <div class="slider-zone-text">
    <div class="slider-text-1">
      <a>. . . . . . . .</a>
    </div>
    <div class="slider-text-2">
      <a>Cinema Poster</a>
    </div>
    <div class="slider-text-3">
      <a>. . . . . . . . .</a>
    </div>
    </div>
    <div class="phone">

    </div>
    <div>

    </div>
  </div>
</template>

<script>

</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #000115;
}
.slider-zone{
  position: absolute;
  width: 100%;
  height: 785px;
  top: 1000px;
  left: -68px;
  gap: 0px;
  opacity: 0px;

}
.slider-zone-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.slider-text-1 {
  position: absolute;
  width: 25vw;
  height: 85px;
  top: 0px;
  font-family: Cormorant SC;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 25%;
  transform: translateX(-50%);
}

.slider-text-2 {
  position: absolute;
  width: 35vw;
  height: 85px;
  top: 10px;
  font-family: Cormorant SC;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 55%;
  transform: translateX(-50%);
}

.slider-text-3 {
  position: absolute;
  width: 25vw;
  height: 85px;
  top: 0px;
  font-family: Cormorant SC;
  font-size: 5vw;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  left: 85%;
  transform: translateX(-50%);
}

.join_now_button{
  position: absolute;
  width: 375px;
  height: 52px;
  top: 623px;
  left: 455px;
  gap: 0px;
  border-radius: 40px 40px 40px 40px;
  opacity: 0px;
  z-index: 2;
  background: rgba(144, 56, 158, 0.5);
  border-color: rgba(144, 56, 158, 0.5);

}
.join-now-text-button{
  width: 400px;
  height: 44px;
  top: 625px;
  left: 415px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant;
  font-size: 36px;
  font-weight: 600;
  line-height: 43.6px;
  text-align: left;
  color: rgba(255, 255, 255, 1);

}
.main_background{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 944px;
  gap: 0px;
  opacity: 0px;

  background-image: url('@/assets/main_background.png');
}
.main-text-1{
  position: absolute;
  width: 606px;
  height: 116px;
  top: 239px;
  left: 50px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant SC;
  font-size: 96px;
  font-weight: 700;
  line-height: 116.26px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.main-text-2{
  position: absolute;
  width: 760px;
  height: 205px;
  top: 369px;
  left: 50px;
  gap: 0px;
  opacity: 0px;
  font-family: Cormorant Garamond;
  font-size: 34px;
  font-weight: 400;
  line-height: 41.17px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.UFO-1{
  position: absolute;
  width: 922.38px;
  height: 710.48px;
  top: 60px;
  right:0px;
  gap: 0px;
  opacity: 0px;
  angle: -3.87 deg;
}
.popcorn-1{
  position: absolute;
  width: 329px;
  height: 439px;
  top: 308px;
  right: 180px;
  gap: 0px;
  opacity: 0px;


}
header {
  position: absolute;
  width: 100%;
  top: 0;
  height: 100px;
  display: flex;
  align-items: center;
  background: #303B9930;

}

.logo-header {
  position: absolute;
  top: 5px;
  left: 24px;
  width: 39px;
  height: 78px;
}

.logo-text-1 {
  position: absolute;
  top: 5px;
  left: 74px;
  font-family: Cormorant SC, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 38.75px;
  color: #FFFFFF;
}

.logo-text-2 {
  position: absolute;
  top: 44px;
  left: 74px;
  font-family: Cormorant SC, serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 38.75px;
  color: #FFFFFF;
}

.header-text-3 {
  position: absolute;
  top: 25px;
  left: calc(100% - 334px);
  font-family: Cormorant;
  font-size: 36px;
  font-weight: 600;
  line-height: 43.6px;
  color: #FFFFFF;
}

.burger-bar {
  position: absolute;
  top: 24px;
  left: calc(100% - 71px);
  width: 50px;
  height: 50px;
}
</style>
