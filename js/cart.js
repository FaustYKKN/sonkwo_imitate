$(function(){
	var cart = {
		init: function(){
			this.cart = null;
			this.payCart = {};
			this.initGame();
			this.deleteChoose();
			this.checkboxChange();
			this.selectAll();
			this.deleteSelected();
		},
		initGame: function(){
			var that = this;
			$.getJSON('js/game-data.json',function(result){
				//console.log(result)
				that.getSKCookie();
				for(var key in that.cart){
					(function(key){
						var game = $('.SK-cart-table-body');
						game.load('cart-info.html',function(){
							game.find('.game-details .price').attr('data-id',result[key]['game-id']);
							game.find('.game-details .name a').html(result[key]['game-name']);
							game.find('.game-details .tag').html(result[key]['game-type']);
							//game.find('.price').html(result[key]['game-price']);
							game.find('.game-details .price').attr('data-price',result[key]['game-price']);
							var money = result[key]['game-price'].toFixed(2);
							game.find('.game-details .price').html('￥'+money);
							//alert($('.game-details .price').data('price'));
						});
						
					})(key);
				};
			});
		},
		deleteChoose: function(){
			var that = this;
			$('.SK-cart-table-body').on('click','.oper',function(){
				//alert("ok")
				//var gameId = $(this).siblings('')
				var gameId = $(this).siblings('.price').data('id');
				delete that.cart[gameId];
				$(this).parents('.game-details').remove();
				that.setSKCookie();
				$('.num').html('￥0.00');
				$('.SK-cart-submit').removeClass('SK-order-enable')
				$('.SK-cart-submit').addClass('SK-order-disable')
			});
		},
		checkboxChange: function(){
			var that = this;
			$('.SK-cart-table-body').on('change','.game_item_check',function(){
				var id = $(this).parent().siblings('.price').data('id');
				console.log(id)
				if($(this).prop('checked')){
					var obj = {
						id: id,
						price: $(this).parent().siblings('.game-details .price').data('price')
					};
					//console.log(obj.price);
					that.payCart[id] = obj;
				}else{
					delete that.payCart[id];
				};
				var totalMoney = 0;
				var count = 0;
				for(var key in that.payCart){
					count ++;
					totalMoney += that.payCart[key].price;
				}
				$('.num').html('￥'+totalMoney.toFixed(2));
				$('.games-count').html(count);
				if(count > 0){
					//console.log(count);
					$('.SK-cart-submit').prop({
						disabled: false
					});
					$('.SK-cart-submit').removeClass('SK-order-disable');
					$('.SK-cart-submit').addClass('SK-order-enable');
				}else{
					//console.log(count);
					$('.SK-cart-submit').prop({
						disabled: true
					});
					$('.SK-cart-submit').removeClass('SK-order-enable');
					$('.SK-cart-submit').addClass('SK-order-disable');
				}
			});
		},
		deleteSelected: function(){
			var that = this;
			$('.SK-check-delete').click(function(){
				$('.game-details').each(function(k,v){
					if($(this).find('.game_item_check').prop('checked')){
						$(this).remove();
						var id = $(this).find('.price').data('id');
						console.log(id)
						delete that.cart[id];
						that.setSKCookie();
						$('.num').html('￥0.00');
						$('.SK-cart-submit').removeClass('SK-order-enable')
						$('.SK-cart-submit').addClass('SK-order-disable')
					}
				});
			});
		},
		selectAll: function(){
			$('.checkall').click(function(){
				if($(this).prop('checked')){
					$('input[type="checkbox"]').prop('checked',true);
					console.log('true')
				}else{
					$('input[type="checkbox"]').prop('checked',false);
					console.log('false')
				}
				$('.game_item_check').change();
			});
		},
		getSKCookie: function(){
			this.cart = $.cookie('SK-cart') || '{}';
			this.cart = JSON.parse(this.cart);
			//console.log(this.cart);
		},
		setSKCookie: function(){
			$.cookie('SK-cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		}

	};
	cart.init();
});