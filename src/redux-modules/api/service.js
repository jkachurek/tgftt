import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'b941e0a209e93afab9677f6100836df2',
    language: 'en-US',
    include_adult: false,
  },
});

export default instance;
