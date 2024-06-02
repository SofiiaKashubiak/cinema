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
      <img src="@/assets/burger-bar.png" class="burger-bar" id="burger-bar" @click="toggleSidebar">
    </header>
    <transition name="slide-fade">
      <div v-if="isSidebarOpen" class="dropdown-menu">
        <div class="dropdown_background">
          <button class="close-btn" @click="toggleSidebar"><i class='bx bx-x'></i></button>
          <ul>
            <li><a href="/">Home page</a></li>
            <li><a href="/authentication">Authentication</a></li>
            <li><a href="/posters">Cinema Poster</a></li>
            <li v-if="userAccess()"><a href="/profile">My Profile</a></li>
            <li v-if="userAccess()"><a href="/createSession">Create Session</a></li>
            <li v-if="userAccess()"><a href="/createMovie">Create Movie</a></li>
            <li v-if="userAccess()"><a href="/createCinema">Create Cinema</a></li>
            <li v-if="userAccess()"><a href="/profile/dashboard">Dashboard</a></li>
            <li v-if="userAccess()"><a @click="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      user: [],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    userAccess() {
      return localStorage.getItem("isAdmin")
    },
    logout() {
      localStorage.clear();
      window.location.reload();
    }
  },
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
  font-family: Cormorant SC, serif;
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
  width: 350px;
  height: 220px;
  background-image: url('@/assets/dropdown_background.png');
  border-bottom-left-radius: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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
  padding-top: 50px;
  padding-left: 25px;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
}

.dropdown-menu li a {
  text-decoration: none;
  font-family: Cormorant SC, serif;
  color: #FFFFFF;
  font-size: 28px;
}

.dropdown-menu li:hover {
  background-color: #573C95;
  border-radius: 40px;
}

.close-btn {
  position: absolute;
  color: rgba(255, 255, 255, 1);
  top: 17px;
  width: 50px;
  height: 50px;
  font-size: 100px;
}


.slide-fade-leave-active {
  transition: transform 1.5s ease, opacity 1.5s ease;
}
.slide-fade-enter-active{
  transition: transform 1s ease, opacity 1.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-fade-leave-active {
  transform: translateY(0);
  opacity: 1;
}

.slide-fade-enter-active {
  transform: translateY(-100%);
  opacity: 1;
}
</style>
