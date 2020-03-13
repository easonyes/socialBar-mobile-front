// 公共验证方法

/**
 * 邮箱验证格式
 */
const emailVali = (str) => {
    let email = str.trim()
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.(com|cn|net|org)$/;
　　if(myreg.test(email)){
　　　　return true;
　　}else{
　　　　return false;
	}
}



export default {
    emailVali: emailVali,
}