$(function(){
    // 获取用户信息
    getUserInof()
    // 2.退出
    var layer = layui.layer
   $('#btnLogout').on('click',function(){
    //    框架提供询问的问题
    layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
        // 1.清空本地token
        localStorage.removeItem('token')
        // 2.页面跳转
       location.href = "/login.html"
        // 关闭询问
        layer.close(index);
      });
   })



})
function getUserInof() {
    $.ajax({
        method:"GET",
        url:"/my/userinfo",
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''  
        },
        success:function (res) {
            if(res.status !==0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
 function renderAvatar(user) {
    //  1.获取用户的名称
    var name = user.nickname ||user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;"+name)
    if(user.user_pic!==null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        // 如果没有就显示用户名的首字母大写头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
 }