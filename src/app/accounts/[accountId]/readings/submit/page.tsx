'use client';
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import { AppDispatch, RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import EmptyState from '@/components/EmptyState';
import { addReading } from '@/features/accountSlice';
import { Meter, Reading, Account } from '@/db/types';
import formatTheDate from '@/db/formatTheDate';
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';

const Submit = () => {
  const [electricityReading, setElectricityReading] = useState('');
  const [gasReading, setGasReading] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [electricityError, setElectricityError] = useState('');
  const [gasError, setGasError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch(); 
  const { selectedAccount,status,error } = useSelector(
    (state: RootState) => state.account,
  )
  if(!selectedAccount) {
    return (
      <EmptyState />
    );
  }

  let lastElectricityReadings:Reading | undefined= undefined;
  let lastGasReadings:Reading | undefined= undefined;
  let electricityMeter:Meter | undefined = undefined;
  let gasMeter:Meter | undefined = undefined;

  selectedAccount?.meters.map((meter:Meter) => {
    if (!lastElectricityReadings && meter.fuelType === "Electricity") {
      electricityMeter = meter as Meter;
      lastElectricityReadings = meter.readings.find(() => {
        return true;
      });
    } else if (!lastGasReadings && meter.fuelType === "Gas") {
      gasMeter= meter;
      lastGasReadings = meter.readings.find(() => {
        return true;
      });
    }
    
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setElectricityError('');
    setGasError('');
    setCheckboxError('');

    let isValid = true;

    if (electricityReading === '') {
      setElectricityError('Electricity reading is required');
      isValid = false;
    }
    if (!/^\d{5}$/.test(electricityReading)) {
      setElectricityError(`Reading must be a 5-digit number.`);
      isValid = false;
    }
    if (lastElectricityReadings && parseInt(electricityReading) <= lastElectricityReadings.value) {
      setElectricityError(`Electricity reading must be greater than last reading ${lastElectricityReadings.value}`);
      isValid = false;
    }

    if (gasReading === '') {
      setGasError('Gas reading is required');
      isValid = false;
    }
    if (!/^\d{5}$/.test(gasReading)) {
      setElectricityError(`Reading must be a 5-digit number.`);
      isValid = false;
    }
    if (lastGasReadings && parseInt(gasReading) <= lastGasReadings.value) {
      setGasError(`Gas reading must be greater than last reading ${lastGasReadings.value}`);
      isValid = false;
    }

    if (!isChecked) {
      setCheckboxError('Please confirm the reading is correct');
      isValid = false;
    }

    if (isValid) {
      const now = new Date();
      const desiredFormat = 'yyyy-MM-dd\'T\'HH:mm:ss.SSS';
      const currentFormatedDate = formatDate(now, desiredFormat)
      let newReadings: Omit<Reading, 'id'>[] = [];
      if(electricityMeter) {
        newReadings.push({
          "readingType": "Customer",
          "meterPointId": electricityMeter.id,
          "dateTime": currentFormatedDate,
          "createdDate": currentFormatedDate,
          "value": parseInt(electricityReading),
          "fuelType": "Electricity",
          "meterReadingSource": "CUSTOMER"
        });
      };
      if(gasMeter) {
        newReadings.push({
          "readingType": "Customer",
          "meterPointId": gasMeter.id,
          "dateTime": currentFormatedDate,
          "createdDate": currentFormatedDate,
          "value": parseInt(gasReading),
          "fuelType": "Gas",
          "meterReadingSource": "CUSTOMER"
        });
      }

      dispatch(addReading({accountId:selectedAccount.accountId,newReadings}))
        .unwrap()
        .then(() => {
          console.log('Readings added successfully!');
          setElectricityReading('');
          setGasReading('');
          router.push(`/accounts/${selectedAccount.accountId}/readings/submit/thankyou`);
        })
        .catch((error:any) => {
          console.error('Error adding readings:', error);
        });

      console.log('Form data:', { electricityReading, gasReading });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    if (value.match(/^\d+$/) && value.length <= 5) { 
      if(name === "Gas") {
        setGasReading(value);
      }else {
        setElectricityReading(value);
      }
    }
  };

  return (
      <div className="container mx-auto p-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#002f87]">Submit a reading</h1>
        <p className="mt-2 max-w-[600px]">
          Add numbers before the decimal place, including any zeros (no need to
          enter the numbers that appear in red on your meter).
        </p>

        <form onSubmit={handleSubmit}>
          {lastElectricityReadings && (
            <div className="mt-8 w-1/2">
            <h2 className="text-2xl font-bold">Electricity</h2>
            {electricityMeter !== undefined && ( 
              <h3 className="text-lg font-bold mt-2">Reading ({(electricityMeter as Meter).serialNumber})</h3> 
            )}
            {selectedAccount && selectedAccount.predictedElecUsage && (
              <h3 className="text-lg mt-2">
                Predicted electricity Usage ({selectedAccount.predictedElecUsage}) 
              </h3>
            )}
            {lastElectricityReadings !== undefined && (
              <p className="text-sm">
                The last reading of {(lastElectricityReadings as Reading).value} was received on {formatTheDate((lastElectricityReadings as Reading).createdDate)}.
              </p>

            )}
            <input
              required
              type="number"
              name="Electricity"
              id="electricity-input" 
              value={electricityReading}
              onChange={handleInputChange}
              maxLength={5}
              className="border border-gray-300 rounded-md p-2 w-64 mt-2 focus:outline-blue-500"
            />
            {electricityError && (
              <div className="text-red-500 text-sm">{electricityError}</div>
            )}

            <Link href={`/accounts/${selectedAccount.accountId}/readings`} className="text-blue-600 w-full font-bold hover:text-blue-800 mt-2 block">View electricity meter reading history</Link>
          </div>
          )}


          {lastGasReadings !== undefined && (
            <div className="mt-6">
            <h2 className="text-2xl font-bold">Gas</h2>
            {gasMeter && ( 
              <h3 className="text-lg font-bold mt-2">Reading ({(gasMeter as Meter).serialNumber})</h3> 
            )}
            {selectedAccount && selectedAccount.predictedGasUsage && (
              <h3 className="text-lg mt-2">
                Predicted Gas Usage ({selectedAccount.predictedGasUsage}) 
              </h3>
            )}
            <p className="text-sm">
              The last reading of {(lastGasReadings as Reading).value} was received on {formatTheDate((lastGasReadings as Reading).createdDate)}.
            </p>
            <input
              required
              type="number"
              id="gas-input" 
              name="Gas"
              value={gasReading}
              onChange={handleInputChange}
              maxLength={5}
              className="border border-gray-300 rounded-md p-2 w-64 mt-2 focus:outline-blue-500"
            />
            {gasError && <div className="text-red-500 text-sm">{gasError}</div>}

            <Link href={`/accounts/${selectedAccount.accountId}/readings`} className="text-blue-600 font-bold hover:text-blue-800 mt-2 block">View gas meter reading history</Link>
          </div>
          )}

          {/* Checkbox */}
          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              id="reading-checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="reading-checkbox">
              I have checked that the reading is correct
            </label>
          </div>
          {checkboxError && (
            <div className="text-red-500 text-sm">{checkboxError}</div>
          )}

          <button
            type='submit'
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
  )
}

export default Submit