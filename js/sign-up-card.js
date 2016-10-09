$(function(){
	$('.data-reactroot').load('sign-up-card.html',function(){
		var confirm = {
			init: function(){
				this.control = $('.SK-form-block .SK-form-control');

				this.whenFocus();
				this.whenBlur();
			},
			whenFocus: function(){
				var that = this;
				this.control.focus(function(){
					var controlId = $(this).attr('id');
					$(this).next('.SK-form-hint').remove();
					//console.log(controlId);
					that.info(this,controlId);
				});
			},
			whenBlur: function(){
				var that = this;
				this.control.blur(function(){
					//that.ero(this);
					var controlId = $(this).attr('id');
					$(this).next('.SK-form-hint').remove();
					that.ero(this,controlId);
				});
			},
			info: function(which,controlId){
				if(controlId == 'email'){
					var hintCon = '请输入一个有效的电子邮箱';
					var hint = this.hintCon(hintCon,1);
					$(which).parent().append(hint);
					$(which).removeClass('error');
				}else if(controlId == 'password'){
					var hintCon = '8-20位的数字、字母或符号';
					var hint = this.hintCon(hintCon,1);
					$(which).parent().append(hint);
					$(which).removeClass('error');
				}else if(controlId == 'password_confirmation'){
					var hintCon = '请再次填写密码';
					var hint = this.hintCon(hintCon,1);
					$(which).parent().append(hint);
					$(which).removeClass('error');
				}else{
					$(which).removeClass('error');
				}
			},
			ero: function(which,controlId){
				var regemail = /^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/;
				var regpw = /^[a-zA-Z0-9\!@#\$%\^\&\*\(\)-\+=_\.,\?]{8,20}$/;
				if(controlId == 'email' && !regemail.test($(which).val())){
					var hintCon = '请输入一个有效的电子邮箱';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
				}else if(controlId == 'password' && !regpw.test($(which).val())){
					var hintCon = '8-20位的数字、字母或符号';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
				}else if(controlId == 'password_confirmation' && !($(which).val() == $('#password').val())){
					var hintCon = '两次填写的密码不一致';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
				}else if(!$(which).val()){
					$(which).addClass('error');
				}
			},
			hintCon: function(hintCon,tf){
				var hint = '';
				if(tf){
					var hintpre = '<div class="SK-form-hint info-hint"><i class=icon-warning-sign></i>';
				}else{
					var hintpre = '<div class="SK-form-hint error-hint"><i class=icon-ban-circle></i>';
				}
				//var hintpre = '<div class="SK-form-hint info-hint"><i class=icon-warning-sign></i>';
				var hinttail = '</div>'
				hint = hintpre + hintCon + hinttail;
				return hint;
			},

		};
		confirm.init();
		var radio = {
			init: function(){
				this.firstRadio = $('#account_anti_addiction_false');
				this.lastRadio = $('#account_anti_addiction_true');
				this.credential = $('.SK-credential');
				this.whenChoose();
			},
			whenChoose: function(){
				var that = this;
				this.firstRadio.click(function(){
					//console.log('first')
					that.credential.remove();
				});
				this.lastRadio.click(function(){
					//console.log('last')
					that.credential.insertAfter($(this).parents('.SK-form-block'));
					//$(this).parents('.SK-form-block')
				});
			},
		};
		radio.init();
	});
});