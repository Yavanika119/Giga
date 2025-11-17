export const keycloakConfig = {
  issuer: 'https://<your-keycloak-domain>/realms/<realm-name>',
  clientId: '<client-id>',
  redirectUrl: 'com.yourapp://callback', // match your app scheme
  scopes: ['openid', 'profile', 'email'],
  dangerouslyAllowInsecureHttpRequests: false, // use true only for local dev
};
