import type { AdapterAccount } from '@auth/core/adapters';
import axios from 'axios';
import type { ApiAccount } from '$lib/@types/auth/account';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export const apiLinkAccount = async (
  account: AdapterAccount,
): Promise<AdapterAccount | null | undefined> => {
  const data = await axios.post(
    PUBLIC_API_ENDPOINT,
    {
      query: `mutation createAccount(
          $type: String!,
          $scope: String,
          $userId: String!,
          $provider: String!,
          $idToken: String,
          $tokenType: String,
          $accessToken: String,
          $refreshToken: String,
          $providerAccountId: String!,
          $sessionState: String,
          $expiresIn: Int) {
                createAccount(
                    input: {
                        providerAccountId: $providerAccountId,
                        provider: $provider,
                        type: $type,
                        scope: $scope,
                        userId: $userId,
                        tokenType: $tokenType,
                        idToken: $idToken,
                        accessToken: $accessToken,
                        refreshToken: $refreshToken,
                        expiresIn: $expiresIn,
                        sessionState: $sessionState
                    }
                ) {

                        providerAccountId
                        provider
                        type
                        scope
                        userId
                        tokenType
                        idToken
                        accessToken
                        refreshToken
                        expiresAt
                }
            }`,
      variables: account,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const { createAccount }: { createAccount: ApiAccount } = data.data.data;

  return {
    expires_in: createAccount.expiresAt,
    providerAccountId: createAccount.providerAccountId,
    provider: createAccount.provider,
    type: createAccount.type,
    scope: createAccount.scope,
    userId: createAccount.userId,
    token_type: createAccount.tokenType,
    id_token: createAccount.idToken,
    access_token: createAccount.accessToken,
    refresh_token: createAccount.refreshToken,
  };
};

export const apiUnlinkAccount = async (
  providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
): Promise<AdapterAccount | undefined> => {
  const data = await axios.post(
    PUBLIC_API_ENDPOINT,
    {
      query: `mutation deleteAccount(
                $provider: String!,
                $providerAccountId: String!) {
                    deleteAccount(
                        providerAccountId: $providerAccountId,
                        provider: $provider,
                    ) {
                        rowsAffected
                    }
                }`,
      variables: providerAccountId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return data.data.data.deleteAccount;
};

export default apiLinkAccount;
