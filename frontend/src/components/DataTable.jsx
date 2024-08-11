import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'Rank', width: 100 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'score', headerName: 'Won', width: 90 },
]

const DataTable = ({ rows }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableColumnMenu
        hideFooterSelectedRowCount
      />
    </div>
  )
}

export default DataTable
