import type { AdapterAccount } from '@auth/core/adapters';
import axios from 'axios';
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
                )
            }`,
      variables: account,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data.data.data.createAccount;
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
                    )
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
