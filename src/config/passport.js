const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/Usuarios'); 

passport.use(new LocalStrategy({
  usernameField: 'usuario',
  passwordField: 'clave'
}, async (usuario, clave, done) => {
  // Match Email's User
  const user = await Usuario.findOne({usuario: usuario});
  if (!user) {
    return done(null, false, { message: 'Usuario no encontrado.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(clave);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Clave incorrecta.' });
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => {
    done(err, user);
  });
});