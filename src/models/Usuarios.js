const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const rolSchema = new Schema({ equipos: { type: String, default: 'estandar', required: true } });

const UserSchema = new Schema({
  nombre: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  rol: rolSchema,
  activo: { type: Boolean, default: true },
});

UserSchema.methods.encryptPassword = async clave => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(clave, salt);
};

UserSchema.methods.matchPassword = async function(clave) {
  return await bcrypt.compare(clave, this.clave);
};

module.exports = model("Usuario", UserSchema);