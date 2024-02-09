import {reactive} from 'vue';

export const store = reactive({
    movies: [],
    tvShows: [],
    isLoading: false,
    movieActors: [],
    tvShowsActors: [],
    movieGenres: [],
    tvGenres: [],
    allGenres: []
})