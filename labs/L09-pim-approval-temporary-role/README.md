# L09 — PIM Approval and Temporary Helpdesk Access

## Status

EXECUTAT — completed on 2026-10-01.

## Objective

Grant Jon Robot temporary Helpdesk Administrator access through PIM,
require approval from a separate account, and verify permissions before,
during, and after activation.

## Prerequisites and scope

- Microsoft Entra ID P2 assigned to Jon Robot and the approver.
- Configuration performed using the Claudiu administrator account.
- Jon Robot: operator, initially without active administrative roles.
- Claudiu Salagean: designated approver.
- Ana Finance: test user without administrative roles.
- Role scope: the laboratory tenant.
- Portal workflow only; no Graph permissions or API consent used.
- No Azure resources deployed.

## Concepts

- Eligible: the user may request activation but cannot yet use the role.
- Active: the user can use the role's permissions.
- Approval: a separate account authorizes the activation request.
- Eligibility duration and activation duration are separate settings.
- PIM activation MFA and sign-in MFA are separate requirements.

## Initial configuration

| Setting                             | Initial value |
| ----------------------------------- | ------------- |
| Activation maximum duration         | 8 hours       |
| On activation, require              | None          |
| Require justification on activation | Yes           |
| Require approval to activate        | No            |
| Approvers                           | None          |

## Implementation

1. Updated the Helpdesk Administrator activation settings:
   - Maximum duration: 1 hour.
   - MFA required.
   - Justification required.
   - Approval required.
   - Approver: Claudiu Salagean.
2. Assigned Helpdesk Administrator to Jon Robot as Eligible.
3. Verified that Jon could not reset Ana's password before activation.
4. Submitted an activation request as Jon.
5. Approved the request using the separate Claudiu account.
6. Verified that Helpdesk Administrator appeared in Active assignments.
7. Verified that Reset password became available.
8. Manually deactivated the role and confirmed access was refused
   after signing out and signing in again.
9. Repeated the activation workflow to perform an actual password reset.
10. Reset Ana's password and verified Jon as the initiator in Audit logs.

The first activation was used to verify the available action.
The actual password reset was performed during the second activation.

## Validation

| Test                                                 | Observed result                            | Status   |
| ---------------------------------------------------- | ------------------------------------------ | -------- |
| Reset password while only Eligible                   | Permission error                           | EXECUTAT |
| Activation approved by another account               | Approval succeeded                         | EXECUTAT |
| Role activation                                      | Helpdesk Administrator became Active       | EXECUTAT |
| Actual password reset during activation              | Reset performed; Jon verified as initiator | EXECUTAT |
| Access after manual deactivation and a fresh sign-in | Reset password refused                     | EXECUTAT |
| Final access test after assignment removal           | Reset password refused                     | EXECUTAT |
| Ana's access after password reset                    | My Apps sign-in confirmed                  | EXECUTAT |

A one-hour activation expiry was verified in the PIM audit details.
Expiry at the exact scheduled time was not observed as a separate test.

## Audit evidence

The following first-cycle PIM events were inspected:

| Action                                               | Requestor        | Status    |
| ---------------------------------------------------- | ---------------- | --------- |
| Add member to role request approved (PIM activation) | Claudiu Salagean | Succeeded |
| Add member to role completed (PIM activation)        | Jon Robot        | Succeeded |
| Remove member from role completed (PIM deactivate)   | Jon Robot        | Succeeded |

The recorded justification for the first activation and approval was
`testing`.

Ana's password-reset audit event was also inspected and identified
Jon Robot as the initiator.

## Troubleshooting

### An activation request was already pending

Observed message:

`There is already an existing pending Role assignment request.`

Resolution: opened Approve requests using the approver account and
processed the existing request.

### Activate was not available on the assignment management page

The page displayed assignment-management actions such as Remove and
Update.

Resolution: used Jon's self-service path:

ID Governance → Privileged Identity Management → My roles →
Microsoft Entra roles → Eligible assignments → Activate.

### MFA appeared during a later sign-in

The inspected Azure Portal sign-in event showed:

- Authentication requirement: Multifactor authentication.
- Authentication policies applied: Security Defaults.
- Authentication method: Previously satisfied.
- MFA requirement satisfied by claim in the token.

This event reused an existing MFA claim. It did not demonstrate that
a new Conditional Access policy had been enabled or identify the
separate interactive MFA prompt.

## Cleanup and final state

- Jon had no active Helpdesk Administrator assignment at the final check.
- Jon's Eligible Helpdesk Administrator assignment was removed.
- A fresh-session password-reset test was refused.
- Ana's My Apps access was verified.
- Helpdesk Administrator role settings remain configured with a
  one-hour maximum, MFA, justification, and approval.

The captured Eligible assignment had an end date in 2027.
It was removed during cleanup; the intended one-day eligibility
was not the final saved configuration.

## Rollback

Execution status: DOAR_DESIGN for restoring the original role settings.

To restore the original settings in the laboratory tenant:

1. Open Helpdesk Administrator → Settings → Edit.
2. Restore the activation maximum to 8 hours.
3. Restore On activation, require to None.
4. Keep justification required.
5. Disable approval and clear the designated approver.
6. Review and save.

These rollback changes were not executed. Removing Jon's assignment
does not restore the role settings.

## Evidence handling

Retain the relevant PIM audit screenshots and password-reset audit
evidence privately. Publish only anonymized copies.

Hide passwords, tenant identifiers, UPN domains, object IDs,
correlation IDs, and other identifying details.

## Review questions

1. Why did Eligible membership not allow Jon to reset Ana's password?
2. What is the difference between eligibility expiry and activation expiry?
3. How would you distinguish sign-in MFA from PIM activation MFA?

## References

- [Configure PIM role settings](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings)
- [Approve PIM activation requests](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-approval-workflow)
- [View PIM audit history](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-use-audit-log)

### L09 — PIM Approval and Temporary Helpdesk Access

- Configured one-hour activation with MFA, justification, and approval.
- Assigned Jon Robot as Eligible for Helpdesk Administrator.
- Approved activation using a separate account.
- Verified denied access before activation and after deactivation.
- Performed a real password reset on Ana Finance and verified the initiator.
- Inspected PIM approval, activation, and deactivation audit events.
- Removed the Eligible assignment and confirmed access was refused.
- Execution status: EXECUTAT.
