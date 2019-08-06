interface Login {
  message: string;
  user: { email: string };
  token: string;
}

export interface ILogin {
  data: Login;
}
