import React from 'react'
import ConfirmationPage from './confirmpayment'
import { verifyPaystackTransaction } from '../actions/actions';


interface PageProps {
  searchParams?: {
    trxref: string;
    reference: string;
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
 
  try {
    if (searchParams) {
      if (searchParams.reference && searchParams.trxref) {
        //please retry payment verification multiple times to avoid errors associated with payment confirmation
        const paymentStatus = await verifyPaystackTransaction({
          reference: searchParams.reference,
        });

        if (paymentStatus) {
          if (
            paymentStatus.status === true &&
            paymentStatus.data.status === "success"
          ) {
            console.log(paymentStatus)
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <>
    <ConfirmationPage  />
    </>
  )
}

export default Page;