# L01 — User and Group Lifecycle Management

Part of the **Microsoft Entra ID Identity Lab**.

**Status:** Completed. Practical objectives and temporary test-account cleanup verified.

## Purpose

Practice the lifecycle of a cloud-only Microsoft Entra user: creation, profile updates, group membership changes, account disablement, recovery after deletion, and temporary administrative delegation. Validate changes through sign-in tests, portal checks, and audit records.

## Environment

- Microsoft Entra ID Free tenant established in L00.
- Microsoft Entra admin center used for all directory changes in this lab.
- An existing Global Administrator account used for administration and role assignment.
- Separate administrator and test-user browser sessions.
- Existing tenant authentication configuration retained.
- No PowerShell automation or premium features used for these exercises.

The guest invitation setting inherited from L00 allows anyone in the organization, including guests and non-administrators, to invite guest users.

## Lab objects

| Object | Configuration and purpose |
| --- | --- |
| Jon Ceau | Cloud-only Member user; primary lifecycle test account |
| LAB-App-Users | Security group with Assigned membership |
| Group owner | The designated lab administrator |
| LAB-Delegation-Test01 | Temporary user created by Jon during the administrative delegation test |

Jon's baseline profile used Department **Support**, Job title **Support Analyst**, and Company name **Northstar Support**. Jon started without administrative roles.

Tenant-specific sign-in names and identifiers are omitted. Object IDs were compared directly in the tenant during validation.

## Objectives

- [x] Create a cloud-only user and verify sign-in.
- [x] Create a Security group with Assigned membership and an owner.
- [x] Add, remove, and re-add a group member.
- [x] Change a user attribute and verify the effect on Assigned membership.
- [x] Disable and re-enable a user, with negative and positive sign-in tests.
- [x] Delete and restore a user, then verify identity, membership, and sign-in.
- [x] Assign and remove the User Administrator role.
- [x] Verify an allowed administrative action and unavailable actions in the portal.
- [x] Review audit records for membership, user, and role changes.

## Execution and observed results

### 1. Create a user and verify sign-in

Created Jon Ceau through **Entra ID → Users → All users → New user → Create new user**, with the baseline profile above and the account enabled.

Signed in as Jon in a separate browser session and accessed My Apps. Reviewed the user's sign-in activity, including application, status, and authentication information.

**Result:** The new account could authenticate. The signed-in identity was verified as Jon Ceau.

### 2. Create the group and manage membership

Created **LAB-App-Users** with:

- Group type: **Security**.
- Membership type: **Assigned**.
- Owner: the designated lab administrator.
- Member: Jon Ceau.

Removed Jon from the group, verified his absence, then added him again and verified his presence.

Reviewed **Remove member from group** and **Add member to group** in Audit logs.

**Result:** Manual membership changes were reflected in the group and recorded in the audit trail.

### 3. Update the user profile

Changed Jon's Department from **Support** to **Finance** and checked:

1. The updated Department value.
2. The unchanged user Object ID.
3. Continued membership in **LAB-App-Users**.
4. The **Update user** audit record and its modified properties.

Restored Department to **Support**.

**Result:** Updating an attribute did not change the user's identity or Assigned group membership. Membership was managed manually; no dynamic membership rule was configured.

### 4. Disable and re-enable the account

Disabled Jon's account from the administrator session and attempted a fresh sign-in as Jon.

The sign-in was refused. The matching sign-in record showed:

| Field | Observed value |
| --- | --- |
| Status | Failure |
| Error code | 50057 |
| Failure reason | User account is disabled |

The record appeared after a delay. The error code and failure reason were used to establish the cause, rather than relying only on the browser's account-locked wording.

Re-enabled the account and repeated sign-in in a fresh session.

**Result:** New authentication was refused while the account was disabled and succeeded after re-enablement. Existing application-session termination was not tested.

### 5. Delete and restore the user

Recorded Jon's Object ID and verified his membership in **LAB-App-Users** before deletion.

Deleted Jon, found him under **Users → Deleted users**, and used **Restore user**. No permanent deletion was performed.

After restoration, verified:

- Jon reappeared in **All users**.
- Object ID matched the value recorded before deletion.
- **LAB-App-Users** membership was present without manually re-adding him.
- A fresh sign-in succeeded.

Reviewed **Delete user** and **Restore user** audit records. Both showed **Success**, the expected initiating administrator, and Jon as the target.

**Result:** The original directory identity and its tested group membership were recovered successfully.

### 6. Delegate user administration

From the administrator session, assigned **User Administrator** directly to Jon through **Assigned roles → Add assignments**.

This was a tenant-wide assignment. It was temporary because it was manually removed after testing; it had no configured automatic expiry.

In a fresh session as Jon:

1. Created **LAB-Delegation-Test01** without assigning it groups or administrative roles.
2. Verified that the new user appeared in **All users**.
3. Opened the test user's **Assigned roles** page.
4. Observed that adding a role assignment was unavailable.

The administrator then removed **User Administrator** from Jon. After a fresh sign-in, Jon no longer had the option to create an internal user. The option to invite an external user remained available, consistent with the tenant's guest invitation setting.

**Result:** User creation succeeded with the delegated role. Role assignment was unavailable. After role removal, internal user creation was unavailable in the portal.

**Validation boundary:** The unavailable controls were verified in the portal. These checks were not API authorization tests, and no failed API request is claimed.

### 7. Verify the delegation audit trail

Reviewed these successful events:

| Activity | Initiated by | Target checked |
| --- | --- | --- |
| Add member to role | Lab administrator | Jon Ceau; User Administrator |
| Add user | Jon Ceau | LAB-Delegation-Test01 |
| Remove member from role | Lab administrator | Jon Ceau; User Administrator |

**Result:** Audit records linked the role assignment, the delegated user's action, and subsequent role removal to the expected actors and targets.

## Validation summary

| Test | Observed result |
| --- | --- |
| New user sign-in | Successful |
| Remove/re-add group member | Absence and restored membership verified |
| Department change | Updated value; same Object ID; Assigned membership unchanged |
| Sign-in while disabled | Failure; error 50057; account disabled |
| Sign-in after re-enablement | Successful |
| Restore deleted user | Same Object ID; membership recovered; sign-in successful |
| Create user as User Administrator | Successful |
| Assign a role as User Administrator | Assignment control unavailable |
| Create internal user after role removal | Creation option unavailable after fresh sign-in |
| Audit correlation | Expected activities, actors, targets, and successful statuses confirmed |
| Temporary test-account cleanup | LAB-Delegation-Test01 deleted and verified in Deleted users |

## Final state and cleanup

- [x] Jon Ceau retained and enabled.
- [x] Department restored to Support.
- [x] Temporary User Administrator assignment removed; Jon has no administrative roles.
- [x] LAB-App-Users retained as a Security group with Assigned membership.
- [x] Jon present in the group; designated administrator present as owner.
- [x] LAB-Delegation-Test01 deleted and verified in Deleted users.

**LAB-Delegation-Test01** was deleted and its presence in **Deleted users** was confirmed. No permanent deletion was performed. Jon Ceau and LAB-App-Users were retained for subsequent labs.

## Key concepts and scope

- **User principal name (UPN):** The user's sign-in name. **Object ID:** The identifier of the directory object; compared before and after restoration in this lab.
- **Assigned membership:** Membership maintained through explicit changes. Changing Department did not automatically move Jon between groups.
- **Group owner and member:** Separate relationships. Ownership supports group management; membership identifies users included in the group.
- **Administrative role:** A set of directory-management permissions. Role assignment and group membership are distinct operations.
- **Soft deletion:** A deleted user can be restored within the documented 30-day recovery period. This lab restored the user during that period.
- **Sign-in logs:** Used to inspect authentication attempts and the disabled-account failure. **Audit logs:** Used to inspect administrative changes and their initiators.

Dynamic membership was discussed but not configured. No application or resource access was assigned through LAB-App-Users, so membership checks do not demonstrate application provisioning or access revocation. Full employee offboarding, application-session revocation, and downstream deprovisioning were outside this lab's scope.

## Microsoft documentation

- [Create, invite, and delete users](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users)
- [Manage groups and membership](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups)
- [Restore a deleted user](https://learn.microsoft.com/en-us/entra/fundamentals/users-restore)
- [Recover from deletions](https://learn.microsoft.com/en-us/entra/architecture/recover-from-deletions)
- [Microsoft Entra built-in roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference)
- [Assign Microsoft Entra roles](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/manage-roles-portal)
- [Audit activities reference](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-audit-activities)
- [Authentication error codes](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes)
- [Log latency](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-log-latency)
- [External collaboration settings](https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure)
