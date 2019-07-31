$(document).ready(function(){

    $('#register-form').submit(function(e){
        e.preventDefault();

        startAnimateButton('#button-register')
        
        let form = document.getElementById('register-form')
        let fd = new FormData(form);

        fd.append('image', $('#image')[0].files[0])

        $.ajax({
            type:'POST',
            url: '/register',
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
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