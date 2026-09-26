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

## Lab Environment

| Component                | Configuration                |
| ------------------------ | ---------------------------- |
| Identity platform        | Microsoft Entra ID           |
| Entra license            | Microsoft Entra ID Free      |
| Azure subscription       | Azure free trial             |
| Administration interface | Microsoft Entra admin center |
| Command-line interface   | PowerShell 7                 |
| API and automation       | Microsoft Graph              |
| Source control           | Git and GitHub               |

> This is an educational lab environment. Tenant identifiers, credentials, tokens, personal information, and other sensitive data are excluded from this repository.

## Labs

## Labs

| Lab                                            | Topic                                                                | Status      |
| ---------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| [L00](labs/L00-tenant-baseline/README.md)      | Tenant baseline                                                      | Completed   |
| [L01](labs/L01-user-group-lifecycle/README.md) | User and group lifecycle management                                  | Completed   |
| [L02](labs/L02-application-oidc/README.md)     | Application registration, OIDC, and delegated Microsoft Graph access | Completed   |
| [L03](labs/L03-saml-sso-assignment/README.md)  | SAML single sign-on and application assignment                       | In progress |

## Repository Structure

## Repository Structure

```text
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
    └── L03-saml-sso-assignment/
        └── README.md
```
