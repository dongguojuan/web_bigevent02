$(function () {
    // 1.自定验证规则
    var form = layui.form
    form.verify({
        nickname: function(value){ //value：表单的值、item：表单的DOM对象
          if(value.length >6){
            return '用户昵称长度为1-6位之间！';
          }
        }
      
      });   
      
    //   2.先用户渲染:把用户登录时进来的用户名到基本资料
    initUserInfo()
    // 导出layer
    var layer = layui.layer
    function initUserInfo() {
      $.ajax({
       method: "GET",
       url:"/my/userinfo",
       success: function (res) {
           if(res.status!==0){
               return layer.msg(res.message)
           }
        //    成功后 用表单赋值插件中 渲染页面
        form.val("formUserInfo",res.data)
       }
      })  
    }

//    3.再重置
  $('#btnReset').on('click',function(e){
    //   阻止重置 防止点击重置按钮输入框内容清空
    e.preventDefault()
    // 重新渲染用户 如果用户改错名字想从新修改 点击重置就会会到自己本来的信息
    initUserInfo()
  })
//   4.修改用户信息
$(".layui-form").on('submit',function (e) {
    e.preventDefault()
    $.ajax({
        method:"POST",
        url:"/my/userinfo",
        // 获取表单的所有内容
        data:$(this).serialize(),
        success: function (res) {
           if(res.status !==0) {
               return layer.msg('用户信息修改失败')
           }
           layer.msg('恭喜您！用户信息修改成功')
        //    调用父页面中的 更新用户信息和头像方法  上面把信息传给后台 然后下面这个函数把信息获取过来再重新渲染
           window.parent.getUserInof()
        }
    })
})
})