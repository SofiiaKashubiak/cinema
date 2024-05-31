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

const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: '/createMovie',
            component: createMovie
        },
        {
            path: '/createSession',
            component: createSession
        },
        {
            path: '/movie/:id',
            name: "MovieDetails",
            component: moviePage
        },
        {
            path: '/authentication',
            component: authenticationPage
        },
        {
            path: '/',
            component: mainPage
        },
        {
            path: '/error',
            component: errorPage
        },
        {
            path: '/profile',
            component: userProfilePage
        },
        {
            path: '/createCinema',
            component: movieSession
        },
        {
            path: '/recovery',
            component: recoveryPass
        }
    ]
})

export default router;