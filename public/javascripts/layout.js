$("#submit").click(function(e) {
    e.preventDefault();
    $.post("login",{
            login: $("#login").val(),
            password: $("#password").val()
        }).done(function(msg){
            if(msg == "fail"){
                $("#badLogin").slideDown("slow");
                setTimeout(function(){
                    $("#badLogin").slideUp("slow");
                }, 5000);
            }else{
                window.location.replace("/panel");
            }
        })
});