import { filter } from 'lodash';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useAuthHeader } from 'react-auth-kit';

// @mui
import {
    Box,
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination
} from '@mui/material';

// ICONS
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import ListHead from '../../ui-component/lists/ListHead';
import { GET_CONTRACTS } from '../../graphql/contracts/contracts-graphql';
import { normalize } from 'path';

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'service_type', label: 'Tipo Servicio', alignRight: false },
    { id: 'start_date', label: 'Fecha Inicio', alignRight: false },
    { id: 'end_date', label: 'Fecha Caducidad', alignRight: false },
    { id: 'remaining_hours', label: 'Horas Disponibles', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (contract) => contract.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

// --------------- Contract List Component
const ContractList = () => {
    // header for authorization
    const authHeader = useAuthHeader();
    const token = authHeader();

    // query to get all contracts
    const { loading, error, data } = useQuery(GET_CONTRACTS, { context: { headers: { authorization: token } } });

    const contracts = normalize(data);
    console.log('contracts list');
    console.log(contracts);
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = contracts.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contracts.length) : 0;

    const filteredConracts = applySortFilter(contracts, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredConracts.length && !!filterName;

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} display="flex">
                    <Typography variant="h3" gutterBottom>
                        Contratos
                    </Typography>
                    <SearchSection filterName={filterName} onFilterName={handleFilterByName} />
                </Stack>
            </Container>

            <Container>
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <ListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={contracts.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredConracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                    const selectedUser = selected.indexOf(name) !== -1;

                                    return (
                                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar alt={name} src={avatarUrl} />
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="left">{company}</TableCell>

                                            <TableCell align="left">{role}</TableCell>

                                            <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                                            <TableCell align="left">
                                                <Typography>status</Typography>
                                                {/* <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label> */}
                                            </TableCell>

                                            <TableCell align="right">
                                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                    <MoreVertIcon color="secondary.main" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>

                            {isNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Typography variant="h6" paragraph>
                                                    Not found
                                                </Typography>

                                                <Typography variant="body2">
                                                    No results found for &nbsp;
                                                    <strong>&quot;{filterName}&quot;</strong>.
                                                    <br /> Try checking for typos or using complete words.
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={contracts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75
                        }
                    }
                }}
            >
                <MenuItem>
                    <EditRoundedIcon color="secondary.main" />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <DeleteForeverRoundedIcon color="error.dark" />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
};
export default ContractList;
