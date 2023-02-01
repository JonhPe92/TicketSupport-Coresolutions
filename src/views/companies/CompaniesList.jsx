import { filter } from 'lodash';

import { useState } from 'react';
import { useQuery } from '@apollo/client';

// @mui
import { Alert, Box, Card, Stack, Button, Container, Typography, IconButton, Fab } from '@mui/material';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Link, Outlet, useNavigate } from 'react-router-dom';
// components
import CompanyCard from '../../ui-component/cards/CompanyCard';
import LoaderCircular from '../../ui-component/loader/loader';

// querys
import { GET_ALL_COMPANIES } from '../../graphql/companies/queries';

function applySortFilter(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    if (query) {
        return filter(array, (_company) => _company.attributes.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

let filteredCompanies = [];

const CompaniesList = () => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState([]);

    const [filterName, setFilterName] = useState('');

    const { loading, error, data } = useQuery(GET_ALL_COMPANIES);

    console.log('companies data');
    console.log(data);

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    if (data) {
        filteredCompanies = applySortFilter(data.companies.data, filterName);
        const isNotFound = !filteredCompanies.length && !!filterName;
    }

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} display="flex">
                    <Typography variant="h4" gutterBottom>
                        Empresas
                    </Typography>
                    {/* <Button
            component={Link}
            to="/dashboard/companies/new"
            variant="contained"
            startIcon={<Iconify icon="bi:building-fill-add" />}
          >
            Empresa Nueva
          </Button> */}
                </Stack>
            </Container>

            {loading ? (
                <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LoaderCircular />
                </Box>
            ) : (
                <>
                    {error ? (
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Alert variant="filled" severity="error">
                                Problemas de conexion con el servidor.
                            </Alert>
                        </Box>
                    ) : (
                        <Container>
                            <Card sx={{ marginBottom: '2em', backgroundColor: 'primary.main' }}>
                                {/* <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
                                <Typography>Empresas</Typography>
                            </Card>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                                    {filteredCompanies.map((item) => (
                                        <Grid2 xs={12} sm={8} md={4} key={item.id}>
                                            <CompanyCard key={item.id} data={item} />
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>
                        </Container>
                    )}
                </>
            )}
        </>
    );
};

export default CompaniesList;
