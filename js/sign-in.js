$(function(){
	var confirm = {
		init: function(){
			this.control = $('.SK-form-block .SK-form-control');
			this.submit = $('.SK-btn');
			this.form = $('.SK-form');
			this.reg = {
				login_name: true,
				password: true,
			}
			this.whenFocus();
			this.whenBlur();
			this.loginCheck();
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
				console.log("whenblur"+that.reg.login_name+"||"+that.reg.password)
			});
		},
		info: function(which,controlId){
			if(controlId == 'login_name'){
				var hintCon = '请输入一个有效的电子邮箱';
				var hint = this.hintCon(hintCon,1);
				$(which).parent().append(hint);
				$(which).removeClass('error');
			}else if(controlId == 'password'){
				var hintCon = '8-20位的数字、字母或符号';
				var hint = this.hintCon(hintCon,1);
				$(which).parent().append(hint);
				$(which).removeClass('error');
			}else{
				$(which).removeClass('error');
			};
		},
		ero: function(which,controlId){
			var regemail = /^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$/;
			var regphone = /^\d{11}$/;
			var regpw = /^[a-zA-Z0-9\!@#\$%\^\&\*\(\)-\+=_\.,\?]{8,20}$/;
			if(controlId == 'login_name' && !regemail.test($(which).val()) && !regphone.test($(which).val())){
				var hintCon = '请输入一个有效的电子邮箱或手机号';
				//alert("y")
				var hint = this.hintCon(hintCon);
				$(which).parent().append(hint);
				$(which).addClass('error');
				this.reg.login_name = false;
				//this.errorCount++;
			}else if(controlId == 'password' && !regpw.test($(which).val())){
				var hintCon = '8-20位的数字、字母或符号';
				var hint = this.hintCon(hintCon);
				$(which).parent().append(hint);
				$(which).addClass('error');
				this.reg.password = false;
				//this.errorCount++;
			}/*else{
				//this.errorCount=0;
				this.reg.login_name = true;
				this.reg.password = true;
			};*/
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
		loginCheck: function(){
			var that = this;
			this.form.submit(function(){
				//alert('wait')
				var flag = true;
				that.control.blur();
				for(var key in that.reg){
					if(that.reg[key] == false){
						flag = false;
						break;
					}
				}
				alert(flag);
				/*for(var key in this.reg){
						if(!this.reg[key]){
							alert("blur")
							flag = false;
							break;
						};
					};
				if(!flag){
					return false;
				}*/
				return false;
			});
			
		},
	};
	confirm.init();
});