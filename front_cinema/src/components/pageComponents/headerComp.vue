<template>
  <div>
    <header>
      <img src="@/assets/logo_header.png" class="logo-header">
      <div class="logo-text-1">
        <a>Cine</a>
      </div>
      <div class="logo-text-2">
        <a>Virtuoso</a>
      </div>
      <div class="header-text-3">
        <a href="/">Home Page</a>
      </div>
      <img src="@/assets/burger-bar.png" class="burger-bar" id="burger-bar"  @click="toggleSidebar">
    </header>
    <transition name="fade">
      <div v-if="isSidebarOpen" class="dropdown-menu">
        <button class="close-btn" @click="toggleSidebar">✖</button>
        <ul>
          <li><a href="/link1">Link 1</a></li>
          <li><a href="/link2">Link 2</a></li>
          <li><a href="/link3">Link 3</a></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style>
.header-text-3 a {
  text-decoration: none;
  color: inherit;
}
header {
  z-index: 10;
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
  left: calc(106% - 390px);
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
.dropdown-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px; /* Adjust width as needed */
  height: 40vh;
  background-color: white;
  border-left: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding-top: 20px;
  overflow-y: auto;
}

.dropdown-menu .close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.dropdown-menu ul {
  list-style: none;
  padding-top: 65px;
  padding-left: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

