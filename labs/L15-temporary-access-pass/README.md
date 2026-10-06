# L15 — Temporary Access Pass (TAP)

## Objective

Test Temporary Access Pass authentication for Jon Robot, access Security info,
register a compatible authentication method, and verify the available evidence
without removing existing authentication methods.

## Environment

- Test user: Jon Robot.
- Administrator: Claudiu.
- Device used for method registration: iPhone 14 Pro.
- Microsoft Entra ID P2 trial was active.
- Lab date: October 6, 2026.

## Existing TAP Policy

The policy was inspected before issuing a TAP.

| Setting              | Existing value |
| -------------------- | -------------- |
| Enable               | On             |
| Include              | All users      |
| Minimum lifetime     | 1 hour         |
| Maximum lifetime     | 8 hours        |
| Default lifetime     | 1 hour         |
| Require one-time use | No             |
| Pass length          | 8 characters   |

The existing policy was left unchanged.

A Security group with Assigned membership, `LAB-L15-TAP-Users`, was created
with Jon as its only member.

Because TAP was already enabled for All users, this group did not restrict
TAP availability. Group-based TAP policy targeting was not implemented.

## Execution

### TAP issuance and authentication

- Claudiu issued a TAP for Jon with immediate availability, a 60-minute
  lifetime, and one-time use.
- The first TAP was consumed and later deleted before a replacement
  was created.
- The replacement TAP also used immediate availability, a 60-minute
  lifetime, and one-time use.
- Jon entered the replacement TAP in a fresh private browser session
  and accessed Security info.

### Authentication method registration

Jon registered a device-bound passkey in Microsoft Authenticator on iOS.

The new method appeared in Security info as a device-bound passkey
associated with Microsoft Authenticator.

Jon's existing password, Microsoft Authenticator MFA registration, and
alternative email were retained.

Passkey registration and replacement TAP authentication were verified
separately. The replacement TAP was issued after the passkey registration;
it was not used to register that passkey.

## Verification

Times below are recorded as displayed in the portal.

| Evidence                                                   | Observed result                                                       |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| Audit: Add Passkey (device-bound), approximately 14:18     | success                                                               |
| Audit: Admin deleted security info, approximately 14:35    | success; reason identified deletion of a TAP                          |
| Audit: Admin registered security info, approximately 14:35 | success; reason identified registration of a TAP                      |
| Sign-in Authentication Details, 14:36:38                   | Temporary Access Pass; Succeeded: true; User approved                 |
| Jon's Authentication methods                               | TAP listed under Non-usable authentication methods with One time used |

A `User registered security info` event also appeared at 14:18:29.
Its detailed status was not separately inspected.

Sign-in logs were not immediately visible. Earlier events showing
Password or Previously satisfied were not treated as evidence of TAP
authentication.

### Reuse check

In a new private browser session, the consumed TAP was no longer offered
as a sign-in option.

The portal also showed `One time used`.

The code was not submitted a second time, so an explicit rejection error
for code reuse was not observed.

## Final State

Cleanup was intentionally not performed.

- The consumed replacement TAP remained listed as non-usable.
- The new passkey remained registered.
- `LAB-L15-TAP-Users` remained with Jon as its only member.
- The pre-existing TAP policy remained enabled for All users and unchanged.
- Existing authentication methods were retained.
- Conditional Access policies were not changed.
- Ana, Claudiu, and emergency access accounts were not modified.
- L14 SSPR settings and Jon's alternative email were retained.

## Key Learning

- TAP provides temporary authentication; it does not reset the account password.
- SSPR resets the user's password after identity verification.
- TAP can allow one-time or multiple-use authentication, subject to policy.
- A one-time TAP becomes unusable after it is consumed.
- Successful TAP authentication and successful method registration require
  separate evidence.
- TAP expiry or consumption must not be assumed to terminate all existing sessions.

## Reference

- [Microsoft Learn — Configure Temporary Access Pass](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass)
