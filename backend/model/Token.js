const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    },
    token:{
        type:String,
        require:true,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("token",tokenSchema)