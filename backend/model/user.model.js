const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //Tên đăng nhập
    Username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 20,
    },

    //Mật khẩu
    Password: {
        type: String,
        required: true,
        minlength: 6,
    },

    //Email
    Email: {
        type: String,
        required: true,
        // unique: true,
    },

    //Họ và tên
    Name: {
        type: String,
        require: true,
    },

    Favorite: [{
        type: mongoose.Schema.Types.ObjectId, ref: "subject" ,
        default: [],
    }],

    History:[{
        type: mongoose.Schema.Types.ObjectId, ref: "history" ,
        default: [],
    }],
    //Chuc vu
    Clasify: {
        type: Number,
        require: true,
        default: 1,
        //0 admin
        //1 user
    },
    Locked:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', userSchema);