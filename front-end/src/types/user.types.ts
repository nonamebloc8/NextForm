/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Role interface representing a user role
 */
export interface Role {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * UserRole interface representing the relationship between a user and their roles
 */
export interface UserRole {
  id?: string;
  userId?: string;
  user_id?: string;
  roleId?: string;
  role_id: string; // Primary field for role ID
  role?: Role; // Role details with name
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Comprehensive User interface with all fields from the application
 * Supports both snake_case (API) and camelCase (frontend) naming conventions
 */
export interface User {
  // Core fields
  id: string;
  email: string;

  // Name fields (supports both conventions)
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  name?: string;

  // Contact fields
  telephone?: string | null;
  phoneNumber?: string;
  phone_number?: string;
  whatsapp?: string;
  momoNumber?: string;
  momoName?: string;

  // Location fields
  regionId?: string | null;
  region_id?: string | null;
  cityId?: string | null;
  city_id?: string | null;
  city?: any;
  City?: {
    id?: string;
    city_name?: string;
    name?: string;
  };
  region?: any;
  Region?: {
    id?: string;
    name?: string;
  };
  quarter?: string;
  department?: string;

  // Supervisor/Manager fields
  supervisorId?: string | null;
  supervisor_id?: string | null;
  supervisor?: User;

  // Role fields
  roleId?: string | null;
  role_id?: string | null;
  role?: string;
  UserRoles?: UserRole[];
  userRoles?: UserRole[];
  userType?: string;

  // Status and profile
  isActive?: boolean;
  is_active?: boolean;
  status?: string;
  picture_profile?: string;
  pictureProfile?: string;

  // Matricule/ID
  matricule?: string;

  // Company/Organization
  companyId?: string;
  company_id?: string;

  // Bar/POS fields
  posId?: string;
  pos_id?: string;
  pos?: any;
  managedPointsOfSale?: any[];
  ownedPointsOfSale?: any[];

  // Timestamps
  createdAt?: string;
  created_at?: string;
  updatedAt?: string;
  updated_at?: string;
  deletedAt?: string | null;
  deleted_at?: string | null;

  // Data counts
  _count?: {
    ActivityMonitoring?: number;
    Children?: number;
    Pos?: number;
  };
}

/**
 * Payload for creating a new user
 */
export interface CreateUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  supervisor_id: string;
  city_id: string;
  role_id: string;
  region_id: string;
  whatsapp?: string;
  momoNumber?: string;
  momoName?: string;
  matricule?: string;
  company_id?: string;
  pos_id?: string;
}

/**
 * Payload for updating a user
 */
export interface UpdateUserPayload {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  supervisor_id?: string;
  city_id?: string;
  role_id?: string;
  region_id?: string;
  whatsapp?: string;
  momoNumber?: string;
  momoName?: string;
  matricule?: string;
  status?: string;
  is_active?: boolean;
}

/**
 * Helper function to get user's primary role ID
 */
export const getUserRoleId = (user: User | null | undefined): string | null => {
  if (!user?.UserRoles || user.UserRoles.length === 0) {
    return user?.roleId || user?.role_id || null;
  }
  return user.UserRoles[0].role_id || null;
};

/**
 * Helper function to get user's primary role name
 */
export const getUserRoleName = (
  user: User | null | undefined,
): string | null => {
  if (!user?.UserRoles || user.UserRoles.length === 0) {
    return user?.role || null;
  }
  return user.UserRoles[0].role?.name || null;
};

/**
 * Helper function to get user's full name
 */
export const getUserFullName = (user: User | null | undefined): string => {
  if (!user) return '';

  const firstName = user.firstName || user.first_name || '';
  const lastName = user.lastName || user.last_name || '';

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return user.name || firstName || lastName || '';
};

/**
 * Helper function to get user's phone number
 */
export const getUserPhoneNumber = (
  user: User | null | undefined,
): string | null => {
  if (!user) return null;

  return (
    user.phoneNumber ||
    user.phone_number ||
    user.telephone ||
    user.whatsapp ||
    null
  );
};
