import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Function to generate PDF document
export const generatePDF = () => {
  // Create a Document component
  const MyDocument = (
    <Document>
      {/* Create a Page component */}
      <Page size="A4" style={styles.page}>
        {/* Create a View component */}
        <View style={styles.section}>
          {/* Create a Text component */}
          <Text>Section #1</Text>
        </View>
        {/* Create another View component */}
        <View style={styles.section}>
          {/* Create another Text component */}
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  // Download the PDF document
  // You can replace "MyDocument.pdf" with any desired filename
  // The "blob" method is used to create a blob object representing the data
  // The "URL.createObjectURL" method generates a URL for the blob object
  // The "download" attribute triggers the download of the URL as a file
  const pdfBlob = PDFDocument.toBlob(MyDocument);
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'MyDocument.pdf';
  link.click();
};

