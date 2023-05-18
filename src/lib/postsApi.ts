import axios from 'axios'

export const postsApi = axios.create({
  baseURL: 'https://dev.codeleap.co.uk/careers/',
})