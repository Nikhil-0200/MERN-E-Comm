const { default: mongoose, Schema, version } = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true, default: "user"},
        addresses: {type: [Schema.Types.Mixed]},
        // We can make a separate schema for this.
        name:{type: String},
        resetPasswordToken: {type: String, default: ""}
    },{
        versionKey: false,
        timestamps: true,
    }
);

const virtual = userSchema.virtual("id");

virtual.get(function(){
    return this._id;
})

userSchema.set("toJSON", {
    virtuals: true,
    transform: function(doc, ret){
        delete ret._id;
    },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;