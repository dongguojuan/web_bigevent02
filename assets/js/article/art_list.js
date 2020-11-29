$(function () {
    //1. 补0
    function Addzero(n) {
        return  n >=10? n:"0"+n
    }
    // 时间渲染 要写在前面 后面的模板字符串才能渲染
    template.defaults.imports.deteFormat = function (dtstr) {
        var dt = new Date(dtstr)

        var y = Addzero(dt.getFullYear())
        var m = Addzero(dt.getMonth()+1)
        var d = Addzero(dt.getDate())

        var hh = Addzero(dt.getHours())
        var mm = Addzero(dt.getMinutes())
        var ss = Addzero(dt.getSeconds())

        return y+"-"+m+"-"+d+" "+hh+":"+mm+":"+ss
    }
    var q = {
        pagenum: 1,//页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: "",//文章分类的Id
        state: "", //状态
    }
    xuanran()
    var layer = layui.layer
    function xuanran() {
        $.ajax({
            method:"get",
            url:"/my/article/list",
            data:q,
            success: function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                var str = template('tpl_table',res)
                $('tbody').html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }
    // 2.分类下拉渲染
    var form = layui.form
    initCate()
    function initCate() {
      $.ajax({
          method:"get",
          url:"/my/article/cates",
          success: function (res) {
             if(res.status !==0)  return layer.msg(res.message)
            //  渲染结构
            var str= template('tpl_cate',res)
            $("[name=cate_id]").html(str)
            // 有问题
              form.render();
          }
      })  
    }
    // 3.筛选功能
    $('#form_search').on('submit',function(e){
        e.preventDefault()
        // 获取
        var state = $('[name="state"]').val()
        var cate_id = $('[name="cate_id"]').val()
        //赋值
        q.state = state
        q.cate_id = cate_id
        // 初始化文章列表
        xuanran()
    })

    // 5 分页
    var laypage = layui.laypage
    function renderPage(total) {
    //    执行一个laypage实例
    laypage.render({
        elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
        count: total, //数据总数，从服务端得到
        limit:q.pagesize,//每页几条
        curr:q.pagenum,//当前页码
        // 分页模块设置，显示哪些子模块
        layout:["count","limit","prev","page","next","skip"],
        limits:[ 2, 3, 4, 5, 10],//每页显示多少条数据
        // 触发 页码改变
        jump: function (obj,first) {
            // obj:所有参数所在的对象；first: e是否是第一次初始化分页
            // 改变当前页
            // console.log(obj);
            console.log(first);
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            // 判断 不是第一次初始化分页，才能重新调用初始化文章列表
            if(!first) {
              xuanran()
                
            }
            
        }
    })
        
    }
//    6.删除
// 判断 数据的的长度不能用id 具有唯一性 要用class
    $('tbody').on('click',".btn_del",function (){
        var id = $(this).attr("data-id")
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
           $.ajax({
               method:"get",
               url:"/my/article/delete/" + id,
               success: function (res) {
                  if(res.status !== 0 ) return layer.msg(res.message)
                  layer.msg(res.message)
                  if($(".btn_del").length == 1 && q.pegenum > 1) q.pagenum--;
                //   重新渲染
                   xuanran(".btn_del")
                  
               }
               
           })
            
            layer.close(index);
          });
    })

})