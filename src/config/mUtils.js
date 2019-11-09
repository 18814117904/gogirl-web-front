/**
 * 存储sessionStorage
 */
export const setSessionStorage = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStorage = name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeSessionStorage = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}
/**
 * 存储localStorage
 */
export const setLocalStorage = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getLocalStorage = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeLocalStorage = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

//设置Cookie
// 第一参数：必填，设置cookie的名称
// 第二参数：必填，设置改名称下cookie的值(内容)
// 第三参数：必填，number 设置cookie过期的时间，不填或者填0都为默认，默认浏览器关闭时移除 
// 第四参数：选填，设置cookie的路径。
export const setCookie = (name, value, lostTime, path) => {

    let str_cookie = name + "=" + value;
    if (lostTime) {
        let Cookietime = new Date();
        Cookietime.setDate(Cookietime.getDate() + lostTime);
        str_cookie +=';expires=' + Cookietime;
    }
    if(path){
		str_cookie +=';path='+path;
	}
    document.cookie = str_cookie;
}

//获取Cookie

export const getCookie = name => {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == name) {
            return arr2[1]
        }
    }
    return ""
}
//删除Cookie

export const removeCookie = (name, path) => {

    if (path) {
        setCookie(name, 1, -1, path);
    } else {
        setCookie(name, 1, -1);
    }
}




 export const getBase64 = (img) => {//传入图片路径，返回base64
        function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
          var canvas = document.createElement("canvas");
          canvas.width = width ? width : img.width;
          canvas.height = height ? height : img.height;
 
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//        var dataURL = canvas.toDataURL();
          var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
          var dataURL = canvas.toDataURL("image/"+ext);
          return dataURL;
        }
        var image = new Image();
        image.crossOrigin = '';
        image.src = img;
        var deferred=$.Deferred();
        if(img){
          image.onload =function (){
            deferred.resolve(getBase64Image(image));//将base64传给done上传处理
          }
          return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        }
      }