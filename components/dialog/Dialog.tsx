import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: {
    title?: string;
    description?: string;
    agree?: string;
    disagree?: string;
  };
  handleAgree?: () => void;
}

export default function AlertDialog({
  open,
  setOpen,
  content,
  handleAgree,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {content.title ? content.title : "Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content.description ? content.description : "Are you sure?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {content.disagree ? content.disagree : "Disagree"}
          </Button>
          <Button onClick={handleAgree ? handleAgree : handleClose} autoFocus>
            {content.agree ? content.agree : "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
