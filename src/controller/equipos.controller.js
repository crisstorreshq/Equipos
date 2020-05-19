const equipoCtrl = {};

const Equipo = require('../models/Equipos');

equipoCtrl.renderEquipoForm = (req, res) => {
    res.render('equipos/nuevo-equipo');
};

equipoCtrl.createNewEquipo = async(req, res) => {
    const { serie, nombre_equipo, usuario_equipo, ip, mac, observacion, inventario, id_proveedor, equipamiento } = req.body;
    const newEq = new Equipo({ serie, nombre_equipo, usuario_equipo, ip, mac, observacion, inventario, id_proveedor, equipamiento });
    newEq.creado_por = req.user.id;
    await newEq.save();
    req.flash('success_msg', 'Equipo ok');
    res.redirect('/equipos');
};

equipoCtrl.renderEquipos = async(req, res) => {
    const equipos = await Equipo.find({activo : true}).lean();
    res.render('equipos/equipos', { equipos });
};

equipoCtrl.renderEditForm = async (req, res) => {
    const equipo = await Equipo.findById(req.params.id).lean();
    res.render('equipos/editar', {equipo});
};

equipoCtrl.renderDeleteForm = async (req, res) => {
    await Equipo.findByIdAndUpdate(req.params.id, { activo : false });
    req.flash('success_msg', 'Equipo eliminado');
    res.redirect('/equipos');
};

equipoCtrl.updateEquipo = async (req, res) => {
    const { serie, nombre_equipo, usuario_equipo, ip, mac, observacion, inventario, id_proveedor, equipamiento } = req.body;
    await Equipo.findByIdAndUpdate(req.params.id, { serie, nombre_equipo, usuario_equipo, ip, mac, observacion, inventario, id_proveedor, equipamiento });
    req.flash('success_msg', 'Equipo actualizado');
    res.redirect('/equipos');
};

module.exports = equipoCtrl;