import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useAuthHeader } from 'react-auth-kit';

// @mui
import { Stack, Container, CardActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { CREATE_COMPANY, UPDATE_COMPANY } from '../../graphql/companies/mutations';
import { GET_ALL_COMPANIES } from '../../graphql/companies/queries';
import CustomTextField from '../../ui-component/forms/CustomTextField';
import MainCard from '../../ui-component/cards/MainCard';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

// form validation
const validationSchema = yup.object({
    name: yup.string('Ingrese nombre').required('Nombre requerido'),
    ruc: yup.string('Ingrese RUC').min(13, 'RUC debe contener 13 digitos').max(13, '').required('RUC requerido')
});

const CompaniesForm = () => {
    // header for authorization
    const authHeader = useAuthHeader();
    const token = authHeader();

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
    const [createCompany] = useMutation(CREATE_COMPANY, {
        refetchQueries: [{ query: GET_ALL_COMPANIES, context: { headers: { authorization: token } } }],
        context: { headers: { authorization: token } }
    });

    // mutation update company
    const [updateCompany] = useMutation(UPDATE_COMPANY, {
        refetchQueries: [{ query: GET_ALL_COMPANIES, context: { headers: { authorization: token } } }],
        context: { headers: { authorization: token } }
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
                    const response = await updateCompany({
                        variables: { id: selectedCompany.id, name: values.name.toUpperCase(), ruc: values.ruc }
                    });
                    const { error, loading } = response;

                    if (!error) {
                        setLoader(loading);
                        toast.success('Empresa actualizada correctamente');
                        setSubmitting(false);
                    } else {
                        toast.error('Error al actualizar la empresa');
                    }
                } else {
                    const response = await createCompany({ variables: { name: values.name.toUpperCase(), ruc: values.ruc } });
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
                setSubmitting(false);
                setLoader(false);
                toast.error(error.message);
            }
        }
    });

    return (
        <>
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
