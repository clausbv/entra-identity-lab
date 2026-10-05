# L12 — Access Reviews

## Status

EXECUTAT — group membership review completed, results manually applied,
membership verified, and cleanup completed.

## Objective

Perform a one-time Access Review for a dedicated Security group:
retain Jon Robot, remove Ana Finance, and verify the actual membership
change and audit evidence.

## Environment

- Controlled Microsoft Entra laboratory tenant.
- Active Microsoft Entra ID P2 trial.
- Administrator and reviewer: Claudiu.
- Test users: Jon Robot and Ana Finance.
- Portal-only execution; no Graph API or PowerShell operations.

## Initial state

Created a dedicated cloud-only group:

- Name: LAB-L12-Review-Members
- Group type: Security
- Membership type: Assigned
- Microsoft Entra role assignment: disabled
- Direct members: Jon Robot and Ana Finance

The group was used exclusively for this laboratory.

## Review configuration

- Review name: LAB-L12-Access-Review
- Resource: LAB-L12-Review-Members
- Scope: Everyone within the selected group
- Reviewer: Claudiu, explicitly selected
- Review stages: single stage
- Recurrence: One time
- Scheduled period: 2026-10-05 to 2026-10-06
- Duration: 1 day
- Auto apply results to resource: disabled
- If reviewers don't respond: No change
- Justification required: enabled
- Decision helpers: disabled
- Email notifications and reminders: disabled

## Execution

1. Created the group and added both test users.
2. Created the Access Review.
3. Observed the status change from Not started to Active.
4. Opened the review in My Access using the reviewer account.
5. Approved Jon Robot and denied Ana Finance.
6. Verified that both users were still group members before applying results.
7. Stopped the review manually and observed the Complete status.
8. Selected Apply and confirmed removal for the denied decision.
9. Observed Applying, followed by Results applied.
10. Refreshed the group's Members page and verified that only Jon remained.

## Validation

| Check | Observed result | Status |
| --- | --- | --- |
| Initial membership | Jon and Ana were direct members | EXECUTAT |
| Review decisions | 1 Approved, 1 Denied, 0 Not reviewed | EXECUTAT |
| Before Apply | Both users remained members | EXECUTAT |
| Positive test | Approved Jon remained after Apply | EXECUTAT |
| Negative test | Denied Ana was removed after Apply | EXECUTAT |
| Final review status | Results applied | EXECUTAT |

## Audit evidence

Observed the following successful activities in the group's audit logs:

- Add group
- Add member to group — two events
- Create access review
- Remove member from group

The removal event showed:

- Date: 2026-10-05
- Displayed time: approximately 16:09
- Category: GroupManagement
- Activity: Remove member from group
- Status: success
- Actor type: Application
- Actor display name: Request Approvals Read Platform
- User target: Ana's test account
- Group target: ID matched LAB-L12-Review-Members

Tenant-specific identifiers and full user principal names are omitted.

## Processing observations

The review initially displayed Not started before becoming Active.
Applying results also required several minutes.

Processing completed successfully. No configuration fix was required.

## Key concepts

- Access Reviews evaluate whether existing access is still needed.
- The reviewer records decisions; applying results changes membership.
- Deny alone did not remove Ana because automatic application was disabled.
- Assigned membership supports explicit membership changes.
- Dynamic membership is determined by rules and is not changed by review decisions.
- No change preserves access for users without a reviewer response.

## Scope and limitations

- Verified group membership only.
- Application access loss and session revocation were not tested.
- Recurring reviews, self-reviews, and advanced Governance features were not tested.
- No controlled error was introduced.
- No Conditional Access policies or other groups were modified.

## Rollback

Before cleanup, restoring the initial membership would have required
explicitly adding Ana back to the group.

This rollback was not executed.
Deleting the review does not restore removed membership.

## Cleanup

- Deleted LAB-L12-Access-Review and verified it no longer appeared.
- Deleted LAB-L12-Review-Members and verified it no longer appeared.
- No test user deletion was performed.

Cleanup status: EXECUTAT.

## References

- https://learn.microsoft.com/en-us/entra/id-governance/licensing-fundamentals
- https://learn.microsoft.com/en-us/entra/id-governance/create-access-review
- https://learn.microsoft.com/en-us/entra/id-governance/perform-access-review
- https://learn.microsoft.com/en-us/entra/id-governance/complete-access-review