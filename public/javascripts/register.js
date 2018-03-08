$("#create").click(function(e) {
    e.preventDefault();
    $.post("register",{
            login: $("#newLogin").val(),
            password: $("#newPassword").val()
        }).done(function(msg){
            if(msg == "fail"){
                $("#exist").slideDown("slow");
                setTimeout(function(){
                    $("#exist").slideUp("slow");
                }, 5000);
            }else{
                $.post("login", {
                    login: $("#newLogin").val(),
                    password: $("#newPassword").val()
                }).done(function(msg){
                    if(msg == "good"){
                        window.location.replace("/panel");
                    }      
                })
            }
        })
});