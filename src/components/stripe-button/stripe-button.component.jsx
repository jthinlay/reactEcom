import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_nNrMg7PV4OMRAtEzUgu6gQpS';

   const onToken = token => {
        console.log(token);
        alert('Payment Succesful')
    }

    return(
        <StripeCheckout 
            label='Pay Now'
            name = 'CROWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel = 'Pay Now'
            token={onToken}
            stripeKey={publishableKey}

        />
    );
};
export default StripeCheckoutButton;