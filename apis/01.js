let express = require('express');
let router = express.Router();
var mongoose = require('mongoose');
var Transaction = require('../models/Transaction');
var TransactionSchema = require('../models/Transaction');
var db = require('../database/db');

/**
 * 
 * Middleware
 * 
 * 
 */
router.use(function(req,res,next) {
  var content_type = req.headers['content-type'];
  if(content_type === 'application/json') {
    next();
  } else {
      res.send({"Error": "Switch your content-type to application/json! \n /transid/:transid "})
  }

});



/**
 * POST / root (JSON)
 *  
 * RESPONSE (JSON)
 */
router.post('/', (req, res) => {
   
    ({
            name,
            date,
            amount,
            trans_id,
            user_id,
            is_recurring
        } = req.body);
        var errorlist = [];
    if(!req.body.user_id && !req.body.is_recurring) {
        res.send({"Error": "Fields are missing: name, date, amount, trans_id, user_id, is_recurring"})
    }
    else {
    var Transaction = new
    TransactionSchema(
        {
            name: name,
            date: date,
            amount: amount,
            trans_id: trans_id,
            user_id: user_id,
            is_recurring: is_recurring
         }
    );

    Transaction.save(async function(error, transaction) {
        // Magic happens.
        // console.log(`${userid}`);
        if(error) console.log(error);
         await TransactionSchema
            .find(
                {
                    user_id: user_id,
                    is_recurring: is_recurring,

                }
            ,null,{sort: {date: -1}},
          (error, transactions) => {
            transactions.unshift({"Upserted": `Transaction with the id ${transaction.user_id}`})
             res.status(200).send(transactions);
        
       });
    })
    }
});




/**
 * GET /transid/:transid
 * Get transaction by transaction ID in route
 * 
 * Example REQUEST (parameter): 
 * http://localhost:port/84
 * 
 * Example RESPONSE:
 * (JSON)
 * {
 *      ....data
 *      trans_id: 84
 * }
 */
router.get('/transid/:transid', function(req, res) {
    var transid = req.params.transid;
    TransactionSchema.find({ trans_id: transid},
        null, {sort: {date: -1}}, (error,transactions) => {
            transactions.unshift({"Returned": `Transactions with the id ${transid}`})
            res.send(transactions);
        })
})



/**
 * POST /max/  (JSON)
 * Retrieve transactions with a minimum amount of maxAmount
 * 
 * Example:
 * {
 *      maxAmount: 1000.000
 * }
 */
router.post('/max/', (req, res) => {
    if(!req.body) {
        res.send({"Error": "It must be in JSON."})
    } 

    ({
        maxAmount
    } = req.body)
    
    if(typeof maxAmount === 'number') {
        TransactionSchema.find({amount: {$lte: maxAmount}}, null,
        {sort: {date: -1}}, (error,transactions) => {
                transactions.unshift({"Returned": "Returned transactions"});
                res.send(transactions);
        });
    } else {
        res.send({"Error": "Values must be numbers. Check for double quotes."})
    }
})




/**
 * POST /min/ (JSON)
 * Retrieve transactions with a minimum amount of minAmount.
 *  Example:
 * {
 *      minAmount: 50.00
 * }
 */
router.post('/min/', (req, res) => {
    if(!req.body) {
        res.send({"Error": "It must be application/json"});
    }
    ({ 
        minAmount
    } = req.body)
    if(typeof minAmount === 'number') {
        TransactionSchema.find({amount: {$gt: minAmount}}, null,
            {sort: {date:-1}}, (error,transactions) => {
                    transactions.unshift({"Returned": `Min Amount ${minAmount}`});
                    res.send(transactions);
            });
    } else {
        res.send({"Error": "Values must be numbers. Check for double quotes."})
    }
})
/* 
    GET / (PLAIN ROUTE)
    Return all 
    recurring transactions (JSON)
*/
router.get('/', (req, res) => {
    res.send({"Welcome": " /max/ , /min/ for \n transactions with max and min amount \n, get transaction by id /transid \n  POST / root to Upsert a transaction and receive recurring payments.",
    "Insert Transaction": "POST / JSON { name, date, amount(Number), trans_id(Number), user_id(Number), is_recurring(String)"
})


});
module.exports = router;
