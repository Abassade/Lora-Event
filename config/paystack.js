const request = require('request');
const paystack = () => {
    const secretKey = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;
    const initializePayment = (form, mycallback) => {
        const options = {
            url : process.env.initializeUrl,
            headers : {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            },
            form
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request.post(options, callback)
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url : process.env.verifyUrl+encodeURIComponent(ref),
            headers : {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'    
            }
        }
        const callback = (error, response, body) => {
            return mycallback(error, body)
        }
        request(options, callback)
    }

    return {initializePayment, verifyPayment};
}

module.exports = paystack;