<script>
import { dataUrlConfig } from '../assets/data/data'
import axios from 'axios';
import {store} from '../assets/data/store'
export default {
    name: 'ElementCard',
    data() {
        return {
            actorsName: []
        }
    },
    props: {
        element: Object,
        type: String,
    },
    computed: {
        imagePath() {
            const path = new URL(`../assets/images/${this.element.language}.png`, import.meta.url);
            return path.href
        },
        hasFlag() {
            const languages = ['it', 'en', 'es', 'ko', 'fr', 'ja', 'ru', 'ar', 'pt', 'zh', 'tl', 'hi', 'id', 'ta', 'tr', 'sv', 'el']
            return languages.includes(this.element.language)
        },
        starRating() {
            let transformedVote = Math.ceil((this.element.vote / 10) * 5)
            let fullStars = `<i class="fa-solid fa-star"></i>`
            let emptyStars = `<i class="fa-regular fa-star"></i>`

            return `<strong style="color: white;">Voto: </strong>${fullStars.repeat(transformedVote)}${emptyStars.repeat(5 - transformedVote)}`
        },

    },
    methods: {
        getActorsUrl(collection) {
            const { baseUrl, apiKey } = dataUrlConfig;
            const url = `${baseUrl}/${collection}/${this.element.id}/credits?api_key=${apiKey}`
            return url
        },
        fetchActors() {
            const collection = this.type === 'Movies' ? 'movie' : 'tv'
            const url = this.getActorsUrl(collection)

            axios.get(url).then(res => {
                const firstFiveActors = res.data.cast.slice(0, 5);
                const actorsName = firstFiveActors.map((actor) => {
                    return actor.name
                })
                this.actorsName = actorsName
            })
        },
        
    },
    created() {
        this.fetchActors()
    }
}
</script>

<template>
    <div class="card">
        <figure>
            <img class="poster" :src="element.imagePath" :alt="element.title">
            <div class="overlay-info">
                <p class="element-title">{{ element.title }}</p>
                <p class="element-original-title"><strong>Titolo originale: </strong>{{ element.originalTitle }}</p>
                <img class="language-img" :src="imagePath" v-if="hasFlag">
                <p class="element-language" v-else>{{ element.language }}</p>
                <!-- potevo anche fare un v-for e poi un ternario della classe fa-solid o regular -->
                <!-- <p> <i v-for="n in 5" :key="n" class="fa-star" :class="n <= vote ? 'fas' : 'far'"></i></p> -->
                <p class="element-stars" v-html="starRating"></p>
                <div class="actors" v-if="actorsName">
                    <p><strong>Cast: </strong></p>
                    <p>
                        <span v-for="(actor, i) in actorsName">
                            {{ actor }}<span v-if="i !== actorsName.length - 1">, </span>
                            <span v-else>...</span>
                        </span>
                    </p>
                </div>
                <div class="element-overview">
                    <p><strong>Trama: </strong></p>
                    <p>{{ element.overview }}</p>
                </div>
            </div>
        </figure>
    </div>
</template>

<style lang="scss" scoped>
.card {
    flex-basis: 25%;
    padding: 2rem 1rem;
    cursor: pointer;

    &:hover .overlay-info {
        opacity: 1;
    }

    .language-img {
        width: 45px;
        display: block;
        margin: .4rem auto;

    }

    .poster {
        width: 342px;
        height: 513px;
        border-radius: 10px;
        display: block;
    }

    figure {
        width: 342px;
        height: 513px;
        position: relative;

    }

    ::-webkit-scrollbar {
        width: 1px;
    }

    ::-webkit-scrollbar-track {
        background: #1b1b1b;
    }

    ::-webkit-scrollbar-thumb {
        background: #1b1b1b;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #1b1b1b;
    }

    .overlay-info {
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .9);
        padding: 1rem;
        font-size: 1.1rem;
        opacity: 0;
        border-radius: 10px;
        overflow-y: auto;
        transition: .5s ease-in-out;

    }

    p {
        padding: .6rem 0;

    }

    strong {
        color: white;
    }

    .element-title {
        font-size: 1.9rem;
        font-weight: bold;
        margin-bottom: .2rem;
        text-shadow: 0 0 2px white;

    }

    .element-original-title {
        font-size: .9rem;
    }

    .element-language {
        font-size: .9rem;
    }

    .element-stars {

        color: #e6d151;

    }

    // .element-stars i {

    //     color: #e6d151;

    // }


    .element-overview,
    .actors {
        font-size: .9rem;

        p {
            padding: .3rem;
        }
    }
}
</style>