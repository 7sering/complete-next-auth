type registerErrorType = {
  email?: string;
  name?: string;
  password?: string;
};
type LoginErrorType = {
  email?: string;
  password?: string;
};

// Forgot password input type

type ForgotPasswordPayload = {
  email: string;
};
