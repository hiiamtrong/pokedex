import { createWebHistory, createRouter } from 'vue-router'

import PokemonDetail from '@/components/pokemon/PokemonDetail'
import PokemonList from '@/components/pokemon/PokemonList'
const routes = [
  {
    path: '/pokemon/:pokename',
    name: 'detail',
    component: PokemonDetail,
  },
  {
    path: '/',
    name: 'home',
    component: PokemonList,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
