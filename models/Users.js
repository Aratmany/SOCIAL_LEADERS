const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const UserSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Пользователь', 'Лидер', 'Организация', 'Орган власти']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    patronymic: String,
    bdate: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        enum: ["Барнаул", "Бийск", "Горно-Алтайск", "Красноярск", "Москва", "Санкт-Петербург"]
    },
    interests: {
        type: [String],
        enum: ['ЖКХ', 'Экология', 'Медицина'],
    },
    activity: {
        type: [Schema.Types.ObjectId],
        ref: 'activity',
        default: []
    },
    achivements: {
        type: [{
            id: {
                type: Number,
            },
            title: {
                type: String
            }, 
            isFinished: {
                type: Boolean
            } 
        }],
        default: [
            {id: 1, title: 'Зарегистрироваться в системе', isFinished: true},
            {id: 2, title: 'Отдать свой голос', isFinished: false},
            {id: 3, title: 'Создать инициативу', isFinished: false},
            {id: 4, title: 'Получить поддержку', isFinished: false},
            {id: 5, title: 'Добиться цели', isFinished: false}
        ]
    },
    likes: {
        type: Number,
        default: 1
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema)