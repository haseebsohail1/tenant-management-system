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

export const GetPropertiesList = async (Landloard: string, token: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/property/list?landlordId=${Landloard}`,
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

export const GetAdminPropertiesList = async (
  token: string,
  state: string,
  country: string,
  city: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/analytics/properties?state=${state}&country=${country}&city=${city}`,
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

export const deleteUserData = async (token: string, userId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Failed to delete User.");
  }
};

export const deletePropertyData = async (token: string, propertyId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/property/${propertyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Failed to delete Property.");
  }
};

export const deleteUnitData = async (token: string, unitId: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/property/${unitId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Failed to delete Property.");
  }
};

export const GetUnitsList = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/unit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};
