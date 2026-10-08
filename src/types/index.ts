/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse = {
  data: any;
  meta?: IMeta;
};

export type UserRole = "super_admin" | "admin" | "company_admin" | "manager" | "employee" | string;

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  exp: number; // expiration time (unix)
  iat: number; // issued at
}

/** Type for user stored in cookies */
export interface ICookieUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin" | "super_admin" | string;
  isVerified?: boolean;
}

export type TNotificationType =
  | "attendance"
  | "patrol"
  | "task"
  | "report"
  | "document"
  | "announcement"
  | "shift"
  | "support"
  | "subscription"
  | "system"
  | "message"
  | "alert"
  | "account"
  | "user_registration"
  | "general";

export interface INotification {
  _id: string;
  sender?: {
    _id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    avatar?: string;
  } | null;
  recipient: string;
  type: TNotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
