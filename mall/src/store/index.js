import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {
		carPanelData: [],
		receiveInfo: [{
	      'name': '王某某',
	      'phone': '13811111111',
	      'areaCode': '010',
	      'landLine': '64627856',
	      'provinceId': 110000,
	      'province': '北京市',
	      'cityId': 110100,
	      'city': '市辖区',
	      'countyId': 110106,
	      'county': '海淀区',
	      'add': '上地十街辉煌国际西6号楼319室',
	      'default': true
	    },{
	      'name': '李某某',
	      'phone': '13811111111',
	      'areaCode': '010',
	      'landLine': '64627856',
	      'provinceId': 110000,
	      'province': '北京市',
	      'cityId': 110100,
	      'city': '市辖区',
	      'countyId': 110106,
	      'county': '海淀区',
	      'add': '上地十街辉煌国际东6号楼350室',
	      'default': false
	    }],
		maxOff: false,
		carShow: false,
		carTime: null,
		ball:{
			show:false,
			el:null,
			img:''
		}
	},
	/**
	 * 计算
	 */
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
		},
		/**
		 * 监听全选状态 
		 */
		allChecked (state) {
			let allCheck = true
			state.carPanelData.forEach((goods) => {
				if (!goods.isChecked) {
					allCheck = false
					return
				}
			})
			return allCheck
		},
		/**
		 * 计算选中商品总数
		 */
		checkCount (state) {
			let count = 0
			state.carPanelData.forEach((goods,index) => {
				if (goods.isChecked) {
					count += goods.count
				}
			})
			return count
		},
		/**
		 * 计算选中商品总价
		 */
		checkPrice (state) {
			let price = 0
			state.carPanelData.forEach((goods,index) => {
				if (goods.isChecked) {
					price += goods.count * goods.price
				}
			})
			return price
		},
		/**
		 * 选中结算商品
		 */
		checkGoods (state) {
			let checkGoods = []
			state.carPanelData.forEach((goods) => {
				if　(goods.isChecked)　{
					checkGoods.push(goods)
				}
			})
			return checkGoods
		}
	},
	mutations: {
		addCarPanelData (state,data){
			let bOff = true
			/**
			 * 加入购物车已存在
			 */
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
					Vue.set(goodsData,'isChecked',true)
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
		},
		/**
		 * 单选点击事件
		 */
		isChecked (state,id) {
			state.carPanelData.forEach((goods,index) => {
				if (goods.sku_id === id) {
					goods.isChecked = !goods.isChecked
					return
				}
			})
		},
		/**
		 * 全选点击事件
		 */
		isAllChecked (state,allCheck) {
			state.carPanelData.forEach((goods,index) => {
				goods.isChecked = !allCheck
			})
		},
		/**
		 * 选中商品删除,小技巧删除从后往前删
		 */
		delCheckGoods (state) {
			let i = state.carPanelData.length
			while　(i--) {
				if (state.carPanelData[i].isChecked) {
					state.carPanelData.splice(i,1)
				}
			}
		},
		/**
		 * 提交
		 */
		submitFrom (state,data) {
			if (data.default) {
				state.receiveInfo.forEach((receive) => {
					receive.default = false
				})
			}
			state.receiveInfo.push(data)
		}
	}
})

export default store
