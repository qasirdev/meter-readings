import { formatDate } from 'date-fns';

const formatTheDate = (dateString: string, desiredFormat = 'do MMM yyyy'): string => {
  const currentDate =new Date(dateString).toISOString();
  return formatDate(currentDate, desiredFormat);
};

export default formatTheDate;