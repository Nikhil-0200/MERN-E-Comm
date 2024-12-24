const { default: mongoose, version } = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        label: {type: String, required: true, unique: true},
        value: {type: String, required: true, unique: true}
    },{
        versionKey: false,
        timestamps: true,
    }
);

const virtual = categorySchema.virtual("id");
virtual.get(function(){
    return this._id;
});

categorySchema.set("toJSON", {
    virtuals: true,
    transform: function(doc, ret){
        delete ret._id;
    },
});


const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;

