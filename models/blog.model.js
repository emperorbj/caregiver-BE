const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now,
        required: false
    }
},{
    timestamps: true
})

const Blogs = mongoose.model("Blog", blogSchema);
module.exports = Blogs;