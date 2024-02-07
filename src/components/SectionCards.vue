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
            </figure>
            <p><strong>Title: </strong>{{ element.title }}</p>
            <p><strong>Original title: </strong>{{ element.originalTitle }}</p>
            <p v-html="getLanguageImage(element.language)"></p>
            <p v-html="transformRating(element.vote)"></p>

        </div>
    </div>
</template>

<style lang="scss">
.row {
    display: flex;
    flex-wrap: wrap;

    .card {
        flex-basis: 20%;
        padding: 1rem 0;
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
}
</style>