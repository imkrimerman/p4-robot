'use strict'

module.exports = function(_path_, chmod) {
  _path_ = path.join(process.cwd(), _path_);
  if (! fs.existsSync(_path_)) return false;
  var _chmod = fs.statSync(_path_);
  if (_chmod && _chmod.mode) {
    return this.modes[_chmod.mode] === chmod;
  }
  return false;
};
