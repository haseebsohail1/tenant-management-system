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

export const GetTenantsList = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tenant/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const GetLeaseAgreementList = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/lease/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const deleteUserData = async (token: string, userId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete User.");
  }
};

export const deletePropertyData = async (token: string, propertyId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/property/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete Property.");
  }
};

export const deleteUnitData = async (token: string, unitId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/property/${unitId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete Unit.");
  }
};

export const deleteTenantData = async (token: string, tenantId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/tenant/${tenantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete Tenant.");
  }
};

export const deleteDocumentData = async (token: string, documentId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/lease/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete Tenant.");
  }
};

export const AddProperty = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/property/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const AddUsers = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const AddUnits = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/unit/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const AddTenants = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/tenant/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const updateDocumentStatus = async (token: string, formData: any) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/lease/status`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update Status.");
  }
};

export const updateTenantStatus = async (token: string, formData: any) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/tenant/status`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update Status.");
  }
};

export const updateUsers = async (
  token: string,
  userId: string,
  formData: any
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/user/${userId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to update User Data.");
  }
};

export const updateProperties = async (
  token: string,
  propertyId: string,
  formData: any
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/property/${propertyId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to update Property Data.");
  }
};

export const updateUnits = async (
  token: string,
  unitId: string,
  formData: any
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/unit/${unitId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to update Units Data.");
  }
};

export const uploadDocument = async (
  token: string,
  documentId: string,
  formData: any
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/lease/upload-file/${documentId}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to update Units Data.");
  }
};
