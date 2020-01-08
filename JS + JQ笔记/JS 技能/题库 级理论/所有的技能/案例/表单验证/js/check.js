
var myForm = document.getElementById("myForm");
var username = myForm.username; // 用户名
var pws = myForm.pws; // 密码
var pwsD = myForm.pwsD; // 确认密码
var yzm = document.getElementById("yzm"); // 验证码
var submitBtn = document.getElementById("submitBtn"); // 提交按钮
var aEm = document.getElementsByTagName('em');
var changeImg = document.getElementsByClassName('changeImg')[0]; // 四位数的验证码

// 验证随机数
changeImg.innerHTML = getCode(4);
changeImg.onclick = function (){
	this.innerHTML = getCode(4);
	yzm.value = '';
}

var re = {
	user: /^[\w\u4e00-\u9fa5]{6,25}$/,
	pws: /^[\w\$\*\?]{6,12}$/,
	pws1: /[a-zA-Z]/,
	pws2: /\d/,
	pws3: /[\$\*\?_]/
}

// 用户名
username.onkeyup = function (){
	var val = this.value; // 输入框的值
	var iObject = getEle(this);
	var oI = iObject.i; // i
	var oStrong = iObject.strong; // strong
	if (re.user.test(val)) {
		oI.className = 'ok';
		oStrong.innerHTML = '';
	}else{
		oI.className = 'err';
		oStrong.innerHTML = '5-25个字符，一个汉字为两个字符，推荐使用中文会员名';
	}
}

// 密码
pws.onkeyup = function (){
	var val = this.value; // 输入框的值
	var iObject = getEle(this);
	var oI = iObject.i; // i
	var oStrong = iObject.strong; // strong
	
	if (re.pws.test(val)) {
		var num = 0;
		
		// 密码验证是通过的
		if (re.pws1.test(val)) {
			num ++;
		}
		if (re.pws2.test(val)) {
			num ++;
		}
		if (re.pws3.test(val)) {
			num ++;
		}
		
		for (var i=0; i<aEm.length; i++) {
			aEm[i].className = '';
		}
		aEm[num - 1].className = 'active';
		if (num === 3) {
			oI.className = 'ok';
			oStrong.innerHTML = '';
		}else{
			oI.className = 'err';
			oStrong.innerHTML = '5-25个字符';
		}
		
	}else{
		for (var i=0; i<aEm.length; i++) {
			aEm[i].className = '';
		}
		oI.className = 'err';
		oStrong.innerHTML = '5-25个字符';
	}
	
}

// 确认密码
pwsD.onkeyup = function (){
	var val = this.value; // 输入框的值
	var iObject = getEle(this);
	var oI = iObject.i; // i
	var oStrong = iObject.strong; // strong
	
	if (val && val === pws.value) {
		oI.className = 'ok';
		oStrong.innerHTML = '';
	}else{
		oI.className = 'err';
		oStrong.innerHTML = '请再输入一次';
	}
}

// 验证码
yzm.onkeyup = function (){
	var val = this.value; // 输入框的值
	var iObject = getEle(this);
	var oI = iObject.i; // i
	var oStrong = iObject.strong; // strong
	
	if (val === changeImg.innerHTML) {
		oI.className = 'ok';
		oStrong.innerHTML = '';
	} else{
		oI.className = 'err';
		oStrong.innerHTML = '请输入正确的验证码';
	}
}

// 点击登录
submitBtn.onclick = function (){
	username.onkeyup();
	pws.onkeyup();
	pwsD.onkeyup();
	yzm.onkeyup();
	var okI = document.getElementsByClassName('ok');
	if (okI.length === 4) {
		open('http://baidu.com');
	}
}

// 通过参数获取它对应的提示
function getEle(obj){
	var oParent = obj.parentNode.parentNode;
	var oMeg = oParent.getElementsByClassName('meg')[0];
	var oAti = oMeg.getElementsByTagName('i')[0];
	var oStrong = oMeg.getElementsByTagName('strong')[0];
	return {
		i: oAti,
		strong: oStrong
	}
}

function getRandom(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCode(n){
	var str = 'abcdefghijklmnopqrstuvwxyz';
	var newStr = '';
	for (var i=0; i<n; i++) {
		newStr += str[getRandom(0, str.length-1)];
	}
	return newStr;
}