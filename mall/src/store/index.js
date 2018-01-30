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
		/**
		 * 总量
		 */
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
			if(!state.ball.show){
				state.carPanelData.forEach((goods) => {
					if (goods.sku_id === data.info.sku_id) {
						goods.count += data.count
						bOff = false
						if (goods.count > goods.limit_num) {
							goods.count -= data.count
							state.maxOff = true
							return
						}
						state.carShow = true
						state.ball.show = true
						state.ball.img = data.info.ali_image
						state.ball.el = event.path[0]
					}
				})
				//无 添加一份
				if (bOff) {
					let goodsData = data.info
					//设置count的值
					Vue.set(goodsData,'count',data.count)
					state.carPanelData.push(goodsData);
					state.carShow = true
					state.ball.show = true
					state.ball.img = data.info.ali_image
					state.ball.el = event.path[0]
				}
			}
		},
		/**
		 * 删除
		 */
		delCarPanelData (state,id) {
			state.carPanelData.forEach((goods,index) => {
				if (goods.sku_id === id) {
					state.carPanelData.splice(index,1)
					return
				}
			})
		},
		/**
		 *清单数量加
		 */
		pluCarPanelData (state,id) {
			state.carPanelData.forEach((goods,index) => {
				if (goods.sku_id === id) {
					if (goods.count >= goods.limit_num) {
						return
					}
					goods.count++
					return
				}
			})
		},
		/**
		 * 清单数量减
		 */
		subCarPanelData (state,id) {
			state.carPanelData.forEach((goods,index) => {
				if (goods.sku_id === id) {
					if (goods.count <= 1) {
						return
					}
					goods.count--
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
