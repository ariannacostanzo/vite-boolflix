<script>
export default {
    name: 'ElementCard',
    props: {
        element: Object
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
            let transformedVote = Math.round((this.element.vote / 10) * 5)
            let fullStars = `<i class="fa-solid fa-star"></i>`
            let emptyStars = `<i class="fa-regular fa-star"></i>`

            return `<strong style="color: white;">Voto: </strong>${fullStars.repeat(transformedVote)}${emptyStars.repeat(5 - transformedVote)}`
        },
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
                <p class="element-stars" v-html="starRating"></p>
                <p class="element-overview"><strong>Trama: <br></strong>{{ element.overview }}</p>
                <p>{{ element.id }}</p>
            </div>
        </figure>
    </div>
</template>

<style lang="scss" scoped>
// perchè a .element-stars i  color: yellow non funziona?
.card {
    flex-basis: 25%;
    padding: 2rem 1rem;
    cursor: pointer;

    &:hover .overlay-info {
        display: block;
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
        display: none;
        border-radius: 10px;
        overflow-y: auto;


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


    .element-overview {
        font-size: .9rem;
    }
}
</style>