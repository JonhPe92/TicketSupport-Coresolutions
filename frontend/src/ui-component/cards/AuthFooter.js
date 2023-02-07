// material-ui
import { Link, Typography, Stack, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography
            variant="subtitle2"
            component={Link}
            href="https://www.coresolutions.com.ec"
            target="_blank"
            underline="hover"
            color="primary"
        >
            &copy; CORESOLUTIONS S.A
        </Typography>
        <Button
            variant="text"
            component={Link}
            href="mailto: jperalta@ecoresolutions.com.ec"
            target="_blank"
            underline="hover"
            color="primary"
            startIcon={<EmailIcon />}
        >
            Core Support
        </Button>
    </Stack>
);

export default AuthFooter;
