const { Schema, model } = require("mongoose");

const EquipoSchema = new Schema({
  serie: { type: String, required: true },
  nombre_equipo: String,
  usuario_equipo: String,
  ip: { type: String, required: true },
  mac: { type: String, required: true },
  observacion: String,
  inventario: String,
  id_proveedor: String,
  equipamiento: String,
  creado_por : { type: String, required: true },
  activo: { type: Boolean, default: true },
});
module.exports = model("Equipo", EquipoSchema);