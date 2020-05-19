const indexCtrl = {};

const passport = require('passport');

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

module.exports = indexCtrl;