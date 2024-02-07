<script>

  export default {
    name: 'SectionCards',
    props: {
        elements: Array
    },
    methods: {
        getLanguageImage(language) {
            let string;
            const enPath = this.createImagePath('en')
            const itPath = this.createImagePath('it')

            switch(language) {
                case 'en':
                    string = `<img class='language-img' src="${enPath}" alt="en">`
                    break;
                case 'it':
                    string = `<img class='language-img' src="${itPath}" alt="it">`
                    break;
                default:
                    string = `<strong>Language: </strong>${language}` 
            }
            return string;
        },
        createImagePath(item) {
            const path = new URL(`../assets/images/${item}.png`, import.meta.url);
            return path.href
  }
    }
  }
</script>

<template>
    <div class="row">
        <div v-for="element in elements" :key="element.id" class="card">
            <p><strong>Title: </strong>{{ element.title }}</p>
            <p><strong>Original title: </strong>{{ element.originalTitle }}</p>
            <p v-html="getLanguageImage(element.language)"></p>
            <p><strong>Vote: </strong>{{ element.vote }}</p>
            
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
  }
</style>