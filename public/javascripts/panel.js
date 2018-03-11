$("#save").click(function(e) {
    e.preventDefault();
    $.post("panel/save",{
            note: $("#note").val(),
        }).done(function(msg){
            var tr = '<tr style="display:none"><td><p style="padding: .375rem .75rem; margin:0;">' + $("#note").val() + '</p></td>';
            tr += '<td><button id="delete" data-id="'+ msg +'" class="btn btn-danger">';
            tr += '<i class="fa fa-trash-o" aria-hidden="true"></i>';
            tr += '<span><strong> Usuń</strong></span></button> ';
            tr += '<button id="edit" data-id="'+ msg +'" class="btn btn-primary">';
            tr += '<i class="fa fa-pencil-square" aria-hidden="true"></i> <span><strong>Edytuj</strong></span>';          
            tr += '</button> </td> </tr>';
            $(tr).appendTo("tbody").fadeIn(3000);
            $("#note").val("");
        })
});