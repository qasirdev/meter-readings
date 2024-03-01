'use client'
import EmptyState from '@/components/EmptyState';
import { Reading } from '@/db/types';
import formatTheDate from '@/db/formatTheDate';
import { RootState } from '@/store/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Readings = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Electricity');
  const { selectedAccount,status,error } = useSelector(
    (state: RootState) => state.account,
  )
  
  if(!selectedAccount) {
    return (
      <EmptyState />
    );
  }
  const allElectricityReadings:Reading[]=[];
  const allGasReadings:Reading[]=[];
  selectedAccount?.meters.map((meter) => {
    if (meter.fuelType === "Electricity") {
      allElectricityReadings.push(...meter.readings);
    } else if (meter.fuelType === "Gas") {
      allGasReadings.push(...meter.readings);
    }
    
  });
  
  return (
    <>
      <Link href="#" onClick={() => router.back()} passHref className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded">
          Go Back
      </Link>
      <div className="container mx-auto p-6">
        <ul className="flex border-b mb-4 bg-slate-200">
          <li
            className={`mr-4 py-2 px-4 cursor-pointer border-b-4 ${
              activeTab === 'Electricity' ? 'border-blue-900 bg-blue-500 text-white' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('Electricity')}
          >
            Electricity
          </li>
          <li
            className={`py-2 px-4 cursor-pointer border-b-4 ${
              activeTab === 'Gas' ? 'border-blue-900 bg-blue-500 text-white' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('Gas')}
          >
            Gas
          </li>
        </ul>

        {activeTab === 'Electricity' && (
          <div className="mb-6">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left py-2 border-b border-gray-300">Date & Time</th>
                  <th className="text-left py-2 border-b border-gray-300">Value</th>
                </tr>
              </thead>
              <tbody>
                {allElectricityReadings.map((reading) => (
                  <tr key={reading.id} className='border-b border-gray-300'>
                    <td >{formatTheDate(reading.dateTime)}</td> 
                    <td >
                      <div className="pt-3"><strong>Reading:</strong> {reading.value}</div>
                      <div className="pb-3">
                      <strong>Who:</strong> {reading.meterReadingSource}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Gas' && (
          <div className="mb-6">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left py-2 border-b border-gray-300">Date & Time</th>
                  <th className="text-left py-2 border-b border-gray-300">Value</th>
                </tr>
              </thead>
              <tbody>
                {allGasReadings.map((reading) => (
                  <tr key={reading.id} className='border-b border-gray-300'>
                    <td >{formatTheDate(reading.dateTime)}</td> 
                    <td >
                      <div className="pt-3"><strong>Reading:</strong> {reading.value}</div>
                      <div className="pb-3">
                      <strong>Who:</strong> {reading.meterReadingSource}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Readings