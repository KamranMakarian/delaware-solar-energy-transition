import React from 'react';
import { Button } from '@chakra-ui/react';
import Papa from 'papaparse';

const DownloadCSVButton = ({ data }) => {
  const handleDownloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button colorScheme="blue" variant="solid" size="md" onClick={handleDownloadCSV} margin={3}>
      Export Data to CSV
    </Button>
  );
};

export default DownloadCSVButton;