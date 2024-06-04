<template>
  <div class="parent-container-5">
    <div class="table-container">
      <h4>Cinemas</h4>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th v-for="(value, key) in cinemas[0]" :key="key">
              <span v-if="key !== '__v' && key !== 'photoUrl'">{{ key }}</span>
            </th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="cinema in cinemas" :key="cinema._id">
            <td v-for="(value, key) in cinema" :key="key">
              <span v-if="key !== '__v'">{{ value }}</span>
            </td>
            <td>
              <button class="btn btn-delete" @click="deleteCinema(cinema._id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <h4>Movies</h4>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th v-for="(value, key) in movies[0]" :key="key">
              <span v-if="key !== '__v' && key !== 'photoUrl'">{{ key }}</span>
            </th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="movie in movies" :key="movie._id">
            <td v-for="(value, key) in movie" :key="key">
              <span v-if="key !== '__v' && key !== 'photoUrl'">{{ value }}</span>
            </td>
            <td>
              <router-link class="btn btn-update" :to="{ name: 'UpdateMovie', params: { id: movie._id }}">Update</router-link>
              <button class="btn btn-delete" @click="deleteMovie(movie._id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <h4>Sessions</h4>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Movie ID</th>
            <th>Cinema ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity Available Places</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="session in sessions" :key="session._id">
            <td>{{ session._id }}</td>
            <td>{{ session.movieId }}</td>
            <td>{{ session.cinemaId }}</td>
            <td>{{ session.date }}</td>
            <td>{{ session.time }}</td>
            <td>{{ session.price }}</td>
            <td>{{ session.discount }}</td>
            <td>{{ session.quantityAvailablePlaces }}</td>
            <td>
              <router-link class="btn btn-update" :to="{ name: 'UpdateSession', params: { id: session._id }}">Update</router-link>
              <button class="btn btn-delete" @click="deleteSession(session._id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <h4>Users</h4>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user._id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="btn btn-delete" @click="deleteUser(user._id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script>
import * as cinemaAPI from '@/services/cinemaAPI'
import * as movieAPI from '@/services/movieAPI'
import * as sessionAPI from '@/services/sessionAPI'
import * as userAPI from '@/services/userAPI'

export default {
  data() {
    return {
      cinemas: [],
      movies: [],
      sessions: [],
      users: [],
    };
  },
  methods: {
    async deleteSession(id) {
      await sessionAPI.deleteSession(id);
      window.location.reload()
    },
    async deleteUser(id) {
      await userAPI.deleteUser(id,localStorage.getItem("token"));
      window.location.reload()
    },
    async deleteCinema(id) {
      await cinemaAPI.deleterCinema(id);
      window.location.reload()
    },
    async deleteMovie(id) {
      await movieAPI.deleteMovie(id);
      window.location.reload()
    }
  },
  async mounted() {
    this.cinemas = await cinemaAPI.getAllCinemas();
    this.movies = await movieAPI.getAllMovies();
    this.sessions = await sessionAPI.getAllSessions();
    this.users = await userAPI.getAllUsers();
  }
};
</script>

<style>
.parent-container-5 {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  overflow-y: auto;
}

.table-container {
  width: 100%;
  max-width: 1400px;
  margin: 50px;
  border-radius: 50px;
  padding: 10px;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
}

.table-container h4 {
  margin-bottom: 20px;
  font-family: Cormorant SC;
  font-size: 64px;
  font-weight: 700;
  line-height: 77.5px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
}

.table-wrapper table {
  width: 100%;
  border-collapse: collapse;
}

.table-wrapper th,
.table-wrapper td {
  padding: 12px 15px;
  text-align: center;
  font-family: Cormorant SC;
  font-size: 18px;
  border-bottom: 1px solid #444;
}

.table-wrapper th {
  background-color: rgba(54, 26, 114, 1);
  color: #fff;
  font-family: Cormorant SC;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-wrapper tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}

.table-wrapper tr:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.table-wrapper .btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.table-wrapper .btn {
  padding: 4px 15px;
  margin: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  font-family: 'Cormorant SC', serif;
  font-size: 16px;
}

.table-wrapper .btn-update {
  background-color: #733E92;
  border: #FFFFFF 1px solid ;
  color: white;
  text-decoration: none;
}

.table-wrapper .btn-delete {
  background-color: #501C6F;
  border: #FFFFFF 1px solid ;
  color: white;
}

.table-wrapper .btn-update:hover,
.table-wrapper .btn-delete:hover {
  opacity: 0.8;
  transform: scale(1.05);
}


</style>