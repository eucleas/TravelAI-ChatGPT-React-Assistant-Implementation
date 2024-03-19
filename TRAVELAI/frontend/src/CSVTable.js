import React from 'react';

class CSVTable extends React.Component {
  // Method to parse the CSV string into a 2D array
  parseCSVString(dataString) {
    // Split the string into rows, then split each row into cells
    const rows = dataString.trim().split('\n').map(row => row.split('|').map(cell => cell.trim())).filter(row => !row.some(cell => cell.includes('```'))).filter(row => !row.some(cell => cell.includes('---------------')));
    // Optionally, you can remove empty cells if your format includes them at the start and end of rows
    return rows.map(row => row.filter(cell => cell));
  }

  // Method to render the CSV data as a table
  renderTable(data) {
    if (data.length === 0) return <p>No data found</p>;

    const headers = "Flight TimeTable";
    //const bodyRows = data.slice(1);
    const bodyFirstMessage= data[0];
    const bodyLastMessage=data.slice(data.length-1,data.length);  
    const bodyRows = data.slice(1, -1); // Changed from data.slice(1) to exclude first and last rows

    return (
        <>
        <p>{bodyFirstMessage}</p> {/* Message added at the beginning */}
      <table style={{ backgroundColor:'666', width: '100%', textAlign: 'left' }}>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex} style={{ padding: '8px', border: '1px solid #ddd' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
             <p>{bodyLastMessage}</p> {/* Message added at the end */}
             </>
    );
  }

  render() {
    // Extract CSV data from props
    const { dataString } = this.props;
    const csvData = this.parseCSVString(dataString);

    return (
      <div>
        {this.renderTable(csvData)}
      </div>
    );
  }
}
export default CSVTable;