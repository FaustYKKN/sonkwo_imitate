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
				this.errorCount = 0;
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
					console.log("when")
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
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.errorCount++;
				}else if(controlId == 'phone_number' && !regphone.test($(which).val())){
					var hintCon = '请输入有效的11位手机号';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.errorCount++;
				}else if(controlId == 'password' && !regpw.test($(which).val())){
					var hintCon = '8-20位的数字、字母或符号';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.errorCount++;
				}else if(controlId == 'password_confirmation' && !($(which).val() == $('#password').val())){
					var hintCon = '两次填写的密码不一致';
					var hint = this.hintCon(hintCon);
					$(which).parent().append(hint);
					$(which).addClass('error');
					this.errorCount++;
				}else if(!$(which).val()){
					$(which).addClass('error');
					this.errorCount++;
				}else{
					this.errorCount=0;
				};
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
			submitCheck: function(){
				var that = this;
				$(form).submit(function(){
					that.control.blur();
					if(that.errorCount != 0 ){
						//that.control.blur();
						console.log('f:'+that.errorCount)
						return false;
					}else{
						alert('gongxi:'+that.errorCount)
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
