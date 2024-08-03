import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface IProps {
  show: boolean;
  setQuestionShow: any;
  logOutHandler: () => void;
}

const QuestionWindow = ({ show, setQuestionShow, logOutHandler }: IProps) => {
  const handleClose = () => {
    setQuestionShow(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Вы уверены что хотите удалить профиль?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ваши данные хранятся в кэше браузера. Если вы сделаете выход, вы
            потеряете всю статистику для этого аккаунта.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logOutHandler}>Согласен</Button>
          <Button onClick={handleClose} autoFocus>
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default QuestionWindow;
