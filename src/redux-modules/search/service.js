import api from '../api/service';

export const searchMovies = query => api.get('search/movie', {
  params: { query }
});

export const searchPeople = query => api.get('search/person', {
  params: { query }
});

export const searchTv = query => api.get('search/tv', {
  params: { query }
});

export const searchAll = query => api.get('search/multi', {
  params: { query }
});
