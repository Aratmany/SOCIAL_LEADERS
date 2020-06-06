const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const Activity = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: [Schema.Types.Buffer],
    create: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['ЖКХ', 'Экология', 'Медицина']
    },
    leaders: {
        type: [Schema.Types.ObjectId],
        ref: 'users'
    },
    status: {
        type: String,
        enum: ['Собирает поддержку', 'Передана органам власти', 'Принята к исполнению', 'Получен отказ', 'Реализована'],
        default: 'Собирает поддержку'
    }
})

module.exports = Activ = mongoose.model('activities', Activity)