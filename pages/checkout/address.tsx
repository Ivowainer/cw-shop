import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"

const AddressPage = () => {
  return (
    <ShopLayout title={"Address | CW Shop"} pageDescription={"Confirm direction"}>
        <Typography variant="h1" component="h1">Direction</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
                <TextField label="Name" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Last Name" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Direction" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Direction 2 (optional)" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Postal Code" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="City" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select variant="filled" label="Country" value={1}>
                        <MenuItem value={1}>Argentina</MenuItem>
                        <MenuItem value={2}>Chile</MenuItem>
                        <MenuItem value={3}>Honduras</MenuItem>
                        <MenuItem value={4}>México</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Phone" variant="filled" fullWidth />
            </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent='center'>
            <Button color="secondary" className="circular-btn" size="large">Review order</Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage
