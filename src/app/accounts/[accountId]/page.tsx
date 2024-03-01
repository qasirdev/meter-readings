'use client'
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import React from 'react'

import { AppDispatch, RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';

const AccountId = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const { selectedAccount,status,error } = useSelector(
    (state: RootState) => state.account,
  )
  if(!selectedAccount) {
    return (
      <EmptyState />
    );
  }
  
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-[#002f87]">Hello {selectedAccount.person.lastName}</h2>
            <p className="mt-2">
              Your electricity and gas account {selectedAccount.externalReference}. <br />
              {selectedAccount.fullAddress}
            </p>
            <Link href="#" passHref className="text-blue-600 font-bold hover:text-blue-800 mt-2 block">Tell us you&apos;re moving 
            </Link>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#002f87]">Quick Links</h3>
            <ul className="mt-2 text-blue-700 underline">
              {selectedAccount.meters.length && (
                <li><Link href="/accounts/1234/readings/submit">Submit a meter reading</Link></li>
              )}
              <li><Link href="/accounts/1234/readings">view meter reading history</Link></li>
              <li><Link href="#">View statements & payments</Link></li>
              <li><Link href="#">Manage Direct Debit</Link></li>
              <li><Link href="#">Personal details</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-medium">Your energy usage</h4>
            <p className="text-gray-600 mt-2">You used £77.58 of electricity in January</p>
            <p className="font-bold mt-1">264.04 kWh electricity</p>
            <Link href="#" className="text-blue-600 font-bold hover:text-blue-800 mt-2 block">Personal details</Link>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-medium">Your energy usage</h4>
            <p className="text-gray-600 mt-2">You used £77.58 of electricity in January</p>
            <p className="font-bold mt-1">264.04 kWh electricity</p>
            <Link href="#" className="text-blue-600 font-bold hover:text-blue-800 mt-2 block">Personal details</Link>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-medium">Your energy usage</h4>
            <p className="text-gray-600 mt-2">You used £77.58 of electricity in January</p>
            <p className="font-bold mt-1">264.04 kWh electricity</p>
            <Link href="#" className="text-blue-600 font-bold hover:text-blue-800 mt-2 block">Personal details</Link>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-medium">Your energy usage</h4>
            <p className="text-gray-600 mt-2">You used £77.58 of electricity in January</p>
            <p className="font-bold mt-1">264.04 kWh electricity</p>
            <Link href="#" className="text-blue-600 font-bold hover:text-blue-800 mt-2 block">Personal details</Link>
          </div>

        </div>
      </div>

  );
}

export default AccountId