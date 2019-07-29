$(document).ready(function(){

    $('#login-form').submit(function(e){
        e.preventDefault();

        startAnimateButton('#button-login')

        let username = $('#username').val()
        let password = $('#password').val()

        $.ajax({
            type:'POST',
            url: 'login',
            data: { username, password },
			dataType: 'json',
            success: function(data){
                if(data.status){
                    window.location.href = "http://localhost:400";
                }else{
                    swal('Ops', data.message, 'error')
                }
                
                stopAnimateButton('#button-login', 'Login<img src="libraries/img/icons/double-arrow.png" alt="#">')
            }
        })
    })

})