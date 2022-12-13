module.exports = {
    eAdmin: function(req, resp, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }

        req.flash('error_msg', 'Você deve ser um administrador para acessar')
        resp.redirect('/')
    }
}