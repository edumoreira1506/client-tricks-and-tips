const startAnimateButton = dom => {
    $(dom).html('<i class="fa fa-spinner fa-spin"></i>  Carregando')
    $(dom).attr('disabled',true)
}

const stopAnimateButton = (dom, content) => {
    $(dom).html(content)
    $(dom).attr('disabled', false)
}