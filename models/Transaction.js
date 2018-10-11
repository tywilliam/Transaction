var mongoose = require('mongoose');
var TransactionSchema = mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    amount: {

        type: Number
    },
    trans_id: {
        type: Number

    },
    user_id: {
        type: Number
    },
    is_recurring:{
        type: String
    }

});
var Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

TransactionSchema.methods.IsRecurring = function(err, transactions) {
    return this.model('Transaction').find({ is_recurring: TRUE});
}
