import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		carPanelData: []
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
				}
			})
			//无 添加一份
			if(bOff){
				let goodsData = data
				//设置count的值
				Vue.set(goodsData,'count',1)
				state.carPanelData.push(goodsData);
			}
			console.log(state.carPanelData);
			
		},
		delCarPanelData (state,id) {
			state.carPanelData.forEach((goods,index) => {
				if(goods.sku_id === id){
					state.carPanelData.splice(index,1)
					return
				}
			})
		}
	}
})

export default store
