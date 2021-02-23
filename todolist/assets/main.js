// Connected //

// cross items
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

// add items dropbox
$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

// add items functionality 
$("input[type='text']").keypress(function(event){
    // if pressed enter
    if (event.which == 13) {
        // grab text
        var todoText = $(this).val();
        $(this).val("");
        // create new li and add to ul
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
    }
});

//Delete items
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});