# Transaction
It actually works give it a shot
It's an API with a database of common monthly transactions and methods to sort them.
Demonstrating knowledge and expertise, ofcourse.
You can use browser or Postman to try it out.

## Routes
  ### Try sending a post request to root '/' with a json body.
   `
   { 
       name:
       date:
       amount:
       trans_id: Could be 1,2,3
       user_id: 1,2,3,4
       is_recurring: true or false
     }
   `
 #### You should see a success message and a transaction given back: 
      `{"Upserted": `Transaction with the id 3`

  ### Try viewing a specific transaction /transid/:transid
  #### You should get all transactions with that ID
  ### Try getting transactions under a max amount. localhost:3000/max/
     JSON.  
        `
          {
          maxAmount: 3500
          }`
  #### You should see a JSON message with transactions under that max amount.
  
  ### Try getting transactions under a min amount. localhost:3000/min/
     JSON.  
        `
          {
            minAmount: 1000
          }`
  #### You should see a JSON message with transactions under that max amount.
  
     
    
1. npm install 
2. npm start


