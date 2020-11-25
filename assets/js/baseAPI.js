var url='http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url =url+ options.url
  })