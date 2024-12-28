const { default: mongoose, Schema } = require("mongoose");


const cartSchema = mongoose.Schema(
    {
        quantity: {type: Number, required: true},
        product: {type: Schema.Types.ObjectId, ref: "product", required: true},
        user: {type: Schema.Types.ObjectId, ref: "user", required: true}
    },
    {
        versionKey: false,
        timestamps: true,
    }

);

const virtual = cartSchema.virtual("id");

virtual.get(function(){
    return this._id;
})

cartSchema.set("toJSON", {
    virtuals: true,
    transform: function(doc, ret){
        delete ret._id;
    },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;