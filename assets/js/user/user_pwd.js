$(function(){
    // 1.定义校验规则
    var form = layui.form
    form.verify({
          //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        //   1.1密码
          pwd: [
            /^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   1.2新旧不能一样
          samePwd: function(value){ //value：表单的值、item：表单的DOM对象
          if(value == $('[name="oldPwd"]').val()){
            return "新密码不能和原密码相同";
          }
      
      },
       //   1.3 新密码要和确认密码一致
       rePwd: function(value){ //value：表单的值、item：表单的DOM对象
        if(value !== $('[name="newPwd"]').val()){
          return "确认密码和新密码不相同";
        }
    }
    
    //我们既支持上述函数式的方式，也支持下述数组的形式
  })

//    2.表单提交
$(".layui-form").on('submit',function(e) {
    e.preventDefault()
    $.ajax({
        method:"POST",
        url:"/my/userinfo",
        data:$(this).serialize(),
        success: function(res) {
            if(res.status !==0){
                return layui.layer.msg(res.message)
            }
            layui.layer.msg("修改密码成功!")
            $(".layui-form")[0].reset()
        }
    })
})

})