/**
  index.js 项目 JS 主入口
  以依赖 layui 的 layer 和 form 模块为例
**/    
layui.config({
	base: './js/modules/' //你存放新模块的目录，注意，不是 layui 的模块目录
}).use(['layer', 'form','table','tabledata'], function(){
  var layer = layui.layer,
	  form = layui.form,
	  table = layui.table,
	  tabledata = layui.tabledata,
	  util = layui.util;
	  // 方法渲染
	  table.render({
		  elem: '#test'
		  ,height: 600
		  // ,url:'./data/tabledata.json'
		  ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
		  ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
		        layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] //自定义分页布局
		        //,curr: 5 //设定初始在第 5 页
				,limit:10
		        // ,groups: 1 //只显示 1 个连续页码
		        ,first: false //不显示首页
		        ,last: false //不显示尾页
		        
		   }
		   ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
		   ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
			 title: '提示'
			 ,layEvent: 'LAYTABLE_TIPS'
			 ,icon: 'layui-icon-tips'
		   }]
		   ,title: '用户数据表' //table 的大标题（在文件导出等地方会用到）
		   ,totalRow: true //开启合计  哪一列需要计算总数也需要设置totalRow: true
		   ,escape: true //是否开启 xss 字符过滤（默认 false）layui 2.6.8 新增
		   ,limits:[10,20,30,40,50]
		   ,limit:20 //优先级低于page里面的limit
		   ,text: { 
		       none: '暂无相关数据' //默认：无数据。
			}
			,skin: 'line' //行边框风格
			,even: true //开启隔行背景
			,size: 'lg' //小尺寸的表格 sm 小尺寸  lg大尺寸
		  ,cols: [[
			 {type: 'numbers', fixed: 'left'}
			,{type: 'checkbox', fixed: 'left'}
			,{field:'id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true, totalRowText: '合计'} //unresize是否禁用拖拽列宽（默认：false）
			,{field:'username', title: '用户名',edit: 'text'}
			,{field:'sex', title:'性别',  templet: '#switchTpl', unresize: true} // templet 可以是1、函数；2、模版字符；3、工具条模板
			,{field:'lock', title:'是否锁定', templet: '#checkboxTpl', unresize: true}
			,{field:'city', title: '城市',edit: 'text'}
			,{field:'sign', title: '签名'} //width 支持：数字、百分比和不填写。你还可以通过 minWidth 参数局部定义当前单元格的最小宽度，layui 2.2.1 新增
			,{field:'experience', title: '积分', sort: true, totalRow: true}
			,{field:'score', title: '评分', sort: true,totalRow: true,edit: 'text'}
			,{field:'classify', title: '职业'}
			,{field:'wealth', title: '财富', sort: true}
			,{fixed: 'right', title:'操作', toolbar: '#barDemo'}
		  ]]
		  ,data: tabledata
		});
		var objEdit = null
		//头工具栏事件
		  table.on('toolbar(test)', function(obj){
			  console.log('obj',obj)
			  objEdit = obj
		    var checkStatus = table.checkStatus(obj.config.id);
			console.log('checkStatus',checkStatus)
		    switch(obj.event){
		      case 'getCheckData':
		        var data = checkStatus.data;
				console.log('选中数据',data)
				if(data.length===0){
					layer.alert('请勾选数据！');
					return
				}
		        layer.alert(JSON.stringify(data));
		      break;
		      case 'getCheckLength':
		        var data = checkStatus.data;
		        layer.msg('选中了：'+ data.length + ' 个');
		      break;
		      case 'isAll':
		        layer.msg(checkStatus.isAll ? '全选': '未全选');
		      break;
		      
		      //自定义头工具栏右侧图标 - 提示
		      case 'LAYTABLE_TIPS':
		        layer.alert('这是工具栏右侧自定义的一个图标按钮');
		      break;
		    };
		  });
		  //监听行工具事件
		    table.on('tool(test)', function(obj){
		      var data = obj.data;
		      console.log(obj)
		      if(obj.event === 'del'){
		        layer.confirm('真的删除行么', function(index){
		          obj.del();
		          layer.close(index);
		        });
		      } else if(obj.event === 'edit'){
		        layer.prompt({
		          formType: 2
		          ,value: data.wealth
		        }, function(value, index){
		          obj.update({
		            wealth: value
		          });
		          layer.close(index);
		        });
		      }
		    });
			//监听单元格编辑
			  table.on('edit(test)', function(obj){
			    var value = obj.value //得到修改后的值
			    ,data = obj.data //得到所在行所有键值
			    ,field = obj.field; //得到字段
			    layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改值为：'+ util.escape(value));
			  });
			  
			  //监听性别操作
			    form.on('switch(sexDemo)', function(obj){
					console.log('性别操作',obj)
			      layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
			    });
			    
			    //监听锁定操作
			    form.on('checkbox(lockDemo)', function(obj){
					console.log('锁定操作',obj)
			      layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
			    });
});    