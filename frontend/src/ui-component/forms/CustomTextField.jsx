import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const MyTextInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-filled': {
        color: theme.palette.secondary.light,
        fontWeight: 'bold'
    },
    '& .MuiFilledInput-root': {
        '& fieldset': {
            borderColor: theme.palette.secondary.main
        },
        input: {
            color: theme.palette.text.primary
        },
        '&:hover fieldset': {
            borderColor: theme.palette.secondary.light
        },
        '&.Mui-focused': {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.main
        },
        '$.Mui-underline': {
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main
        }
    },
    '& .MuiFilledInput-underline': {
        '&.Mui-focused': {
            color: theme.palette.secondary.main
        }
    },
    '@media (min-width:600px)': {
        width: 300
    },
    '@media (min-width:900px)': {
        width: 400
    }
}));

const CustomTextField = (props) => <MyTextInput {...props} />;

export default CustomTextField;
