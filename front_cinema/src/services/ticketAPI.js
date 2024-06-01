import axios from 'axios';
import router from '@/routes/router';
const userUrl = "http://localhost:3000/pay/";


export async function buyTickets(ticket) {
    try {
        return await axios.post(userUrl + "buyTicket", ticket).then(res => res.data);
    } catch (error) {
        console.error("Error creating buying ticket:", error);
        await router.push("/error");
    }
}
