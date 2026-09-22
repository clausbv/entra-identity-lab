# L00 — Microsoft Entra ID Tenant Baseline

## Objective

Establish and document the initial configuration of a Microsoft Entra ID lab tenant.

This baseline will be used as a reference point for future identity and access management labs.

## Environment

| Component                         | Configuration                |
| --------------------------------- | ---------------------------- |
| Identity platform                 | Microsoft Entra ID           |
| Tenant type                       | Cloud-only lab tenant        |
| Entra license                     | Microsoft Entra ID Free      |
| Administration portal             | Microsoft Entra admin center |
| Directory API                     | Microsoft Graph              |
| Microsoft Graph PowerShell module | Microsoft.Graph 2.40.0       |

## Lab Objectives

- Verify access to the Microsoft Entra tenant
- Review the tenant overview
- Create and test administrative accounts
- Create and test standard member accounts
- Review administrative role assignments
- Configure and test authentication methods
- Record the external collaboration baseline
- Verify the Microsoft Entra license
- Connect to Microsoft Graph
- Query tenant users through Microsoft Graph
- Document the initial security posture

## 1. Tenant Verification

The Microsoft Entra admin center was accessed successfully using a tenant administrator account.

The tenant overview was reviewed to confirm:

- Tenant availability
- Primary domain
- Existing users
- Existing groups
- Enterprise applications
- Administrative access
- Tenant status

Sensitive tenant information is not included in this repository.

## 2. User Accounts

Member accounts were created for administrative and standard-user testing.

The accounts were validated by:

- Confirming that each account appears in the directory
- Confirming the correct user type
- Testing account authentication
- Verifying the assigned administrative roles
- Confirming that standard users do not have administrative permissions

### Validation

| Check                              | Result |
| ---------------------------------- | ------ |
| Member accounts created            | Passed |
| Accounts visible in the directory  | Passed |
| Account authentication tested      | Passed |
| User types verified                | Passed |
| Standard user permissions verified | Passed |

## 3. Administrative Accounts

Three accounts currently have the Global Administrator role in the lab tenant.

Administrative sign-in was tested successfully.

| Check                         | Result |
| ----------------------------- | ------ |
| Global Administrator accounts | 3      |
| Administrative authentication | Passed |
| Administrative portal access  | Passed |
| Recovery access available     | Yes    |

Multiple Global Administrator accounts provide recovery options in the lab environment.

However, Global Administrator accounts should not be used for normal daily activities. Administrative work should use the least-privileged role capable of completing the required task.

## 4. Privileged Access Security

A Global Administrator has extensive control over the Microsoft Entra tenant.

If a Global Administrator session is compromised, an attacker may be able to:

- Create and delete users
- Disable user accounts
- Reset user passwords
- Assign administrative roles
- Modify authentication settings
- Register or modify applications
- Manage enterprise applications
- Grant application permissions
- Modify tenant-wide settings
- Change external collaboration settings
- Access or modify identity-related resources

If a standard user account is compromised, the attacker is generally limited to the permissions and resources assigned to that user.

This demonstrates the importance of:

- Separating standard and privileged accounts
- Applying least privilege
- Protecting administrator accounts with MFA
- Avoiding daily use of Global Administrator accounts
- Monitoring privileged role assignments

## 5. Authentication Methods

Authentication methods were configured and tested for the lab accounts.

The available authentication mechanisms include:

- Password authentication
- Microsoft Authenticator
- Mobile-device authentication
- Device PIN or passkey-based authentication

Two authentication-related profiles were created for future authentication testing.

A physical FIDO2 security key is not currently available in the lab.

### Validation

| Check                                 | Result |
| ------------------------------------- | ------ |
| Authentication methods reviewed       | Passed |
| Microsoft Authenticator available     | Yes    |
| Mobile authentication tested          | Yes    |
| Device PIN available                  | Yes    |
| Physical FIDO2 security key available | No     |

## 6. External Collaboration Baseline

The initial **Guest invite settings** configuration was:

> Anyone in the organization can invite guest users including guests and non-admins (most inclusive).

This is the most permissive guest invitation configuration.

Inviting a guest and granting access to a resource are separate operations.

### Guest Invitation

A guest invitation introduces an external identity into the Microsoft Entra tenant.

### Resource Authorization

The guest must still be granted access to a specific resource, such as:

- A group
- An enterprise application
- A Microsoft 365 resource
- A SharePoint site
- A Teams team
- An Azure resource
- Another protected application

Being invited into the tenant does not automatically provide access to all organizational resources.

### Security Observation

Allowing all members and guests to invite external users increases the risk of:

- Uncontrolled guest account creation
- Unnecessary external identities
- Difficult access reviews
- Accidental resource exposure
- Guest-account lifecycle problems

A future hardening lab should evaluate a more restrictive guest invitation policy.

## 7. Microsoft Entra Licensing

The licensing page displayed **“No account SKUs found.”**

This confirms that no Microsoft Entra ID P1, Microsoft Entra ID P2, or Microsoft 365 commercial licenses are currently assigned to the tenant.

The tenant is using Microsoft Entra ID Free capabilities.

### Current Licensing Baseline

| License                          | Status         |
| -------------------------------- | -------------- |
| Microsoft Entra ID Free          | Active/default |
| Microsoft Entra ID P1            | Not assigned   |
| Microsoft Entra ID P2            | Not assigned   |
| Microsoft 365 commercial license | Not assigned   |

## 8. Microsoft Entra ID Free Limitations

Some advanced identity security and governance features require Microsoft Entra ID P1 or P2.

Depending on licensing requirements, these may include:

- Conditional Access
- Privileged Identity Management
- Identity Protection
- Access reviews
- Entitlement management
- Advanced identity governance
- Risk-based authentication policies
- Some dynamic group capabilities

Labs that require unavailable licenses will be documented separately and will not be presented as implemented configurations.

## 9. Microsoft Graph Connection

Microsoft Graph PowerShell was used to access tenant directory information.

The installed module was verified with:

```powershell
Get-InstalledModule Microsoft.Graph
```

The `Connect-MgGraph` command was verified with:

```powershell
Get-Command Connect-MgGraph
```

The installed Microsoft Graph module version was:

```text
2.40.0
```

A delegated Microsoft Graph connection was established using directory read permissions.

Example:

```powershell
Connect-MgGraph `
    -Scopes "User.Read.All","Group.Read.All","Directory.Read.All"
```

The active Microsoft Graph session can be checked with:

```powershell
Get-MgContext
```

The context should be reviewed to confirm:

- Correct tenant
- Correct account
- Authentication type
- Granted scopes

## 10. Microsoft Graph User Query

Tenant users were retrieved with:

```powershell
Get-MgUser -All |
    Select-Object DisplayName, UserPrincipalName, UserType
```

The query successfully returned:

- User display names
- User principal names
- User types

This validated:

- Microsoft Graph authentication
- Tenant selection
- Delegated permissions
- Directory read access
- Microsoft Graph PowerShell functionality

Sensitive account information is not included in the repository evidence.

## 11. Microsoft Graph Troubleshooting

An initial Microsoft Graph request returned an authorization error.

The investigation focused on:

- The account used for authentication
- The active Microsoft Entra tenant
- The requested delegated scopes
- The permissions granted to Microsoft Graph Command Line Tools
- The active Microsoft Graph context

The connection was re-established using the correct tenant account and the required permissions.

The current context was then verified with:

```powershell
Get-MgContext
```

The user query was repeated successfully.

### Lesson

Successful authentication does not automatically mean that the session has authorization to perform every Microsoft Graph operation.

The access token must contain the permissions required by the requested API operation.

## 12. Validation Summary

| Validation                                     | Result |
| ---------------------------------------------- | ------ |
| Microsoft Entra admin center accessible        | Passed |
| Tenant overview reviewed                       | Passed |
| Member accounts created                        | Passed |
| Standard-user authentication tested            | Passed |
| Administrator authentication tested            | Passed |
| Administrative roles reviewed                  | Passed |
| Authentication methods reviewed                | Passed |
| Guest invitation configuration recorded        | Passed |
| Microsoft Entra license reviewed               | Passed |
| Microsoft Graph module verified                | Passed |
| Microsoft Graph authentication completed       | Passed |
| Microsoft Graph context verified               | Passed |
| Tenant users retrieved through Microsoft Graph | Passed |

## 13. Security Findings

### Finding 1: Multiple Global Administrators

The tenant currently has three Global Administrator accounts.

This provides recovery options in the lab but increases the number of highly privileged identities that must be protected.

### Finding 2: Permissive Guest Invitations

The tenant allows members, guests, and non-administrators to invite external users.

This is suitable for testing but should be reviewed before using the tenant as a production model.

### Finding 3: Entra ID Free License

The tenant does not currently have Entra ID P1 or P2.

Advanced identity protection and governance controls are therefore unavailable.

### Finding 4: Privileged and Standard Access

Standard accounts cannot perform tenant-wide administrative operations.

This confirms the security difference between a standard member account and a Global Administrator account.

## 14. Recommended Improvements

Future labs should evaluate the following improvements:

- Reduce the number of permanently assigned Global Administrators
- Use standard accounts for normal activities
- Assign task-specific administrative roles
- Strengthen authentication for privileged accounts
- Restrict guest invitation permissions
- Review guest users periodically
- Implement Conditional Access if licensing becomes available
- Implement Privileged Identity Management if licensing becomes available
- Monitor Microsoft Graph permissions and consent
- Review enterprise application permissions

## 15. Evidence Guidelines

Evidence added to this lab must be sanitized before publication.

Do not publish:

- Tenant IDs
- Full tenant domains
- Full user principal names
- Personal email addresses
- Passwords
- Access tokens
- Authentication codes
- Phone numbers
- QR codes
- Session information
- Client secrets
- Private keys

## Lessons Learned

- Global Administrator and standard-user compromises have very different security impacts.
- Administrative accounts should not be used for daily activities.
- Guest invitation and resource authorization are separate operations.
- A guest account does not automatically receive access to tenant resources.
- Microsoft Entra licensing determines which security and governance capabilities are available.
- Microsoft Graph authentication and Microsoft Graph authorization are separate concepts.
- The active account, tenant, and scopes must be verified before running directory queries.
- Least privilege reduces the impact of a compromised identity.

## Completion Status

**Status: Completed**

The initial Microsoft Entra ID tenant configuration has been documented and validated.

The tenant is ready for the next Microsoft Entra identity and access management lab.
