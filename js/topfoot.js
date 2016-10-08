$(function(){
	$('.SK-topper').load('topper.html',function(){
		//alert('wtf')
		var pulldown = {
			init: function(){
				//定义变量对象
				this.searchType = $('.SK-search-type');
				this.triangle = $('.SK-search-type-triangle');
				this.typeUl = $('.SK-search-type ul');
				this.owner = $('.owner');
				this.ownerUl = $('.SK-pulldown-menu');
				//调用方法
				this.enter();
				this.leave();
			},
			enter: function(){
				var that = this;
				this.searchType.mouseenter(function(){
					that.showSearch();
				});
				this.owner.mouseenter(function(){
					that.showOwnerUl();
				});
			},
			leave: function(){
				var that = this;
				this.searchType.mouseleave(function(){
					that.hideSearch();
				});
				this.owner.mouseleave(function(){
					that.hideOwnerUl();
				});
			},
			showSearch: function(){
				this.triangle.css({
					borderColor: '#2b2b2b transparent transparent transparent',
					top: 13,
					right: 4
				});
				this.typeUl.removeClass('SK-search-type-hide');
				this.typeUl.addClass('SK-search-type-ul');
			},
			hideSearch: function(){
				this.triangle.css({
					borderColor: 'transparent transparent transparent #2b2b2b',
					top: 11,
					right: 2
				});
				this.typeUl.removeClass('SK-search-type-ul');
				this.typeUl.addClass('SK-search-type-hide');
			},
			showOwnerUl: function(){
				this.ownerUl.css({
					display: 'block'
				});
			},
			hideOwnerUl: function(){
				this.ownerUl.css({
					display: 'none'
				});
			},
		};
		pulldown.init();
	});
	$('.SK-footer').load('footer.html');
});