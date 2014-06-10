DLN.Behaviors.header_collapse = function(container){
	var container_height = container.height();

	$(document).on("scroll", function(){
		var offset = $(this).scrollTop();

		if(offset >= 0) {
			container.height(container_height - offset);
		} else {
			container.height(container_height);
		}
	});
};