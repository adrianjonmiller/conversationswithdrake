DLN.Behaviors.header_collapse = function(container){
	var container_height = container.height();

	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		$(document).on("scroll", function(){
			offset_header();
		});

		$(document).on("load", function(){
			offset_header();
		});
	}
	
	function offset_header() {
		var offset = $(this).scrollTop();

		if(offset >= 0) {
			container.height(container_height - offset);
		} else {
			container.height(container_height);
		}
	}
};


