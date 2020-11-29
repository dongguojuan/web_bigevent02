$(function(){
    initArtCateList()
    // 1.渲染页面
    var layer= layui.layer
    function initArtCateList(){
      $.ajax({
          method:"get",
          url:"/my/article/cates",
         success: function(res){
             console.log(res);
             if(res.status !==0) return layer.msg(res.message)
             var str =template('tpl_table',res)
             $('tbody').html(str)
         }
      })
    }

    //2. 添加文章
    var indexAdd=null
    $('#btnadd').on('click',function(){
        indexAdd=layer.open({
            type:1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $('#dialog').html()
          });     
            
    })
    var form=layui.form
 
    //2.1 添加文章的弹出框里 添加按钮 事件
    $("body").on('submit',"#form_Add",function (e) {
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/addcates",
            data: $(this).serialize(),
            success:function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // 关闭
                layer.close(indexAdd)
                initArtCateList()
            }
        })
    })
    
    // 3.编辑功能
    var indexEdit=null
    $('tbody').on("click","#edit",function () {
        indexEdit=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
          });

          var id= $(this).attr('data-id')
          console.log(id)
          $.ajax({
              method:"get",
              url:"/my/article/cates/" + id,
            success: function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                // 获取到值然后给了弹出层的表单
                form.val('qinaokw',res.data)
            }

          })   
            
    })
  
    // 4.修改事件 提交数据
    $('body').on('submit',"#btn_edit",function (e) {
        e.preventDefault()
        
        $.ajax({
            method:"post",
            url:"/my/article/updatecate",
            data: $(this).serialize(),
            success:function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                 // 关闭
                 layer.close(indexEdit)
                 initArtCateList()
            }
        })
    })
    // 5.删除事件 再渲染页面
    $("tbody").on('click',"#btn_del",function () {
        var id= $(this).attr("data-id")
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:"get",
                url:"/my/article/deletecate/"+ id,
                success:function (res) {
                    if(res.status !==0) return layer.msg(res.message)
                      // 关闭
                 layer.close(index)
                 initArtCateList()
                }
            })
           
          });
    })
})