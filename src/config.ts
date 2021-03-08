import axios from 'axios'

export const Axios = axios.create({
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json, text/plain, */*"
    }
});