// components/apiComponent.ts

import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URL;

export const Signup = async (formData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/sign-up`, formData);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const ForgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
      email,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const ResetPassword = async (
  token: string,
  newPassword: any,
  confirmPassword: any
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/reset-password?token=${token}`,
      {
        newPassword,
        confirmPassword,
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const ChangePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/change-password`,
      {
        userId,
        oldPassword,
        newPassword,
        confirmNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const GetUserList = async (role: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/list?role=${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const GetPropertiesList = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/property/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const GetCardsList = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/analytics/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
