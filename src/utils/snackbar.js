/* eslint-disable react/no-render-return-value */
import React, { useState, useEffect } from 'react';
import Types from 'prop-types';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const typeMapStyle = {
  info: {
    backgroundColor: '#1976d2',
  },
  error: {
    backgroundColor: '#d32f2f',
  },
};
const types = Object.keys(typeMapStyle);

const Wrapper = ({ onExited, duration, message, type }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
      onExited={onExited}
    >
      <SnackbarContent
        style={typeMapStyle[type]}
        aria-describedby="client-snackbar"
        message={message}
      />
    </Snackbar>
  );
};
Wrapper.propTypes = {
  onExited: Types.func.isRequired,
  duration: Types.number.isRequired,
  message: Types.string.isRequired,
  type: Types.oneOf(types).isRequired,
};

function openSnackbar({ message, duration = 4000, type }) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const onExited = () => {
    ReactDOM.unmountComponentAtNode(container);
    return container.remove();
  };

  return ReactDOM.render(
    <Wrapper
      message={message}
      duration={duration}
      onExited={onExited}
      type={type}
    />,
    container,
  );
}

export default {
  info: (message, duration = 4000) =>
    openSnackbar({ message, duration, type: 'info' }),
  error: (message, duration = 4000) =>
    openSnackbar({ message, duration, type: 'error' }),
};
