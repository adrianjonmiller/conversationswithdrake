DLN.Behaviors.header_collapse=function(o){function i(){var i=$(this).scrollTop();o.height(i>=0?n-i:n)}var n=o.height();/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||($(document).on("scroll",function(){i()}),$(document).on("load",function(){i()}))};