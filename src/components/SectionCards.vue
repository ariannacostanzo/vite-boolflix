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
                    string = `<strong>Language: </strong>${language}`
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

            return `${fullStars.repeat(transformedVote)}${emptyStars.repeat(5 - transformedVote)}`
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
                    <p><strong>Title: </strong>{{ element.title }}</p>
                    <p><strong>Original title: </strong>{{ element.originalTitle }}</p>
                    <p v-html="getLanguageImage(element.language)"></p>
                    <p v-html="transformRating(element.vote)"></p>
                </div>

            </figure>
            <!-- <div class="overlay-info">
                <p><strong>Title: </strong>{{ element.title }}</p>
                <p><strong>Original title: </strong>{{ element.originalTitle }}</p>
                <p v-html="getLanguageImage(element.language)"></p>
                <p v-html="transformRating(element.vote)"></p>
            </div> -->
            

        </div>
    </div>
</template>

<style lang="scss">
.row {
    display: flex;
    flex-wrap: wrap;

    .card {
        flex-basis: 20%;
        padding: 2rem 0;
        cursor: pointer;

        &:hover .overlay-info {
            display: block;
        }
    }

    .language-img {
        width: 30px;
        display: block;
    }

    .poster {
        width: 342px;
        height: 513px;
        border-radius: 10px;
        display: block;
    }

    figure {
        position: relative;
    }

    .overlay-info {
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .7);
        display: none;
    }
}
</style>