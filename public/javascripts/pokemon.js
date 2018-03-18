var id = 7;
var tmp = 1;
$(window).on("scroll", function() {
	var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) / scrollHeight === 0 && tmp) {
        id += 3;
        tmp = 0;
        $(".loader-wrapper").show();
	   $.post("pokemon/add", {
            id: id
        }).done(function(msg){
            console.log(msg[0]);
            for(var i = 0; i < 3; i++){
                $( ".container" ).append('<figure><img style="height:150px; width:150px;"src="'+msg[i].photo+'" data-id="'+msg[i].id+'"><figcaption>'+msg[i].name+'</figcaption></figure>');
            }
            tmp = 1;
            $(".loader-wrapper").hide();
        })
	}
});