import axios from "axios"

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: {
    "API-KEY": "af0e3219-367b-49e0-a604-f544cf649725"
  }
})
