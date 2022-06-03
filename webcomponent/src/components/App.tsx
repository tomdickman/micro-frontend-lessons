import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

import "./App.css";

export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App = (props: HelloWorldProps) => {
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
 
  const handleGridReady = (e: GridReadyEvent) => {
    e.api.sizeColumnsToFit();
    setGridApi(e.api);
  }

  return (
    <div className="App">
      <h1>Hi {props.userName} from React! Welcome to {props.lang}!</h1>
      <p>This is a mounted micro frontend</p>
      <div>
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
    </div>
  );
}