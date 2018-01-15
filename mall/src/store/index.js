import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		carPanelData: [],
		maxOff: false,
		carShow: false,
		carTime: null,
		ball:{
			show:false,
			el:null,
			img:''
		}
	},
	getters: {
		totleCount (state) {
			let count = 0
			state.carPanelData.forEach((goods) => {
				count += goods.count
			})
			return count
		},
		totlePanel (state) {
			let price = 0
			state.carPanelData.forEach((goods) => {
				price += goods.price * goods.count
			})
			return price
		}
	},
	mutations: {
		addCarPanelData (state,data){
			let bOff = true
			//加入购物车已存在
			state.carPanelData.forEach((goods) => {
				if (goods.sku_id === data.sku_id) {
					goods.count++
					bOff = false
					if (goods.count > goods.limit_num) {
						goods.count--
						state.maxOff = true
						return
					}
					state.carShow = true
				}
			})
			//无 添加一份
			if (bOff) {
				let goodsData = data
				//设置count的值
				Vue.set(goodsData,'count',1)
				state.carPanelData.push(goodsData);
				state.carShow = true
			}
			state.ball.show = true
			state.ball.img = data.ali_image
			state.ball.el = event.path[0]
		},
		delCarPanelData (state,id) {
			state.carPanelData.forEach((goods,index) => {
				if (goods.sku_id === id) {
					state.carPanelData.splice(index,1)
					return
				}
			})
		},
		closePrompt (state) {
			state.maxOff = false
		},
		showCar (state) {
			clearTimeout(state.carTime)
			state.carShow = true
		},
		hideCar (state) {
			state.carTime = setTimeout(() => {
				state.carShow = false
			},200)
		}
	}
})

export default store
