import { Snackbar } from '@mui/material';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import './Notification.css';

export interface NotificationState {
    open: boolean;
    message: string;
    type: AlertColor;
}

interface NotificationProps {
    message: string;
    type: AlertColor;
    open: boolean;
    handleClose: () => void;
}

const Notification = (props: NotificationProps) => {
    const { message, type, open, handleClose } = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                autoHideDuration={5000}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity={type}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Notification;