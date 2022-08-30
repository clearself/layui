layui.define(['layer'],function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('mod1', callback);
  var obj = {
    toast: function(str){
      layer.msg('Hello '+ (str||'mymode'));
    }
  };
  
  //输出 mymod 接口
  exports('mymode', obj);
});    