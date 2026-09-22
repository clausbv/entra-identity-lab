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

| Lab                                       | Topic                                    | Status    |
| ----------------------------------------- | ---------------------------------------- | --------- |
| [L00](labs/L00-tenant-baseline/README.md) | Tenant baseline and administrative setup | Completed |
| L01                                       | User and group lifecycle management      | Planned   |
| L02                                       | Roles and least-privilege administration | Planned   |
| L03                                       | Authentication methods and MFA           | Planned   |
| L04                                       | Enterprise applications and SSO          | Planned   |
| L05                                       | Application registrations and OAuth/OIDC | Planned   |
| L06                                       | Microsoft Graph automation               | Planned   |

## Repository Structure

```text
entra-identity-lab/
├── README.md
├── .gitignore
└── labs/
    └── L00-tenant-baseline/
        ├── README.md
        └── evidence/
```
