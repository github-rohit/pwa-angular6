const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { USER_STATUS } = require('../../config/config');

const dbSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {

            },
            message: '{value} is not a valid email.'
        }
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    passwd: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImage: {
        type: String,
    },
	aboutme: {
		type: String
	},
	gender: {
		type: String
	},
	country: {
		type: String
	},
	website: {
		type: String
	},
	facebook: {
		type: String
	},
	twitter: {
		type: String
	},
	google_plus: {
		type: String
	},
	linkedIn: {
		type: String
	},
	instagram: {
		type: String
	},
	tumblr: {
		type: String
	},
	pinterest: {
		type: String
	},
    status: {
        type: String,
        default: USER_STATUS.PENDING
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

dbSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    return _.pick(userObj, [
        '_id', 
        'email', 
        'name', 
        'profileImage',
        'aboutme',
        'gender',
        'country',
        'website',
        'facebook',
        'twitter',
        'google_plus',
        'linkedIn',
        'instagram',
        'tumblr',
        'pinterest',
        'status'
    ]);
}

dbSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('passwd')) {
        getEncryptPassword(user.passwd).then((passwd) => {
            user.passwd = passwd;
            next();
        }).catch(error => {
            next();
        })
    } else {
        next();
    }

});

dbSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
};

dbSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

dbSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = "auth";
    const token = jwt.sign({
        _id: user._id.toHexString(),
        name: user.name,
        email: user.email, access
    }, process.env.SECRET).toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
}

dbSchema.statics.findByCredentials = function (email, passwd) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject({
                COULD_NOT_FOUND: true
            });
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(passwd, user.passwd, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject({
                        INCORRECT_ANSWER_ENTERED: true
                    });
                }
            });
        });
    });
};
dbSchema.statics.updatePassword = function (id, passwd) {
    return getEncryptPassword(passwd).then((pwd) => {
        return User.findOneAndUpdate({
            _id: id
        }, {
            passwd: pwd
        });   
    });
}

const User = mongoose.model('User', dbSchema);

module.exports = { User }


function getEncryptPassword (passwd) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(passwd, salt, (err, hash) => {
                if (err) {
                    reject();
                } else {
                    resolve(hash);
                }
            });
        });
    });
}
