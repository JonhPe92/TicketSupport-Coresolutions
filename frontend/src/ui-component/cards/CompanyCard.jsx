import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuthHeader } from 'react-auth-kit';
// @mui
import {
    Card,
    Box,
    CardContent,
    Typography,
    IconButton,
    CardMedia,
    Tooltip,
    ListItem,
    ListItemText,
    List,
    ListItemButton,
    Icon
} from '@mui/material';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { toast } from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { DELETE_COMPANY } from '../../graphql/companies/mutations';
import { GET_ALL_COMPANIES } from '../../graphql/companies/queries';
import DeleteModal from '../modals/DeleteModal';

const CompanyCard = ({ data }) => {
    // header for authorization
    const authHeader = useAuthHeader();
    const token = authHeader();

    // mutation to delete company
    const [deleteCompany, { loading, error }] = useMutation(DELETE_COMPANY, {
        refetchQueries: [{ query: GET_ALL_COMPANIES, context: { headers: { authorization: token } } }],
        context: { headers: { authorization: token } }
    });

    // states for manage delete modal

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { name, ruc, logoPath, contracts } = data.attributes;

    const imageURI = process.env.REACT_APP_MEDIA_URI + logoPath;

    const handleDetele = async () => {
        try {
            await deleteCompany({ variables: { id: data.id } });
            if (!error) {
                toast.success('Empresa eliminada');
            } else {
                toast.error('Error al eliminar empresa');
            }
            setOpenModal(false);
        } catch (error) {
            toast.error(error.message);
            setOpenModal(false);
        }
    };

    return (
        <>
            <DeleteModal open={openModal} handleClose={handleCloseModal} action={handleDetele} name={name} />
            <Card sx={{ display: 'flex', backgroundColor: 'primary.400' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 200 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" color="secondary.main">
                            {name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.primary" component="div">
                            {`RUC: ${ruc}`}
                        </Typography>
                        {contracts.data && (
                            <Typography variant="subtitle1" color="primary.light" component="div">
                                Contratos
                            </Typography>
                        )}
                        <List>
                            {contracts.data.map((contract) => (
                                <ListItemButton key={contract.id}>
                                    <ListItemText
                                        component="div"
                                        primary={`??? ${contract.attributes.name} `}
                                        primaryTypographyProps={{ fontSize: 12, fontWeight: 'bold' }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'left', pl: 1, pb: 1 }}>
                        <Tooltip title="Editar">
                            <IconButton
                                component={Link}
                                to={`/admin/companies/${data.id}`}
                                state={{ id: data.id, name, ruc }}
                                aria-label="edit"
                            >
                                <EditRoundedIcon color="secondary.main" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                            <IconButton aria-label="delete" onClick={handleOpenModal}>
                                <DeleteForeverRoundedIcon color="error.dark" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <CardMedia component="img" sx={{ width: 140, objectFit: 'contain' }} src={imageURI} alt="coresolutions-companies" />
            </Card>
        </>
    );
};

export default CompanyCard;
