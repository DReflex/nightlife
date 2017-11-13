const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    id: SchemaTypes.Long,
    accessToken: String,
    expiresAt: SchemaTypes.Long,
    going_to: [],
    name: String,

});
const User = mongoose.model('user', UserSchema);
module.exports = User;
// User.create({id: 1, name: 'Minion'}, function(err, doc) {
//     // At this point the jobs collection is created.
// });
