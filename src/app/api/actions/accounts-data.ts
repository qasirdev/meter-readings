import accounts from '../../../../db/db.json'
import { Account, Meter } from '@/db/types';
function transformAccountsData(data: any[]): Account[] {
  return data.map((account) => ({
    ...account,
    meters: account.meters.map((meter:Meter) => ({
      ...meter,
      fuelType: meter.fuelType as Meter['fuelType'],
    })), 
  }));
}

const accountsDataList: Account[] = transformAccountsData(accounts); 
export default accountsDataList; 

