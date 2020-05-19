const userCtrl = {};

const passport = require('passport');

const Usuario = require('../models/Usuarios');

userCtrl.registroForm = (req, res) => {
    res.render('usuarios/registro');
};

userCtrl.registro = async (req, res) => {
    const errors = [];
    const {nombre, usuario, clave, confirma_clave } = req.body;
    if(clave != confirma_clave){
        errors.push({text : 'Claves no coinciden'});
    }
    if (clave.length < 4){
        errors.push({text : 'Clave deberia tener al menos 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('usuarios/registro', {errors, nombre, usuario})
    }
    else {
        const userToCreate = await Usuario.findOne({usuario:usuario});
        if(userToCreate){
            req.flash('error_msg', 'Ya existe el usuario');
            res.redirect('registro');
        } else {
            const nuevoUser = new Usuario({ nombre, usuario, clave});
            nuevoUser.clave = await nuevoUser.encryptPassword(clave);
            await nuevoUser.save();
            req.flash('success_msg', 'Usuario Registrado');
            res.redirect('registrarse');
        }
    }
};

userCtrl.registrarseForm = (req, res) => {
    res.render('usuarios/registrarse');
};

userCtrl.registrarse = passport.authenticate('local', {
    failureRedirect: '/usuarios/registrarse',
    successRedirect: '/equipos',
    failureFlash: true
})

userCtrl.logout = (req, res)=> {
    req.logout();
    req.flash('success_msg', 'Sesion cerrada');
    res.redirect('registrarse');
};

module.exports = userCtrl;