/*
本页没有用css来写选项卡等等，全部用detach，是为了防止submit的错误提交bug！！！
验证码没有写，有时间再写
YDL已吐血。。。
 */
$(function(){
	$('.data-reactroot').load('sign-up-card.html',function(){
		var confirm = {
			init: function(){
				this.control = $('.SK-form-block .SK-form-control');
				this.submit = $('.SK-btn');
				this.whenFocus();
				this.whenBlur();
				this.submitCheck();
				//this.errorCount = 0;
				this.regUser = {
					email: true,
					phone_number: true,
				};
				this.regPw = {
					password: true,
					password_confirmation: true,
				};
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
					//console.log("when")
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
				}else if(controlId == 'phone_number'){
					var hintCon = '请输入有效的11位手机号';
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
				var regphone = /^\d{11}$/;
				var regpw = /^[a-zA-Z0-9\!@#\$%\^\&\*\(\)-\+=_\.,\?]{8,20}$/;
				if(controlId == 'email' && !regemail.test($(which).val())){
					var hintCon = '请输入一个有效的电子邮箱';
					//alert("y")
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.regUser.email = false;
					//this.reg.phone_number = true;
				}else if(controlId == 'phone_number' && !regphone.test($(which).val())){
					var hintCon = '请输入有效的11位手机号';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.regUser.phone_number = false;
					//this.reg.email = true;
				}else if(controlId == 'password' && !regpw.test($(which).val())){
					var hintCon = '8-20位的数字、字母或符号';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.regPw.password = false;
				}else if(controlId == 'password_confirmation' && !($(which).val() == $('#password').val())){
					var hintCon = '两次填写的密码不一致';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.regPw.password_confirmation = false;
				}else if(!$(which).val()){
					$(which).addClass('error');
					//this.errorCount++;
					//alert(controlId);
				}else if(controlId == 'email' && regemail.test($(which).val())){
					this.regUser.email = true;
				}else if(controlId == 'phone_number' && regphone.test($(which).val())){
					this.regUser.phone_number = true;
				}else if(controlId == 'password' && regpw.test($(which).val())){
					this.regPw.password = true;
				}else if(controlId == 'password_confirmation' && ($(which).val() == $('#password').val())){
					this.regPw.password_confirmation = true;
				}
			},
			hintCon: function(hintCon,tf){
				var hint = '';
				if(tf){
					var hintpre = '<div class="SK-form-hint info-hint"><i class="fa fa-exclamation-triangle"></i>';
				}else{
					var hintpre = '<div class="SK-form-hint error-hint"><i class="fa fa-times-circle"></i>';
				}
				//var hintpre = '<div class="SK-form-hint info-hint"><i class=icon-warning-sign></i>';
				var hinttail = '</div>'
				hint = hintpre + hintCon + hinttail;
				return hint;
			},
			submitCheck: function(){
				var that = this;
				$(form).submit(function(e){
					e.preventDefault();
					that.control.blur();
					var flagUser = true;
					var flagPw = true;
					for(var keyU in that.regUser){
						if(that.regUser[keyU]){
							flagUser = true;
							break;
						}else{
							flagUser = false;
						}
					};
					for(var keyP in that.regPw){
						if(!that.regPw[keyP]){
							flagPw = false;
							break;
						}else{
							flagPw = true;
						};
					};
					if(!flagPw || !flagUser){
						//that.control.blur();
						console.log('flagUser:'+ flagUser +"||flagPw"+flagPw);
						return false;
					}else{
						alert('杉果游戏欢迎您的加入！！！')
						//alert('Welcome!');
						window.location.href = 'sign_in.html';
						return true;
					}
				});
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
					that.credential.detach();
				});
				this.lastRadio.click(function(){
					//console.log('last')
					that.credential.insertAfter($(this).parents('.SK-form-block'));
					//$(this).parents('.SK-form-block')
				});
			},
		};

		radio.init();
		var tabChange = {
			init: function(){
				this.emailtab = $('.tabs li:first-child');
				this.phonetab = $('.tabs li:last-child');
				this.emailBlock = $('#email').parent();
				this.phoneBlock = $('#phone_number').parent();
				this.parentBody = $('.SK-form .SK-form-body');
				this.clickTab();

			},
			clickTab: function(){
				var that = this;
				this.phoneBlock.detach();
				this.emailtab.click(function(){
					$(this).siblings().removeClass('active')
					$(this).addClass('active');
					that.changeToEmail();
				});
				this.phonetab.click(function(){
					$(this).siblings().removeClass('active')
					$(this).addClass('active');
					that.changeToPhone();
				});
			},
			changeToEmail: function(){
				this.phoneBlock.detach();
				this.parentBody.prepend(this.emailBlock);
				
			},
			changeToPhone: function(){
				this.emailBlock.detach();
				this.parentBody.prepend(this.phoneBlock);
				
			},

		};
		tabChange.init();
	});

});
