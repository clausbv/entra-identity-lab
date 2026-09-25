# L02 — Application Registration, OpenID Connect, and Delegated Microsoft Graph Access

## Status

Practical lab completed. Interview and review questions are tracked separately.

## Objectives

- Register a single-tenant application in Microsoft Entra ID.
- Identify the relationship between an app registration and its enterprise application.
- Sign in a user through OpenID Connect (OIDC).
- Distinguish an ID token from an access token.
- Request delegated `User.Read` permission for Microsoft Graph.
- Call Microsoft Graph on behalf of the signed-in user.
- Inspect consent, sign-in activity, and audit events.

## Lab environment

- Microsoft Entra ID Free
- Application: `LAB-Northstar-OIDC`
- Test user: Jon Ceau
- Application type: Single-page application (SPA)
- Supported account types: Accounts in this organizational directory only
- Redirect URI: `http://localhost:3000/`
- Browser client: `@azure/msal-browser`

The lab did not require Microsoft Entra ID P1 or P2.

## 1. Application registration

I registered `LAB-Northstar-OIDC` in Microsoft Entra ID as a single-tenant application and configured a SPA redirect URI of `http://localhost:3000/`.

I confirmed that the app registration had a corresponding enterprise application in the tenant.

The **app registration** defines the application's identity and authentication configuration. The **enterprise application** is the tenant's service principal for that application, where settings such as user access, permissions, and activity can be inspected.

## 2. OIDC sign-in

I used MSAL Browser in a local SPA to sign in with Microsoft Entra ID. Jon Ceau authenticated successfully, and the application displayed account information for his signed-in session.

The sign-in request included the OIDC scopes `openid`, `profile`, and `email`.

OIDC provides the application with information about the authenticated user. An ID token is intended for the client application; it is not the token used to call Microsoft Graph.

## 3. Delegated Microsoft Graph access

I configured the delegated Microsoft Graph permission `User.Read` and requested a Graph access token through MSAL.

**Delegated access** means the application calls an API in the context of a signed-in user. The application needs the relevant delegated permission, and the API evaluates the request in that user's context.

The application called:

```http
GET https://graph.microsoft.com/v1.0/me
```

Microsoft Graph returned **HTTP 200 OK** and Jon's profile. I also confirmed the request URL, HTTP method, and response status in the browser's Network tools.

`User.Read` is the name of a Microsoft Graph delegated permission. `User` refers to user profile data, and `Read` describes the access granted. It is distinct from the HTTP `GET` method used in the request.

The profile response included `mail: null`. Therefore, permission to read the profile did not imply that the `mail` property had a value.

## 4. Tokens and audiences

The lab used two token purposes:

| Token        | Intended recipient   | Purpose in this lab                     |
| ------------ | -------------------- | --------------------------------------- |
| ID token     | `LAB-Northstar-OIDC` | Sign-in information for the application |
| Access token | Microsoft Graph      | Authorization for the Graph API request |

Microsoft Graph is the API that receives `GET /me`. The SPA is the client that requests the token and sends the API request. An ID token intended for the SPA must not be used as a Graph access token, even if its signature is valid.

## 5. Consent and revocation

Jon saw a permissions request and accepted it. In the enterprise application's **Permissions** view, I observed user consent associated with Jon and the application.

Jon then used **My Apps** to revoke the application's permissions. After the change, the previously observed user-consent entries were no longer listed in the enterprise application's Permissions view.

Microsoft Entra audit logs recorded a **Revoke consent** event with **Success** status. The event identified Jon's user principal name as the initiating actor.

A subsequent `GET /me` request succeeded without another visible consent prompt. This observation alone does not establish which token or grant enabled that request; the cause was not verified in this lab.

## 6. Activity verification

I inspected Microsoft Entra sign-in information for the application and Microsoft Graph, and reviewed the enterprise application's audit logs for the consent change.

The practical checks confirmed:

- Successful OIDC sign-in as Jon.
- A successful delegated Microsoft Graph `GET /me` call.
- A Graph response containing Jon's profile.
- User consent visible before revocation.
- A successful **Revoke consent** audit event initiated by Jon.

## Scope and limitations

- The lab used a single-tenant SPA and the delegated `User.Read` permission.
- It did not test application permissions or a client credentials flow.
- It did not establish why the Graph request succeeded after consent revocation.
- It did not test access to files or other Microsoft Graph resources.
- It did not require premium Microsoft Entra ID licensing.
