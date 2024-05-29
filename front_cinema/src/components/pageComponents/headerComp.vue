<template>
  <header>
    <img src="@/assets/logo_header.png" class="logo-header">
    <div class="logo-text-1">
      <a>Cine</a>
    </div>
    <div class="logo-text-2">
      <a>Virtuoso</a>
    </div>
    <div class="header-text-3">
      <a href="/registration">Authentication</a>
    </div>
    <img src="@/assets/burger-bar.png" class="burger-bar" id="burger-bar">
  </header>
</template>

<script>

</script>
<style>


.header-text-3 a {
  text-decoration: none;
  color: inherit;
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