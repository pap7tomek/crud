$("#save").click(function(e) {
    e.preventDefault();
    $.post("panel/save",{
            note: $("#note").val(),
        }).done(function(msg){
            if(msg !== "fail"){
                var tr = '<tr style="display:none"><td><p style="padding: .375rem .75rem; margin:0;">' + $("#note").val() + '</p></td>';
                tr += '<td><button data-id="'+ msg +'" class="btn btn-danger delete">';
                tr += '<i class="fa fa-trash-o" aria-hidden="true"></i>';
                tr += '<span><strong> Usuń</strong></span></button> ';
                tr += '<button data-id="'+ msg +'" class="btn btn-primary edit">';
                tr += '<i class="fa fa-pencil-square" aria-hidden="true"></i> <span><strong>Edytuj</strong></span>';          
                tr += '</button> </td> </tr>';
                $(tr).appendTo("tbody").fadeIn(3000);
                $("#note").val("");
            }    
        })
});

$("body").on("click", ".delete", function(e){
    e.preventDefault();
    var tmp = $(this);
    $.post("panel/delete",{
        idNote: tmp.data("id")
    }).done(function(msg){
        if(msg === "good"){
           tmp.parent().parent().fadeOut(3000);
        }
    })
});

$("body").on("click", ".edit", function(e){
    e.preventDefault();
    $(this).html('<i class="fa fa-save" aria-hidden="true"> </i><span><strong> Zapisz</strong></span> ');
    $(this).addClass("edit2");
    $(this).removeClass("edit");
    var text = $(this).parent().parent().find('p').text();
    $(this).parent().parent().find('p').remove();
    $(this).parent().parent().find('td:first').html('<textarea class="form-control new-note" rows="1">'+ text +'</textarea>');
});

$("body").on("click", ".edit2", function(e){
    e.preventDefault();
    var text = $(this).parent().parent().find('textarea').val();
    console.log(text);
    $(this).html('<i class="fa fa-pencil-square" aria-hidden="true"></i><span><strong> Edytuj</strong></span>');
    $(this).parent().parent().find('textarea').remove();
    $(this).parent().parent().find('td:first').html('<p style="padding: .375rem .75rem; margin:0;">'+ text +'</p>');
    $(this).removeClass("edit2");
    $(this).addClass("edit");
    $.post("panel/edit",{
        text: text,
        idNote: $(this).data('id')
    }).done(function(msg){
        if(msg === "good"){
            $('.modal').modal('show')
        }    
    })
});