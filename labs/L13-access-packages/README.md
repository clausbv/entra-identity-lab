# L13 — Entitlement Management: Access Packages

## Objective

Test temporary group membership through an access package:

- Allow Jon Robot to request access.
- Require approval from Claudiu.
- Deliver membership in a dedicated test group.
- Verify automatic removal after assignment expiration.
- Inspect audit records for membership delivery and removal.

## Environment

- Microsoft Entra tenant with an active Entra ID P2 trial.
- Administrator and approver: Claudiu.
- Requestor: Jon Robot, an internal member user.
- Execution dates: October 5–6, 2026.

## Concepts

Entitlement Management manages access requests, approvals,
resource assignments, and access expiration.

| Component      | Purpose in this lab                                     |
| -------------- | ------------------------------------------------------- |
| Catalog        | Contains the resource available for packaging           |
| Resource role  | Member role in the test security group                  |
| Access package | Offers temporary membership in that group               |
| Policy         | Defines eligibility, requests, approval, and expiration |
| Assignment     | Represents Jon's granted access to the package          |
| My Access      | Allows Jon to request access and inspect request status |

Assignment expiration removes the access granted through the package.
It does not delete the access package, its policy, or its catalog.

Compared with the previous PIM labs, this lab manages requested
project access through a package rather than privileged role activation.

## Resources Created

| Resource          | Name                   |
| ----------------- | ---------------------- |
| Security group    | LAB-L13-Package-Access |
| Catalog           | LAB-L13-Catalog        |
| Access package    | LAB-L13-Project-Access |
| Assignment policy | Initial Policy         |

### Security group

- Group type: Security
- Membership type: Assigned
- Microsoft Entra roles assignable to the group: No
- Initially contained no members

Jon was not manually added to this group.

### Catalog

- Name: LAB-L13-Catalog
- Description: Lab resources for temporary project access.
- Enabled: Yes
- Enabled for external users: No

The test security group was added as a catalog resource.

### Access package

- Name: LAB-L13-Project-Access
- Description: Temporary project group membership with approval
- Catalog: LAB-L13-Catalog
- Resource: LAB-L13-Package-Access
- Resource role: Member

## Request and Assignment Policy

Configured policy:

- Eligible subjects: Specific users and groups in the directory
- Selected user: Jon Robot
- Self-service requests: Enabled
- Requestor justification: Required
- Approval: Required
- Approval stages: 1
- Specific approver: Claudiu Salagean
- Approver justification: Required
- Assignment expiration: Number of days
- Duration: 1 day
- Assignment extension: Disabled
- Access reviews: Not enabled for this policy

The approval decision timeout was not recorded.

The Self request option was enabled during troubleshooting after
the package initially did not appear as available to Jon.

After saving the change, Jon could see the package in My Access.

No Verified ID or sponsor-based approval feature was configured.

## Request and Approval Test

Jon opened My Access and requested:

LAB-L13-Project-Access

The request included a justification.

Observed request history:

- Pending approval on October 5, approximately 5:42 PM EEST

Claudiu approved the request.

Observed subsequent states:

1. Delivering
2. Delivered

The group Members page confirmed that Jon had been added to:

LAB-L13-Package-Access

The assignment showed:

- User: Jon Robot
- Policy: Initial Policy
- Status: Delivered
- End date: October 6, 2026, 5:48 PM

## Delivery Audit

The group membership audit was inspected.

| Field      | Observed value                                      |
| ---------- | --------------------------------------------------- |
| Activity   | Add member to group                                 |
| Date       | October 5, 2026, approximately 5:48 PM              |
| Category   | GroupManagement                                     |
| Status     | success                                             |
| Actor type | Application                                         |
| Actor      | Azure AD Identity Governance - Directory Management |

The inspected targets and modified properties linked the event
to Jon and LAB-L13-Package-Access.

Group object ID:

1435ee7c-ba3e-41d9-8902-d4b5c0dd6249

Delivery correlation ID:

7b58ddc0-3b5b-45fe-b51c-397c56aad51a

The application actor supports that membership was delivered
by Identity Governance.

## Automatic Expiration Test

The assignment was allowed to reach its configured end date.

No manual removal of Jon's assignment or group membership
was performed during this expiration test.

After the expiration time:

1. The access package Assignments list was refreshed.
2. Jon no longer appeared in that list.
3. The test group's Members page was inspected.
4. Jon was confirmed absent from the group.

The observed result was automatic removal of the group membership
granted through the access package.

An explicit Expired assignment status was not captured.
The verified evidence consists of assignment absence,
membership absence, and the successful removal audit.

## Removal Audit

The removal event was inspected.

| Field      | Observed value                                      |
| ---------- | --------------------------------------------------- |
| Activity   | Remove member from group                            |
| Date       | October 6, 2026, 5:55 PM                            |
| Category   | GroupManagement                                     |
| Status     | success                                             |
| Actor type | Application                                         |
| Actor      | Azure AD Identity Governance - Directory Management |

Jon and LAB-L13-Package-Access were confirmed in the inspected
targets or modified properties.

Removal correlation ID:

35314252-f96b-4e46-888d-16a76e73ae4b

The removal event occurred approximately seven minutes after
the displayed assignment end time of 5:48 PM.

This is the delay observed in this test, not a guaranteed
processing time for other assignments.

## Verified Results

- Jon could request the package through My Access.
- The request required approval.
- Claudiu approved the request.
- The assignment reached Delivered.
- Jon became a member of the test group.
- The assignment had a one-day expiration.
- After expiration, Jon no longer appeared in Assignments.
- Jon was removed from the test group.
- Both membership delivery and removal had successful audit records.
- Both group operations were initiated by Identity Governance.

## Final State and Cleanup

Cleanup was intentionally not performed.

The following resources were retained for future practice:

- LAB-L13-Project-Access
- Its Initial Policy
- LAB-L13-Catalog
- LAB-L13-Package-Access

Jon's tested assignment no longer appeared in Assignments,
and he was no longer a member of the test group.

The package and its request policy remain configured.
Expiration of the tested assignment does not disable future requests.

No Conditional Access policies were enabled or modified.
No emergency access accounts or unrelated groups were modified.

## Scope and Limitations

This lab verified access-package-based membership in one
Assigned security group for an internal member user.

The following were not tested:

- External users or connected organizations
- Multiple resources in one package
- Multi-stage approval
- Request rejection
- Assignment extension
- Recurring access reviews
- Application or SharePoint resource access
- Privileged role activation through PIM

## Practical Value

This workflow can provide temporary project access with:

- A defined eligible population
- A request justification
- An accountable approver
- Automatic delivery
- A defined access duration
- Automatic removal
- Audit evidence

The administrator configures the access process.
The requestor requests access.
The approver decides whether to grant it.
Identity Governance delivers and later removes the assigned access.

## References

- [Entitlement Management overview](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview)
- [Create an access package](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create)
- [Change access package lifecycle settings](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-lifecycle)
