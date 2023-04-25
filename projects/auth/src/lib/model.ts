export interface UserInfo {
  availableLanguages: string[];
  currentLanguage: string;
  permissions: string[];
  translations: Record<string, string>,
  userInfo: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    isActive: boolean;
    lastLoginTime: string;
    isPendingActivation: boolean;
    isLocked: boolean;
    userType: number;
    createdAt: number;
  };
}

export interface UserTenant {
  organizationId: number;
  tenantId: number;
  tenantName: string;
}

export interface UserTenants {
  result: UserTenant[];
}


export interface AuthState extends UserInfo {
  currentTenant: UserTenant;
  userTenants: UserTenant[];
  isLogged: boolean;
}
