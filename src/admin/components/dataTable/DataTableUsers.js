import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
//import { Link } from "react-router-dom";

const DataTable = ({onEdit, slug, columns, rows, onDelete}) => {
/* 
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="action">
          <div onClick={() => {
            console.log(params.row.id);
            const id = params.row.id;
            onEdit(id);
            }}>
            <RiEditFill />
          </div>
          {(params.row.role !== 'admin')&&<div className="delete" onClick={() => {
            console.log(params.row.id);
            const id = params.row.id;
            onDelete(id);
            }}>
            <RiDeleteBin5Fill/>
          </div>}
        </div>
      );
    },
  };
 */
  const column = [...columns]

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={(column)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
