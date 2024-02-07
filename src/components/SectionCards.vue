<script>

export default {
    name: 'SectionCards',
    props: {
        elements: Array
    },
    methods: {
        //queste funzioni andrebbero centralizzate?
        getLanguageImage(language) {
            let string;

            switch (language) {
                case 'en':
                    string = `<img class='language-img' src="${this.createImagePath('en')}" alt="en">`
                    break;
                case 'it':
                    string = `<img class='language-img' src="${this.createImagePath('it')}" alt="it">`
                    break;
                default:
                    string = `<strong>Lingua: </strong>${language}`
            }
            return string;
        },

        createImagePath(item) {
            const path = new URL(`../assets/images/${item}.png`, import.meta.url);
            return path.href
        },

        transformRating(vote) {
            let transformedVote = Math.round((vote / 10) * 5)
            let fullStars = `<i class="fa-solid fa-star"></i>`
            let emptyStars = `<i class="fa-regular fa-star"></i>`

            return `<strong>Voto: </strong>${fullStars.repeat(transformedVote)}${emptyStars.repeat(5 - transformedVote)}`
        }
    }
}
</script>

<template>
    <div class="row">
        <div v-for="element in elements" :key="element.id" class="card">
            <figure>
                <img class="poster" :src="element.imagePath" :alt="element.title">

                <div class="overlay-info">
                    <p class="element-title">{{ element.title }}</p>
                    <p class="element-original-title"><strong>Titolo originale: </strong>{{ element.originalTitle }}</p>
                    <p class="element-language" v-html="getLanguageImage(element.language)"></p>
                    <p class="element-stars" v-html="transformRating(element.vote)"></p>
                </div>
            </figure>
            

        </div>
    </div>
</template>

<style lang="scss">
.row {
    padding: 0 8rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    color: white;

    .card {
        flex-basis: 25%;
        padding: 2rem 1rem;
        cursor: pointer;

        &:hover .overlay-info {
            display: block;
        }
    }

    .language-img {
        width: 45px;
        display: block;
        margin: 0 auto;
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

        p {
            padding: .6rem 0;
            
        }

        .element-title {
            font-size: 1.7rem;
            font-weight: bold;
            margin-bottom: .2rem;
            text-shadow: 0 0 2px white;
            
        }

        .element-original-title {
            font-size: .9rem;
        }

        .element-language{
            font-size: .9rem;
        }

        .element-stars i {
            color: #e6d151;
        }
    }
}
</style>