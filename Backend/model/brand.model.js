const { default: mongoose, version } = require("mongoose");

const brandSchema = mongoose.Schema(
    {
        label: {type: String, required: true, unique: true},
        value: {type: String, required: true, unique: true}
    },{
        versionKey: false,
        timestamps: true,
    }
);

const virtual = brandSchema.virtual("id");
virtual.get(function(){
    return this._id;
});

brandSchema.set("toJSON", {
    virtuals: true,
    transform: function(doc, ret){
        delete ret._id;
    },
});


const brandModel = mongoose.model("brand", brandSchema);

module.exports = brandModel;

