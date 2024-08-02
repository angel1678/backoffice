export interface App {
    name: string;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
  }

  export interface Auth {
    user: User;
    roles: string[];
    isAdmin: boolean;
    notifications: any;
  }

  export interface Message {
    detail: string;
    type: "success" | "info" | "warn" | "error" | undefined;
  }

  export type InvolvedType = 'actor'|'defendant';

  export interface DropdownType {
    value: any;
    label: string;
  }

  export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    app: App,
    auth: Auth,
    urlPrev?: string;
    message?: Message;
  };
