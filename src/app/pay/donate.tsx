"use client";
import React, { useState } from "react";
import { paystackPay } from "../actions/actions";

export default function Donate() {
  const [amount, setAmount] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleDonate = async (): Promise<void> => {
    // Your code logic goes here
    setSubmitting(true);
    const paystackResponse = await paystackPay({
      amount: amount, //amount to be transacted by paystack
      email: "justinequartz@gmail.com", //email of the person making the payment
      currency: "KES", //currency eg KES or USD if you are in kenya
      callback_url: "http://localhost:3000/confirmpayment", //route where paystack will redirect with reference code after a successful payment
      channels: ["mobile_money"], //channel to be used for making payment eg bank mobile_money
    });
    setSubmitting(false);
    if (paystackResponse.status === true) {
      window.location.href = paystackResponse.data.authorization_url; //extract the redirection and user it for redirecting the donor to the unique page generated for them to make payment
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // Access the value from the event
    const value: number = parseInt(e.target.value);
    setAmount(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl p-6 bg-white rounded-lg shadow-md flex">
        <div className="w-1/2 pr-6">
          <img
            className="w-full h-auto rounded"
            src="https://fossil.scene7.com/is/image/FossilPartners/FS6029_main?$sfcc_fos_medium$"
            alt="Watch Image"
          />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Donate for a Limited Edition Watch
          </h2>
          <p className="text-gray-600 mb-4">
            Help us make a difference with your generous donation. Every
            contribution brings us closer to our goal.
          </p>
          <div className="mb-4">
            <label
              htmlFor="donationAmount"
              className="block text-sm font-medium text-gray-600"
            >
              Donation Amount
            </label>
            <input
              id="donationAmount"
              name="donationAmount"
              onChange={handleInputChange}
              type="number"
              className="mt-1 p-3 border border-gray-300 rounded w-full"
              placeholder="Enter amount to donate"
            />
          </div>
          <button
            disabled={submitting}
            onClick={handleDonate}
            className="w-full p-3 bg-green-700 text-white rounded hover:bg-green-600"
          >
            {submitting ? "Please wait ..." : "Donate Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
