import { ShopLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
]

const rows = [
  { id: 1, fullName: 'Ivan Campos Wainer' },
  { id: 2, fullName: 'Joaquin Rey' },
  { id: 3, fullName: 'Facundo Gomez' },
  { id: 4, fullName: 'Natalia Fernandez' },
  { id: 5, fullName: 'Tincho Olmedo' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title="Order History | CW Shop" pageDescription='History pays of the client'>
      <Typography variant="h1" component="h1">Order History</Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
