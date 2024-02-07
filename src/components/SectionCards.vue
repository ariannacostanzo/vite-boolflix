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

            switch(language) {
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
            let string;
            let transformedVote = (vote / 10) * 5
            transformedVote = Math.round(transformedVote)
            let fullStars = `<i class="fa-solid fa-star"></i>`
            let emptyStars = `<i class="fa-regular fa-star"></i>`
            
            switch(transformedVote) {
                case 1:
                    string = fullStars + emptyStars + emptyStars + emptyStars + emptyStars
                    break;
                case 2: 
                    string = fullStars + fullStars + emptyStars + emptyStars + emptyStars
                    break;
                case 3:
                    string = fullStars + fullStars + fullStars + emptyStars + emptyStars
                    break;
                case 4:
                    string = fullStars + fullStars + fullStars + fullStars + emptyStars
                    break;
                case 5:
                    string = fullStars + fullStars + fullStars + fullStars + fullStars
                    break;
                default:
                    string = emptyStars + emptyStars + emptyStars + emptyStars + emptyStars

            }

            return string
        }
    }
  }
</script>

<template>
    <div class="row">
        <div v-for="element in elements" :key="element.id" class="card">
            <img class="poster" :src="element.imagePath" :alt="element.title">
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
    }

    .poster {
        width: 342px;
        height: 513px;
        border-radius: 10px;
    }
  }
</style>