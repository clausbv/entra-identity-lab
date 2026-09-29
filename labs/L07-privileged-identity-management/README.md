# L07 — Privileged Identity Management (PIM)

## Status

**Completed**

## Overview

This lab demonstrates just-in-time administrative access using Microsoft Entra Privileged Identity Management (PIM).

A test user was made eligible for the **Helpdesk Administrator** role, activated the role only when needed, performed an administrative task, and then deactivated the role.

The lab validates the difference between an **eligible** role assignment and an **active** role assignment.

## Objectives

- Configure an eligible Microsoft Entra role assignment.
- Confirm that eligibility alone does not grant administrative access.
- Activate the role through PIM using a justification.
- Verify that the activated role grants the expected permissions.
- Review the activation event in PIM audit history.
- Deactivate the role.
- Remove all temporary privileged assignments.

## Environment

- Microsoft Entra ID tenant: `Kaizen Star Srl`
- License: Microsoft Entra ID P2 trial
- Privileged access feature: Microsoft Entra Privileged Identity Management
- Eligible user: `Jon Robot`
- Test target: `Ana Finance`
- Test target UPN: `LAB-Finance-01@KaizenStarSrl.onmicrosoft.com`
- Role: `Helpdesk Administrator`
- Scope: Directory

## Prerequisites

- Microsoft Entra ID P2 or Microsoft Entra ID Governance licensing
- A Global Administrator or Privileged Role Administrator account
- A non-administrator test user
- A second user account on which to test the delegated administrative action

## Lab procedure

### 1. Open Privileged Identity Management

In the Microsoft Entra admin center, navigate to:

`Identity governance → Privileged Identity Management → Microsoft Entra roles`

### 2. Create an eligible role assignment

The following assignment was configured:

| Setting         | Value                  |
| --------------- | ---------------------- |
| Role            | Helpdesk Administrator |
| Assignment type | Eligible               |
| Member          | Jon Robot              |
| Membership      | Direct                 |
| Scope           | Directory              |

An **Eligible** assignment means that the user can activate the role when needed, but does not receive the role permissions automatically.

The value **Direct** indicates that the assignment was made directly to the user and not through a group.

### 3. Verify access before activation

Jon signed in without activating the Helpdesk Administrator role.

He attempted to reset the password of the test user:

`LAB-Finance-01@KaizenStarSrl.onmicrosoft.com`

**Result:** The password reset was not permitted.

This confirmed that an eligible assignment does not automatically provide active administrative permissions.

### 4. Activate the role

Using Jon's account, the following page was opened:

`Privileged Identity Management → My roles → Microsoft Entra roles → Eligible assignments`

Jon selected the **Helpdesk Administrator** role and started the activation process.

A justification was provided for the activation.

After activation, the assignment appeared under **Active assignments** with:

- Role: Helpdesk Administrator
- State: Activated
- Membership: Direct
- Start time
- Expiration time

The assignment was active only for a limited period.

### 5. Verify access after activation

After activating the role, Jon attempted the same password-reset operation for `Ana Finance`.

**Result:** The password reset succeeded.

This demonstrated that the Helpdesk Administrator permissions became available only after the eligible role was activated through PIM.

### 6. Review the audit event

The PIM audit history contained the role activation event.

The event included:

- Activity: Activate eligible role assignment
- Role: Helpdesk Administrator
- Actor: Jon Robot
- Status: Success
- Activation date and time
- Activation justification

This audit event provides evidence of:

- Who activated the role
- Which role was activated
- When the activation occurred
- Whether the operation succeeded
- Why the role was activated

### 7. Deactivate the role

Using Jon's account, the following page was opened:

`Privileged Identity Management → My roles → Microsoft Entra roles → Active assignments`

The Helpdesk Administrator role was manually deactivated before its automatic expiration.

After deactivation, the role was no longer active.

## Troubleshooting performed

During the initial PIM configuration, the following error appeared:

`The role is not found`

The following checks and troubleshooting steps were performed:

- Confirmed that the tenant had an active Microsoft Entra ID P2 subscription.
- Confirmed that the Helpdesk Administrator role existed in Microsoft Entra ID.
- Confirmed that the administrator account had Global Administrator access.
- Verified the role using Microsoft Graph.
- Temporarily assigned the Privileged Role Administrator role to the administrator account.
- Allowed time for role-assignment propagation.
- Retried the eligible assignment in the Microsoft Entra admin center.

After propagation, the PIM eligible assignment was created successfully.

Microsoft Entra ID P2 was sufficient for this PIM lab. A separate Microsoft Entra ID Governance license was not required.

## Cleanup

After completing the validation:

- Jon's activated Helpdesk Administrator role was deactivated.
- Jon's eligible Helpdesk Administrator assignment was removed.
- The temporary Privileged Role Administrator assignment was removed from the administrator account.
- The administrator's permanent Global Administrator assignment remained unchanged.
- The emergency Global Administrator accounts were not modified.

## Results

| Test                                 | Expected result | Actual result |
| ------------------------------------ | --------------- | ------------- |
| Password reset while only eligible   | Denied          | Denied        |
| PIM role activation                  | Successful      | Successful    |
| Password reset while role was active | Allowed         | Allowed       |
| Activation visible in audit history  | Yes             | Yes           |
| Role deactivation                    | Successful      | Successful    |
| Eligible assignment removed          | Yes             | Yes           |
| Temporary administrator role removed | Yes             | Yes           |

## Key learnings

- An eligible role assignment does not immediately grant administrative permissions.
- PIM provides just-in-time and time-limited privileged access.
- A user must activate an eligible role before using its permissions.
- Role activation creates an auditable event containing the actor, role, status, time, and justification.
- Direct permanent assignments and PIM activations can both appear under active assignments.
- An activated PIM role can be identified by the **Activated** state and its expiration time.
- Temporary privileged assignments should be removed after testing.
- PIM supports the principle of least privilege by reducing permanent administrative access.

## Security notes

- No passwords, temporary credentials, or authentication secrets are stored in this repository.
- Screenshots should be reviewed before publication to ensure that they do not expose sensitive tenant information.
- Emergency administrator accounts must remain protected and should not be used for routine administration.
