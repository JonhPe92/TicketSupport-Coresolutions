import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLazyQuery, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
// @mui
import { Card, CardHeader, Stack, Button, Container, CardContent, CardActions, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { CREATE_COMPANY, UPDATE_COMPANY } from '../../graphql/companies/mutations';
import { GET_ALL_COMPANIES } from '../../graphql/companies/queries';
import CustomTextField from '../../ui-component/forms/CustomTextField';
import MainCard from '../../ui-component/cards/MainCard';

// form validation
const validationSchema = yup.object({
    name: yup.string('Ingrese nombre').required('Nombre requerido'),
    ruc: yup.string('Ingrese RUC').min(13, 'RUC debe contener 13 digitos').max(13, '').required('RUC requerido')
});

const CompaniesForm = () => {
    // validate if editCompany is using the form
    const location = useLocation();
    const [formType, setformType] = useState('Crear');
    const selectedCompany = location.state;

    // loading state
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (selectedCompany) {
            setformType('Actualizar');
        }
    }, [selectedCompany]);
    // mutation create company
    const [createCompany] = useMutation(
        CREATE_COMPANY,
        {
            refetchQueries: [{ query: GET_ALL_COMPANIES }]
        },
        { errorPolicy: 'all' }
    );

    // mutation create company
    const [updateCompany] = useMutation(UPDATE_COMPANY, {
        refetchQueries: [{ query: GET_ALL_COMPANIES }]
    });

    const initialValues = selectedCompany ?? {
        name: '',
        ruc: ''
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                setLoader(true);
                if (selectedCompany) {
                    const response = await updateCompany({ variables: { id: selectedCompany.id, name: values.name, ruc: values.ruc } });
                    const { error, loading } = response;

                    if (!error) {
                        setLoader(loading);
                        toast.success('Empresa actualizada correctamente');
                        setSubmitting(false);
                    } else {
                        toast.error('Error al actualizar la empresa');
                    }
                } else {
                    const response = await createCompany({ variables: { name: values.name, ruc: values.ruc } });
                    const { error, loading } = response;
                    if (!error) {
                        setLoader(loading);
                        toast.success('Empresa creada correctamente');
                        setSubmitting(false);
                        formik.handleReset();
                    } else {
                        toast.error('Error al crear la empresa');
                    }
                }
            } catch (error) {
                console.log('error crear empresa');
                console.log(error);
                toast.error(error.message);
            }
        }
    });

    return (
        <>
            {/* <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={6} display="flex">
                    <Button
                        component={Link}
                        to="/dashboard/companies"
                        variant="text"
                        endIcon={<Iconify icon="mdi:building" />}
                        startIcon={<Iconify icon="material-symbols:arrow-circle-left-outline" />}
                        size="large"
                    >
                        Empresas
                    </Button>

                    <Iconify icon="mdi:office-building-plus" width={50} />
                </Stack>
            </Container> */}

            <form onSubmit={formik.handleSubmit}>
                <Container>
                    <MainCard title="Crear Empresa" border={false}>
                        {/* <CardHeader
                            title={`${formType} empresa`}
                            sx={{ backgroundColor: 'primary.main', color: 'white', paddingBottom: '1em' }}
                        /> */}

                        <Stack direction="column" spacing="2em">
                            <CustomTextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                label="Nombre Empresa"
                                variant="filled"
                                size="medium"
                            />
                            <CustomTextField
                                id="ruc"
                                name="ruc"
                                value={formik.values.ruc}
                                onChange={formik.handleChange}
                                error={formik.touched.ruc && Boolean(formik.errors.ruc)}
                                helperText={formik.touched.ruc && formik.errors.ruc}
                                label="RUC"
                                inputProps={{ maxLength: 13 }}
                                variant="filled"
                                size="medium"
                            />
                        </Stack>

                        <CardActions sx={{ paddingLeft: '2em' }}>
                            <LoadingButton
                                loading={loader}
                                variant="contained"
                                type="submit"
                                disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                                color="secondary"
                            >
                                {formType}
                            </LoadingButton>
                        </CardActions>
                    </MainCard>
                </Container>
            </form>
        </>
    );
};

export default CompaniesForm;
