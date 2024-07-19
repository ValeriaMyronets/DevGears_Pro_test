export const validateInputs = (
  name: string, 
  email: string, 
  phone: string, 
  setErrorMessage: (errorMessage: { name: string, email: string, phone: string }) => void
) => {
  const errors = { name: '', email: '', phone: '' };

  let isValid = true;

  if (!name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email is invalid';
    isValid = false;
  }

  if (!phone.trim()) {
    errors.phone = 'Phone is required';
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = 'Phone number must be 10 digits';
    isValid = false;
  }

  setErrorMessage(errors);
  return isValid;
};