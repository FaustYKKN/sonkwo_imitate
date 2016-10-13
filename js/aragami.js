$(function(){
	var goodsDetail = {
		init: function(){
			this.cartbtn = $('#cart');
			this.addCart();
		},
		addCart: function(){
			var that = this;
			this.cartbtn.click(function(){
				var cart = $.cookie('SK-cart') || '{}';
				cart = JSON.parse(cart);
				var goodsId = $('.game-header-left h2').data('id');
				if(!cart[goodsId]){
					cart[goodsId] = {
						goodsId: goodsId
					};
				}else{
					cart[goodsId] = {
						goodsId: goodsId
					};
				};
				//写到cookie中
				$.cookie('SK-cart',JSON.stringify(cart),{expires: 365,path:'/'});
				console.log(JSON.parse($.cookie('SK-cart')));
				alert('添加成功！快去购物车看看吧');
			});
		}
	};
	goodsDetail.init();
});