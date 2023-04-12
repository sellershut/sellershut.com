export type ApiAccount = {
  id: string;
  userId: string;
  type: 'oidc' | 'oauth' | 'email' | 'credentials';
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
};
