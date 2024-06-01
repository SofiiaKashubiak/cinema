import { createWebHistory, createRouter } from "vue-router";
import createMovie from '@/components/films/createMoviePage';
import createSession from '@/components/films/movieSessionPage';
import moviePage from '@/components/films/moviePage.vue';
import mainPage from '@/components/others/mainPage.vue';
import errorPage from '@/components/others/errorPage.vue';
import userProfilePage from '@/components/others/userProfilePage.vue';
import movieSession from '@/components/others/cinemaCreationPage.vue';
import recoveryPass from '@/components/authorization/recoveryPassPage.vue';
import authenticationPage from "@/components/authorization/authenticationPage.vue";
import sessionPage from "@/components/films/sessionPage.vue";
import updateMovie from "@/components/films/updateMovie.vue";
import updateSession from "@/components/films/updateSession.vue";
import buyTicket from "@/components/films/ticketPage.vue";

const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: '/createMovie',
            component: createMovie,
            meta: { requiresAdmin: true }
        },
        {
            path: '/createSession',
            component: createSession,
            meta: { requiresAdmin: true }
        },
        {
            path: '/movie/:id',
            name: "MovieDetails",
            component: moviePage
        },
        {
            path: '/authentication',
            component: authenticationPage,
            name: "auth"
        },
        {
            path: '/',
            component: mainPage,
        },
        {
            path: '/error',
            component: errorPage
        },
        {
            path: '/profile',
            component: userProfilePage,
            meta: { requiresAdmin: true }
        },
        {
            path: '/createCinema',
            component: movieSession,
            meta: { requiresAdmin: true }
        },
        {
            path: '/recovery',
            component: recoveryPass
        },
        {
            path: '/session/:id',
            name: "SessionDetails",
            component: sessionPage
        },
        {
            path: '/posters',
            component: posterPage
        },
        {
            path: '/updateMovie/:id',
            component: updateMovie,
            name: "UpdateMovie",
            meta: { requiresAdmin: true }
        },
        {
            path: '/updateSession/:id',
            component: updateSession,
            name: "UpdateSession",
            meta: { requiresAdmin: true }
        },
        {
            path: '/:id/buyTicket',
            component: buyTicket,
            name: "BuyTicket"
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (!isAdmin) {
        next({ name: 'auth' }); 
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default router;