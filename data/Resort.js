const { Schema, model } = require('mongoose');

const ResortSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    date: {
        type: Date,
        default: Date.now
    },
});

const Resort = model('Resort', ResortSchema);

module.exports = Resort;
