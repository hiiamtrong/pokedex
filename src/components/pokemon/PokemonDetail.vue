<template lang="">
  <div v-if="pokemon">
    <div class="buttons is-centered mt-3">
      <router-link
        v-if="pokemon.id > 1"
        :to="{
          name: 'detail',
          params: { pokename: +pokemon.id - 1, url: pokemon.url },
        }"
        ><v-icon
          :width="'40px'"
          :height="'40px'"
          class="icon-button mx-2 is-clickable"
          name="left-arrow"
      /></router-link>

      <router-link
        :to="{
          name: 'detail',
          params: { pokename: +pokemon.id + 1, url: pokemon.url },
        }"
      >
        <v-icon
          :width="'40px'"
          :height="'40px'"
          class="icon-button mx-2 is-clickable"
          name="right-arrow"
      /></router-link>
    </div>
    <div class="card">
      <div class="card-image ">
        <figure class="image 16by9">
          <img
            v-lazy="{
              src: highlightImage,
              loading:
                'https://flevix.com/wp-content/uploads/2020/01/Lazy-Loader-1.gif',
              error: 'your error image url',
            }"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div
          v-if="pokemon"
          class="carousel media is-flex is-align-items-center is-justify-content-center"
        >
          <img
            :src="image.url"
            class="pokeimage is-clickable image is-48x48"
            @click="this.highlightImage = image.url"
            :class="image.class"
            v-for="(image, index) in getImages"
            :key="index"
            alt="Placeholder image"
          />
        </div>
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="avatar" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ pokemon.name }}</p>
            <p class="subtitle is-6">
              <span
                :style="{
                  'background-color':
                    typeColours[type.type.name] + ' !important',
                  color: 'white',
                }"
                class="tag mr-1"
                v-for="(type, index) in pokemon.types"
                :key="index"
                >{{ type.type.name }}</span
              >
            </p>
          </div>
        </div>

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
        </div>
        <div
          class="columns box is-gapless is-multiline is-mobile"
          style="background-color:#30a7d7"
        >
          <div class="column is-half mb-3">
            <p class="title is-4 m-0 has-text-white">Height</p>
            <div class="is-size-2">{{ getHeight }}m</div>
          </div>
          <div class="column is-half mb-3">
            <p class="title is-4 m-0 has-text-white">Abilities</p>
            <div v-for="(ability, index) in pokemon.abilities" :key="index">
              <div class="is-size-6">
                - {{ $filters.upperCase(ability.ability.name) }}
              </div>
            </div>
          </div>
          <div class="column is-half mb-3">
            <p class="title is-4 m-0 has-text-white">Weight</p>
            <div class="is-size-2">{{ getWeight }}kg</div>
          </div>
          <div class="column is-half mb-3 ">
            <p class="title is-4 m-0 has-text-white">Stats</p>
            <div
              class="is-size-7"
              v-for="(stat, index) in pokemon.stats"
              :key="index"
            >
              <strong>{{ $filters.upperCase(stat.stat.name) }}: </strong>
              <span class="has-text-black">{{ stat.base_stat }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import typeColours from '@/ulti/types'

function flatObjects(object, result = []) {
  _.forEach(_.values(object), (_object) => {
    if (_.isString(_object)) {
      result.push(_object)
    }
  })
  return result
}

function getArtImage(pokemon) {
  const artImage = _.get(
    pokemon,
    'sprites.other.official-artwork.front_default'
  )

  return artImage
}

function fetchPokemon(pokename) {
  let loader = this.$loading.show({
    container: this.fullPage ? null : this.$refs.formContainer,
    canCancel: true,
    onCancel: this.onCancel,
  })
  this.axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${pokename}`,
  })
    .then(({ data }) => {
      this.pokemon = data

      const artImage = getArtImage(data)
      this.highlightImage = artImage
      this.avatar = artImage
      console.log(data)
    })
    .finally(() => {
      this.isLoading = true
      loader.hide()
    })
}

export default {
  setup() {
    const defualtImage = {
      lg: 'https://bulma.io/images/placeholders/1280x960.png',
      sm: 'https://bulma.io/images/placeholders/96x96.png',
    }

    return { defualtImage, typeColours }
  },
  data() {
    return {
      pokemon: null,
      isLoading: false,
      highlightImage: 'https://bulma.io/images/placeholders/1280x960.png',
      avatar: this.defualtImage.sm,
    }
  },
  computed: {
    getImages() {
      let images = [getArtImage(this.pokemon)].concat(
        flatObjects(this.pokemon.sprites)
      )

      images = _.map(_.compact(images), (image, index) => {
        return { url: image, class: `item-${index + 1}` }
      })
      return images
    },

    getHeight() {
      return this.pokemon.height / 10
    },
    getWeight() {
      return this.pokemon.weight / 10
    },
  },
  mounted() {
    fetchPokemon.call(this, this.$route.params.pokename)
  },
  watch: {
    $route(to, from) {
      if (to.params.pokename !== from.params.pokename) {
        fetchPokemon.call(this, to.params.pokename)
      }
    },
  },
}
</script>
<style>
.pokeimage {
  border: 0.5px solid #ccc;
  margin-right: 2px;
}
.carousel {
  width: 100%;
  overflow: auto;
}
</style>
