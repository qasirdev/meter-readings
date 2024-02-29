'use client'
import React from 'react'
import { Dropdown } from './Dropdown'
import { useDispatch } from 'react-redux';
import { addSelectedAccount } from '@/features/accountSlice'; 
import { Account } from '@/db/types';

const AccountSelect = ({options,handleValueChange,accountsDataList}:{
  options:string[]
  accountsDataList: Account[]
  handleValueChange: (value: string) => void
}) => {
  const dispatch = useDispatch();
  const handleAccountSelected = (accountNumber:string) => {
    const selectedAccount = accountsDataList.find(account => account.accountId === parseInt(accountNumber)); 
    if (selectedAccount) {
      dispatch(addSelectedAccount(selectedAccount));
      handleValueChange(accountNumber);
    } else {   
      console.error(`Account with number ${accountNumber} not found`);
    }
  };

  return (
    <>
    {options && (
      <Dropdown
        options={options}
        label="Please select an account"
        selectedValue="plesae select an account"
        onValueChange={handleAccountSelected }
      />      

    )}
    </>
  )
}

export default AccountSelect