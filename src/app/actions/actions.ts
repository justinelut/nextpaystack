"use server"
interface PaystackParams {
  amount: number;
  email: string;
  currency: string;
  channels?: string[];
  callback_url?: string;
  metadata?:object
}

interface VerifyParams {
  reference: string;
}


const secretKey: string = process.env.PAYSTACK_TEST_SECRET_KEY as string;
const url: string = 'https://api.paystack.co';

const getCommonHeaders = () => ({
  Authorization: `Bearer ${secretKey}`,
  'Content-Type': 'application/json',
});

//paystack function for initiating payment and generating redirection url

export const paystackPay = async ({
  amount,
  email,
  currency,
  channels,
  callback_url,
  metadata
}: PaystackParams) => {
  const options = {
    method: 'POST',
    headers: getCommonHeaders(),
    body: JSON.stringify({
      email: `${email}`,
      amount: `${amount * 100}`,
      currency: currency,
      channels: channels,
      callback_url: callback_url,
      metadata:metadata
    }),
  };

  try {
    const response = await fetch(`${url}/transaction/initialize`, options);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
    return error;
  }
};


//paystack function for confirming payment

export const verifyPaystackTransaction = async ({ reference }: VerifyParams) => {
  const options = {
    method: 'GET',
    headers: getCommonHeaders(),
  };

  try {
    const response = await fetch(`${url}/transaction/verify/${reference}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

