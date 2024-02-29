import accountsDataList from './api/actions/accounts-data';
import AccountSelect from "@/components/AccountSelect";
import { redirect } from "next/navigation";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";

export default async function Home() {
  
  let options: string[] = [];
  if(accountsDataList) {
    options =accountsDataList.map((account:any) => account.accountId as string)
  }

  if (accountsDataList.length === 0) {
    return (
      <EmptyState />
    );
  }

  const handleValueChange= async (accountNumber:string) => {
    "use server"
    redirect(`/accounts/${accountNumber}`)
  }

  return(
    <ClientOnly>
      <div className="h-screen p-6 flex flex-col items-left">
          <AccountSelect 
            options={options}
            accountsDataList={accountsDataList}
            handleValueChange={handleValueChange}
          />                
        </div>
    </ClientOnly>
 
  )
}
