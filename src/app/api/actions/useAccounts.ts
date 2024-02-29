import * as fs from 'fs';
import * as path from 'path';

import accountsData from './accounts-data';
import { getDbPath } from '@/db/db-utils';
import { Account } from '@/db/types';

export const useAccounts = {
  getAll: () => accountsData,

  getById: (id: number) => accountsData.find((account) => account.accountId === id),

  save: (id: number, params: Partial<Account>) => {
    const account = accountsData.find((account) => account.accountId === id);
    if (!account) return; 

    Object.assign(account, params);
    
    Object.assign(accountsData, account);

    saveData(accountsData);
  }
};

function saveData(account:any) {
  const dbPath = getDbPath();
  const filePath = path.join(dbPath, 'db.json');
  fs.writeFileSync(filePath, JSON.stringify(account, null, 4)); 
}