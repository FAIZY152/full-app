export interface signupInpt {
  fullname: string;
  email: string;
  password: string;
  phone: string;
}

export interface loginInpt {
  email: string;
  password: string;
}

export type User = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  phone: number;
  city: string;
  address: string;
  country: string;
  isAdmin: boolean;
  isVerified: boolean;
  profilePicture: string;
};

export type UpdateProfileInput = {
  fullname?: string;
  email?: string;
  phone?: number;
  city?: string;
  address?: string;
  country?: string;
  profilePicture?: string;
};

export type UserState = {
  isAuthentiacte: boolean;
  loading: boolean;
  user: User | null;
  isCheckAuth: boolean;
  isAdmin: boolean;
  signup: (input: signupInpt) => Promise<boolean | void>;
  login: (input: loginInpt) => Promise<boolean | void>;
  CaptainSignupApi: (input: signupInpt) => Promise<boolean | void>;
  CaptainLoginApi: (input: loginInpt) => Promise<boolean | void>;
  logout: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  CheckingAuth: () => Promise<void>;
  forgetPassword: (
    email: string,
    fullname: string,
    password: string
  ) => Promise<void>;
  updateProfile: (input: UpdateProfileInput) => Promise<void>;
};
