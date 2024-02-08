import {reactive} from 'vue';

export const store = reactive({
    movies: [],
    tvShows: [],
    isLoading: false,
    urlConfig: {
        baseUrl: 'https://api.themoviedb.org/3',
        apiKey: '7a52c80d921a51f7f218955a9737d1d2',
        apiLanguage: 'it-IT'
    },
    emptyImgUrl: 'data:image/png;base64,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',
    completeImagePath: `https://image.tmdb.org/t/p/w342/`
})