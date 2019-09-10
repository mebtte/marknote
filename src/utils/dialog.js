/* eslint-disable react/no-render-return-value */
import React, { useState, useEffect, useCallback } from 'react';
import Types from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const Wrapper = ({ title, message, confirmText, onConfirm, onExited }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm(true);
    }
    return setOpen(false);
  }, []);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onExited={onExited}
      fullWidth
      maxWidth="xs"
    >
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      {message ? (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      ) : null}
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
Wrapper.propTypes = {
  title: Types.string,
  message: Types.string,
  confirmText: Types.string,
  onConfirm: Types.func,
  onExited: Types.func.isRequired,
};
Wrapper.defaultProps = {
  title: '',
  message: '',
  confirmText: '确定',
  onConfirm: null,
};

export default {
  alert: ({ title, message, confirmText, onConfirm }) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const onExited = () => {
      ReactDOM.unmountComponentAtNode(container);
      return container.remove();
    };
    return ReactDOM.render(
      <Wrapper
        title={title}
        message={message}
        confirmText={confirmText}
        onConfirm={onConfirm}
        onExited={onExited}
      />,
      container,
    );
  },
};
