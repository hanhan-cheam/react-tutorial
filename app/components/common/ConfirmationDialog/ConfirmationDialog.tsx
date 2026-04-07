import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

export type TConfirmationDialogProps = {
  open: boolean;
  title?: string;
  onClose?: () => void;
  closeText?: string;
  children?: ReactNode;
  onConfirm?: () => Promise<void>;
};

const ConfirmationDialog = ({
  open,
  title,
  onClose,
  closeText = 'Close',
  children,
  onConfirm,
}: TConfirmationDialogProps) => {
  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth={'xl'} open={open} onClose={onClose}>
        <DialogTitle variant="h5">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {onConfirm && (
            <Button variant="outlined" onClick={onConfirm}>
              {'Confirm'}
            </Button>
          )}
          <Button variant="outlined" onClick={onClose}>
            {closeText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmationDialog;
