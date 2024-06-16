import express from  'express';
import 'dotenv/config'
import initApp from './app.router.js'
const app = express();
const PORT= process.env.PORT || 4000 ; 

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    if(event.type == 'checkout.session.completed'){
        console.log('create order....');
        const checkoutSessionCompleted = event.data.object; 
    }else{
        console.log(`Unhandled event type ${event.type}`);
    }
    
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  initApp(express,app)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})