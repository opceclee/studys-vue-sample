<template>
	<li class="nav-cart" @mouseenter="showCarHeadl" @mouseleave="hideCarHeadl">
		<a href="javascript:;" class="ball-rect">购物车</a>
		<!--根据class改变颜色-->
		<span class="cart-empty-num " :class="{'cart-num':count>0}">
			<i>{{count}}</i>
		</span>
		<div class="nav-cart-wrapper" v-if="carShow">
			<div class="nav-cart-list">
				<div class="empty" v-if="count<=0">
					<h3>购物车为空</h3>
					<p>您还没有选购任何商品，现在前往商城选购吧!</p>
				</div>
				<div class="full" v-else>
					<div class="nav-cart-items">
						<ul>
							<li class="clear" v-for="item,index in carPanelData">
								<div class="cart-item js-cart-item cart-item-sell">
									<div class="cart-item-inner">
										<div class="item-thumb">
											<img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'">
										</div>
										<div class="item-desc">
											<div class="cart-cell">
												<h4> 
													<a href="#/item/100027401">{{item.title}}</a>
												</h4>
												<p class="attrs">
													<span>{{item.spec_json.show_name}}</span>
												</p>
												<h6>
													<span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.count}}</span>
												</h6>
											</div>
										</div>
										<div class="del-btn" @click="delCarPanelHeadl(item.sku_id)">删除</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="nav-cart-total">
						<p>共 <strong class="ng-binding">{{count}}</strong> 件商品</p>
						<h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totle}}</span></h5>
						<h6>
							<router-link to="/cart" class="nav-cart-btn">去购物车</router-link>
						</h6>
					</div>
				</div>
			</div>
		</div>
		<transition
			name="ball"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:after-enter="afterEnter"
			v-bind:css="true"
		>
			<div class="addcart-mask" v-show="ball.show">
				<img class="mask-item"/>
			</div>
		</transition>
	</li>
</template>

<script>
	export default {
		computed: {
			carPanelData () {
				return this.$store.state.carPanelData
			},
			count () {
				return this.$store.getters.totleCount
			},
			totle () {
				return this.$store.getters.totlePanel
			},
			carShow () {
				return this.$store.state.carShow
			},
			ball () {
				return this.$store.state.ball
			}
		},
		methods: {
			delCarPanelHeadl (id) {
				this.$store.commit('delCarPanelData',id)
			},
			showCarHeadl () {
				this.$store.commit('showCar')
			},
			hideCarHeadl () {
				this.$store.commit('hideCar')
			},
			beforeEnter (el){
				let rect = this.ball.el.getBoundingClientRect()
				let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
				let ball = document.getElementsByClassName('mask-item')[0]
				let x = (rectEl.left + 16) - (rect.left + rect.width / 2)
				let y = rect.top + rect.height / 2 - rectEl.top + 5 - 16
				el.style.transform = 'translate3d(0,' + y + 'px,0)'
				ball.style.transform = 'translate3d(-' + x + 'px,0,0)'
				ball.src = this.ball.img
				console.log(this.ball.img)
			},
			enter (el) {
				let a = el.offsetHeight
				el.a = a
				el.style.transform = 'translate3d(0,0,0)'
				document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)' 
			},
			afterEnter () {
				this.ball.show = false
			}
		}
	}
</script>

<style>
	.ball-enter-active{
		transition: 1s cubic-bezier(.08,.76,.59,1.36);
	}
	.ball-enter-active .mask-item{
		transition: 1s cubic-bezier(0,0,1,1);
	}
	.mask-item{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		z-index: 9999;
	}
</style>