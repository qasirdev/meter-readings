'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';

const thankyou = () => {
  const { selectedAccount,status,error } = useSelector(
    (state: RootState) => state.account,
  )
  if(!selectedAccount) {
    return (
      <EmptyState />
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-center text-4xl text-red-600 font-bold mb-6">Thank You</h1>

      <p className="text-center mb-8">Thank you for giving us the meter readings</p>

      <p className="text-center font-bold text-red-600 mb-4">
        Your new balance for your reading is shown below:
      </p>

      <p className="text-center text-xl font-bold mb-8">£66.3 debit</p>

      <div className="flex flex-col md:flex-row w-full items-center justify-center mt-10">
        <div className="md:w-2/3 p-4">
          <p>We will send you an email to you when your new bill will ready for review.</p>
        </div>

        <div className="md:w-1/3 p-4 flex items-end justify-end">
          <Link href={`/accounts/${selectedAccount.accountId}`} passHref>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
              My dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default thankyou