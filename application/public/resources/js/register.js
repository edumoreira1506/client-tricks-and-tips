$(document).ready(function(){

    $('#register-form').submit(function(e){
        e.preventDefault();

        startAnimateButton('#button-register')

        let username = $('#username').val();
        let email = $('#email').val();
        let confirmPassword = $('#confirm-password').val();
        let bornDate = $('#born-date').val();
        let description = $('#description').val();
        let password = $('#password').val();

        $.ajax({
            type:'POST',
            url: 'register',
            data: { username, email, confirmPassword, bornDate, description, password },
			dataType: 'json',
            success: function(data){
                if(data.status){
                    swal('Boa!','Registro efeutado com sucesso!','success').then(() => {
                        window.location.href = "http://localhost:400/login";
                    })
                }else{
                    swal('Ops', data.message, 'error')
                }
                
                stopAnimateButton('#button-register', 'Registrar<img src="libraries/img/icons/double-arrow.png" alt="#">')
            }
        })
    })

})