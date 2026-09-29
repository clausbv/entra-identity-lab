# Microsoft Entra ID Identity Lab

A hands-on identity and access management lab focused on Microsoft Entra ID, Microsoft Graph, authentication, authorization, user lifecycle management, groups, roles, and enterprise applications.

## Objectives

This project documents practical experience with:

- Microsoft Entra ID tenant administration
- User and group lifecycle management
- Administrative roles and least privilege
- Authentication methods and MFA
- Guest user access and external collaboration
- Microsoft Graph PowerShell
- Enterprise applications and application registrations
- OAuth 2.0, OpenID Connect, and SAML
- Identity security testing and troubleshooting
- Automation with PowerShell and Python

| Lab                                                                                         | Topic                                                                | Status    |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------- |
| [L00](labs/L00-tenant-baseline/README.md)                                                   | Tenant baseline                                                      | Completed |
| [L01](labs/L01-user-group-lifecycle/README.md)                                              | User and group lifecycle management                                  | Completed |
| [L02](labs/L02-application-oidc/README.md)                                                  | Application registration, OIDC, and delegated Microsoft Graph access | Completed |
| [L03](labs/L03-saml-sso-assignment/README.md)                                               | SAML single sign-on and application assignment                       | Completed |
| [L04](labs/L04%20%E2%80%94%20Authentication%20Methods%20and%20Account%20Recovery/README.md) | Authentication methods and account recovery                          | Completed |
| [L05](labs/L05-dynamic-group-app-access/README.md)                                          | Dynamic group membership and application access                      | Completed |
| [L06](labs/L06-conditional-access-report-only/README.md)                                    | Conditional Access MFA pilot in report-only mode                     | Completed |
| [L07](labs/L07-privileged-identity-management/README.md) | Privileged Identity Management and just-in-time role activation      | Completed |

## Repository Structure

entra-identity-lab/
├── README.md
├── .gitignore
└── labs/
    ├── L00-tenant-baseline/
    │   └── README.md
    ├── L01-user-group-lifecycle/
    │   └── README.md
    ├── L02-application-oidc/
    │   ├── README.md
    │   └── src/
    ├── L03-saml-sso-assignment/
    │   └── README.md
    ├── L04 — Authentication Methods and Account Recovery/
    │   └── README.md
    ├── L05-dynamic-group-app-access/
    │   └── README.md
    ├── L06-conditional-access-report-only/
    │   └── README.md
    └── L07-privileged-identity-management/
        └── README.md