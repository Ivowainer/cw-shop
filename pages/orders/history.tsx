import { ShopLayout } from '../../components/layouts'
import { Grid, Typography, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  { field: 'paid', 
    headerName: 'Already payed', 
    description: 'Show the info if the order is payed or not', 
    width: 200,
    renderCell: (params: any) => {
      return (
        params.row.paid 
          ? <Chip color="success" label="Payed" variant="outlined" /> 
          : <Chip color="error" label="Not payed" variant="outlined" />
      )
    }
  },
  { field: 'link', 
    headerName: 'Go to the order', 
    description: 'Link to the order', 
    width: 200,
    sortable: false,
    renderCell: (params: any) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">View Order</Link>
        </NextLink>
      )
    }
  }
]

const rows = [
  { id: 1, paid: true, link: '21131', fullName: 'Ivan Campos Wainer' },
  { id: 2, paid: false, link: 'ABC123', fullName: 'Joaquin Rey' },
  { id: 3, paid: true, link: 'DF123', fullName: 'Facundo Gomez' },
  { id: 4, paid: true, link: 'Fajk2', fullName: 'Natalia Fernandez' },
  { id: 5, paid: false, link: 'ggwe2', fullName: 'Tincho Olmedo' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title="Order History | CW Shop" pageDescription='History pays of the client'>
      <Typography variant="h1" component="h1">Order History</Typography>

      <Grid container sx={{ mt: 2 }}>
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
