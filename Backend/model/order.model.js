const {mongoose, Schema} = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        items: {type: [Schema.Types.Mixed], required: true},
        totalItem: {type: Number, required: true},
        totalAmount: {type: Number, required: true},
        user: {type: Schema.Types.ObjectId, ref: "user", required: true},
        selectPayment: {type: String, required: true},
        selectAddress: {type: Schema.Types.Mixed, required: true},
        status: {type: String, default: "pending"}  
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const virtual = orderSchema.virtual("id");

virtual.get(function (){
    return this._id;
})

orderSchema.set("toJSON", {
    virtuals: true,
    transform: function(doc, ret){
        delete ret._id;
    }
});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;