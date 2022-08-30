layui.config({
	base: './js/modules/' //你存放新模块的目录，注意，不是 layui 的模块目录
}).extend({ 
	mymode: 'mods/mymode' //相对于上述 base 目录的子目录
}).use(['mymode'], function(){  //如果只加载一个模块，可以不填数组。如：layui.use('form')
var mymode = layui.mymode
  mymode.toast('2412')
});
      