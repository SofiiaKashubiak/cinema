<template>
    <div>
      
      <h2>Cinemas</h2>
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in cinemas[0]" :key="key"><span  v-if="key !== '__v' && key !== 'photoUrl'">{{ key }}</span></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cinema in cinemas" :key="cinema._id">
          <td v-for="(value, key) in cinema" :key="key" ><span v-if="key !== '__v'">{{ value }}</span></td>
          <td>
            <button @click="deleteCinema(cinema._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Movies</h2>
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in movies[0]" :key="key"><span  v-if="key !== '__v' && key !== 'photoUrl'">{{ key }}</span></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie._id">
          <td v-for="(value, key) in movie" :key="key" ><span v-if="key !== '__v' && key !== 'photoUrl'">{{ value }}</span></td>
          <td>
            <router-link :to="{ name: 'UpdateMovie', params: { id: movie._id }}">Update</router-link>
            <button @click="deleteMovie(movie._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
      <h2>Sessions</h2>
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
            <th>quantityAvailablePlaces</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="session in sessions" :key="session.id">
            <td>{{ session._id }}</td>
            <td>{{ session.movieId }}</td>
            <td>{{ session.cinemaId }}</td>
            <td>{{ session.date }}</td>
            <td>{{ session.time }}</td>
            <td>{{ session.price }}</td>
            <td>{{ session.discount }}</td>
            <td>{{ session.quantityAvailablePlaces }}</td>
            <td>
            <router-link :to="{ name: 'UpdateSession', params: { id: session._id }}">Update</router-link>
              <button @click="deleteSession(session._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h2>Users</h2>
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
          <tr v-for="user in users" :key="user.id">
            <td>{{ user._id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="deleteUser(user._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
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
        async deleteSession(id){
            await sessionAPI.deleteSession(id);
        },
        async deleteUser(id){
            await userAPI.deleteUser(id);
        },
        async deleteCinema(id){
            await cinemaAPI.deleterCinema(id);
        },
        async deleteMovie(id){
            await movieAPI.deleteMovie(id);
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
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  
  button {
    margin-right: 5px;
  }
  </style>
  