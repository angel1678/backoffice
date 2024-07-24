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

  export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    app: App,
    auth: Auth,
    urlPrev?: string;
  };
