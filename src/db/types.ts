export interface Address {
  address1: string;
  address2?: string;
  address3?: string;
  postcode: string;
}

export interface Person {
  title: string;
  firstName: string;
  lastName: string;
}

export interface Reading {
  id: number;
  readingType: string;
  meterPointId: number;
  dateTime: string;
  createdDate: string;
  value: number; // or string, depending on your data type
  fuelType: 'Electricity' | 'Gas';
  meterReadingSource: string;
}

export interface Meter {
  id: number;
  fuelType: 'Electricity' | 'Gas';
  serialNumber: string;
  readings: Reading[];
}

export interface Account {
  accountId: number;
  externalReference: string;
  fullAddress: string,
  address: Address;
  name: string;
  person: Person;
  meters: Meter[];
  predictedElecUsage?: number;
  predictedGasUsage?: number;
}