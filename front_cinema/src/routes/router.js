import { createWebHistory, createRouter } from "vue-router";
import registration from '@/components/authorization/registerPage';
import createMovie from '@/components/films/createMoviePage';
import createSession from '@/components/films/movieSessionPage';
import moviePage from '@/components/films/moviePage.vue';
import loginPage from '@/components/authorization/loginPage.vue';
import mainPage from '@/components/others/mainPage.vue';
import errorPage from '@/components/others/errorPage.vue';
import userProfilePage from '@/components/others/userProfilePage.vue';
import movieSession from '@/components/others/cinemaCreationPage.vue';

const history = createWebHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: '/registration',
            component: registration
        },
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
            path: '/login',
            component: loginPage
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
        }
    ]
})

export default router;