interface ErrorDetails {
  source: string;
  title: string;
  detail: string;
  status: number;
}

interface ExpressError {
  errors: ErrorDetails;
}

export interface IExpressError {
  error: ExpressError;
  message?: string;
}
