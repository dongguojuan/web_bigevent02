var url='http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url =url+ options.url
   

    // 2.对需要权限的接口配置头信息
    if(options.url.indexOf('/my/') !==-1){
      options.headers = {
      Authorization: localStorage.getItem('token') ||''
     }
    }
    //   3.拦截所有响应，判断身份认证信息
    options.complete =function (res) {
      console.log(res.responseJSON);
      var obj = res.responseJSON
      if(obj.status ==1 && obj.message == "身份认证失败！") {
        // 1.如果身份认证失败就清空 本地的token权限
        localStorage.removeItem('token')
        // 2.然后让页面跳到登录的界面
        location.href = "/login.html"
      }
    }

  })