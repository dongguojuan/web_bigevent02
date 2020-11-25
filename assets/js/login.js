$(function (){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义验证规则
    var form=layui.form
    form.verify({
      pwd: [
        /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
      ],
      repwd: function (value) {
          var pwd = $('.reg-box [name="password"]').val()
          if(pwd!==value) return "俩次输入的密码不一致"
      }
    })
    // 2.注册功能
    var layer=layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/api/reguser",
            data: {
                username:$('.reg-box [name="username"]').val(),
                password:$('.reg-box [name="password"]').val()
            },
            success: function (res) {
                console.log(res);
                if(res.status!==0) return layer.msg(res.message)
                layer.msg('恭喜您，注册成功')
                // 注册成功清空输入框
                $('#form_reg')[0].reset()
                // 去登陆自动点击 切换登录
                $('#link_login').click()
            }
        })
    })
    // 3.登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/api/login",
            // 以序列化形式 获取form的输入值
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if(res.status!==0) return layer.msg(res.message)
                // 提示消息，保存token 跳转页面
                layer.msg('恭喜您，注册成功')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
    
}) 