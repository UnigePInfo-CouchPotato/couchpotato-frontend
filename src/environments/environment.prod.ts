// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { apiMiddlewareConfig, config } from '../../auth_config';

const { domain, clientId, audience, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};

const { middlewareClientId, middlewareCS, middlewareAudience, middlewareGT } = apiMiddlewareConfig as {
  middlewareClientId: string;
  middlewareCS: string;
  middlewareAudience: string;
  middlewareGT: string;
};

export const environment = {
  production: true,
  auth0: {
    domain,
    clientId,
    ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  auth0Mgmt: {
    middlewareClientId,
    middlewareCS,
    middlewareAudience,
    middlewareGT
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
  api_rooms: 'https://pinfo2.unige.ch/api/v1/rooms',
  api_recommendations: 'https://pinfo2.unige.ch/api/v1/recommendation',
};
