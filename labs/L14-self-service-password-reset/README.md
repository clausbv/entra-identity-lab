# L14 — Self-Service Password Reset (SSPR)

## Objective

Configure and verify self-service password reset for a cloud-only
Microsoft Entra ID test user.

Unlike the administrator-assisted reset tested in L04, this lab verifies
that Jon Robot can reset his own password using a registered recovery method.

## Environment

- Microsoft Entra tenant with an active Entra ID P2 trial.
- Administrator: Claudiu.
- Test user: Jon Robot, a cloud-only member account.
- Existing pilot group: LAB-CA-Pilot, containing Jon and Ana.
- Execution date: October 6, 2026.

No separate L14 group was created.
The reset workflow was tested with Jon only.

## Licensing

Microsoft documents Microsoft Entra ID P1 or P2 as supporting
cloud-only self-service password reset.

The users benefiting from SSPR require an appropriate license.
The P2 trial does not imply that every Identity Governance feature is included.

## Concepts

SSPR allows an eligible user to reset a forgotten password without
an administrator or help desk performing the reset.

Three conditions are relevant:

1. The user is included in the SSPR scope.
2. An allowed recovery method is registered for that user.
3. The user completes the required identity verification.

The selected group determines who can use SSPR.
The authentication configuration determines which verification methods
are available and how many are required.

Registering a recovery method and enabling SSPR are separate actions.

## Configuration

### SSPR scope

In Microsoft Entra admin center:

Entra ID → Password reset → Properties

Configured and saved:

- Self service password reset enabled: Selected
- Selected group: LAB-CA-Pilot

The SSPR scope before this lab was not confirmed.

### Required verification methods

In Password reset → Authentication methods:

- Number of methods required to reset: 1

The legacy page exposed security questions.
Other methods were managed through the Authentication methods policy.

### Email method policy

The existing Email OTP configuration was inspected:

- Enable: On
- Target: All users
- Registration: Optional
- Allow external users to use email OTP: Default

No change to the Email OTP policy was performed in this lab.

Microsoft distinguishes the controls as follows:

- Enable and Target control email availability for member-user SSPR.
- Allow external users to use email OTP controls B2B email authentication.

The successful reset below verifies that email was available to Jon
for the tested SSPR workflow.

## Recovery Method Registration

Jon opened:

https://mysignins.microsoft.com/security-info

Initially, the listed methods were Password and Microsoft Authenticator.

Jon then:

1. Selected Add sign-in method.
2. Selected Email.
3. Entered an alternate email address under his control.
4. Completed verification using the received code.

The email method appeared in Jon's security information.

The email address and verification code are not included in this documentation.

## SSPR Test

Jon opened a private browser session and navigated to:

https://passwordreset.microsoftonline.com

Executed steps:

1. Entered his account identifier and completed the CAPTCHA.
2. Selected Email my alternate email.
3. Requested and received a verification code.
4. Entered the code and continued.
5. Set and confirmed a new password.
6. Completed the reset.

Jon confirmed that the password reset succeeded.

He also confirmed successful authentication with the new password
in a fresh session.

No administrator reset was used for this test.

## Audit Verification

In Microsoft Entra admin center:

Entra ID → Monitoring & health → Audit logs

The events were inspected under Self-service Password Management.

The inspected target was Jon Robot.

Both events occurred on October 6, 2026, at approximately 10:16 AM,
as displayed in the portal.

| Activity Type                                      | Status  | Status reason                    |
| -------------------------------------------------- | ------- | -------------------------------- |
| Reset password (self-service)                      | success | Successfully completed reset.    |
| Self-service password reset flow activity progress | success | User successfully reset password |

Both events shared the same Correlation ID:

b272cb97-7a05-46f9-a26a-463a0fa24b15

This links the two audit records to the same reset workflow.

## Verified Results

- SSPR was enabled for LAB-CA-Pilot.
- Jon registered an alternate email recovery method.
- Jon completed self-service password reset using an email code.
- Jon successfully authenticated with the new password.
- The inspected audit records reported success.

## Final State

SSPR was intentionally left enabled:

- Scope: Selected
- Group: LAB-CA-Pilot
- Jon's registered email method retained

SSPR was not disabled as part of cleanup.

The original SSPR scope was not confirmed, so this lab does not claim
that the previous configuration was restored.

No group membership changes were performed in L14.
No Conditional Access policy was enabled or modified.
The L13 access package and its expiration test were left untouched.

## Scope and Limitations

This lab tested a cloud-only member user.

The following were not tested:

- SSPR for Ana.
- Administrator self-service recovery.
- On-premises password writeback.
- Account unlock.
- Reset using two verification methods.
- Rejection of the previous password after reset.

Successful password reset does not by itself demonstrate those scenarios.

## Practical Value

SSPR reduces administrator involvement in password recovery.

For troubleshooting, distinguish between:

- User eligibility through the SSPR scope.
- Availability and registration of recovery methods.
- Completion of identity verification.
- The reset result recorded in audit logs.

## References

- [Enable Microsoft Entra self-service password reset](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr)
- [SSPR licensing requirements](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-licensing)
- [Manage authentication methods](https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-authentication-methods-manage)
