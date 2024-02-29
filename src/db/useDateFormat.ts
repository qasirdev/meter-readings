import { formatDate } from 'date-fns';
import { useState, useEffect } from 'react';


const useDateFormat = (dateString: string, desiredFormat = 'do MMM yyyy') => {
  const [formattedDate, setFormattedDate] = useState(dateString);

  useEffect(() => {
    setFormattedDate(formatDate(new Date(dateString), desiredFormat));
  }, [dateString, desiredFormat]);

  return formattedDate;
};

export default useDateFormat;