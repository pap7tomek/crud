$("#save").click(function(e) {
    e.preventDefault();
    $.post("panel/save",{
            note: $("#note").val(),
        }).done(function(msg){
            if(msg == "good"){
                alert('dodano');
            };
        })
});