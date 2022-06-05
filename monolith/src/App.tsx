import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { GridApi, GridReadyEvent } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

import './App.css';

const App = () => {
  useEffect(() => {
    // This is where we mount the micro frontends, normally you would use an environment variable
    // which would point the source to the bundled app on an S3 bucket or another static hosting
    // service.
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://localhost:9000/main.bundle.js');
    document.head.append(script);
  }, [])

  const [gridApi, setGridApi] = useState<GridApi>(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
 
  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    {field: 'make', filter: true},
    {field: 'model', filter: true},
    {field: 'price'}
  ]);
 
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
      sortable: true
    }), []);
 
  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log('cellClicked', event);
  }, []);
 
  // Example load data from sever
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);
 
  // Example using Grid's API
  const buttonListener = useCallback((_e: any) => {
    if (gridApi) {
      gridApi.deselectAll();
    }
  }, [gridApi]);

  const handleGridReady = (e: GridReadyEvent) => {
    e.api.sizeColumnsToFit();
    setGridApi(e.api);
  }

  return (
    <div className="App">
      <h1>Monolith</h1>
      <p>This is the monolith application, to which micro frontends are mounted</p>
      <div>

      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{width: 'auto', height: 200}}>

          <AgGridReact
            rowData={rowData} // Row Data for Rows
            onGridReady={handleGridReady} // Store the grid API when ready for handling grid actions
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties

            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows

            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            />
        </div>
      </div>
      <h2>Micro frontend</h2>
      <div id="webcomponent-mount" className="Microfrontend-container" />
    </div>
  );
}

export default App;
