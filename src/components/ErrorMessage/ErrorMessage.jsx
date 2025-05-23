import { toast } from 'react-hot-toast';

const ErrorMessage = (message = 'Something went wrong') => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#d32f2f',
      color: '#fff',
    },
  });
};

export default ErrorMessage;
