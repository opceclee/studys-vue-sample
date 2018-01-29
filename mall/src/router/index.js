import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'

Vue.use(Router)

import Shop from '@/views/shop'
import Item from '@/views/item'
import Cart from '@/views/cart'
export default new Router({
	mode: 'history',
  routes: [
	  {
	  	path : '/',
	  	name : 'Shop',
	  	component : Shop
	  },
	  {
	  	path : '/item',
	  	name : 'Item',
	  	component : Item
	  },
	  {
	  	path : '/cart',
	  	name : 'Cart',
	  	component : Cart
	  }
  ]
})
