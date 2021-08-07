const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    }, 
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const model = mongoose.model('User', UserSchema)

model.prototype.verifyPassword = async (password) => {
    let verify = await bcrypt.compare(password, this.password)
    return verify;
}


module.exports = model