<template>
    <router-link :to="{ name: 'MovieDetails', params: { id: session.movieId }}">
      Movie {{ movie.title }}
    </router-link>
    Session Date {{ session.date }}
    Session time {{ session.time }}
    price {{ session.price }}
    session discount {{ session.discount }}
    quantityAvailablePlaces {{ session.quantityAvailablePlaces}}

    <router-link :to="{name: 'UpdateSession', params: {id: this.session._id}}" v-if="isAdmin()">
            Update
    </router-link>
    <router-link :to="{name: 'BuyTicket', params: {id: this.session._id}}">
            Buy Ticket
    </router-link>
</template>

<script>
import * as sessionAPI from '@/services/sessionAPI';
import * as movieAPI from '@/services/movieAPI';

export default {
data () {
    return{
        session: {},
        movie: {},
        response: [],
    };
},
methods: {
    async getSession() {
        this.response = await sessionAPI.getSession(this.$route.params.id);
        if (this.response != null){
            this.session = this.response;
            this.movie = await movieAPI.getMovie(this.response.movieId);
        }
    },
    isAdmin() {
            return localStorage.getItem("isAdmin")
        }
},
mounted() {
    this.getSession();
},

};

</script>

