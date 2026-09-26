# L04 — Authentication Methods and Account Recovery

## Scenario and scope

Northstar Support uses a Microsoft Entra ID Free lab tenant. The cloud-only test user Jon Ceau needs to sign in with MFA when required, change a known password, and recover access through an administrator-assisted reset. Security defaults remained enabled throughout the lab. No Microsoft Entra ID P1/P2 product was shown under Licenses > All products; an Azure free trial is present but was not treated as an Entra premium license.

**Status:** Executed for the three scenarios below. Self-service password reset (SSPR) for a forgotten password was not executed because an eligible license for the beneficiary was not identified.

## Concepts

- Registration of Microsoft Authenticator makes a method available; it does not imply a fresh MFA prompt for every sign-in.
- The authentication requirement and authentication details are properties of a particular sign-in event. A previously satisfied claim can meet a requirement without a new prompt in that event.
- A user changing a known password, an administrator resetting a user's password, and a user resetting a forgotten password through SSPR are distinct operations.
- Successful authentication does not grant administrative authorization. Jon could authenticate to the Entra admin center but received HTTP 403 when attempting to view Sign-in logs.

## Initial state and safeguards

- Security defaults: Enabled; no change made.
- Jon: ordinary cloud-only member account, not an administrator.
- Authentication method: Microsoft Authenticator registered; system-preferred MFA method displayed as PhoneAppNotification.
- Operations were limited to Jon. Administrative recovery accounts were not changed.
- No passwords, temporary passwords, MFA codes, tokens, UPNs, IP addresses, or session IDs belong in repository evidence.

## Tests and observations

| Test | Observed result | Evidence and interpretation |
| --- | --- | --- |
| Jon signs in to My Apps in a private browser window | Success without a new Authenticator prompt | The inspected sign-in had a single-factor requirement and said the first-factor requirement was satisfied by a claim in the token. This event does not demonstrate an MFA challenge. |
| Jon signs in to Microsoft Entra admin center | An MFA prompt was observed and sign-in succeeded | A successful sign-in record for Jon reported `Authentication requirement: Multifactor authentication` and `Authentication policies applied: Security Defaults`. Its authentication details included `MFA requirement satisfied by claim in the token`; that specific row does not independently prove a fresh Authenticator approval. The prompt observed by the operator was not conclusively correlated to that row. |
| Jon opens Sign-in logs in the admin center | Access denied, HTTP 403 | Jon authenticated but lacked privileges to read administrative sign-in logs. |
| Jon changes a known password in My Account | Change succeeded; subsequent sign-in to My Apps with the new password succeeded | Executed as the user, without using SSPR for a forgotten password. |
| Administrator resets Jon's password | Temporary password issued; Jon was required to change it and then reached My Apps | Audit logs displayed `Reset password (by admin...)` with `Success` and `Successfully completed reset`; a related `Reset user password` Core Directory event also displayed `Success`. In the inspected detail view the actor display name was empty, and the target was not independently confirmed from that view. The operator's actions and Jon's subsequent sign-in identify the test flow, but the missing metadata should not be invented. |

An unrelated failed sign-in for Jon showed error `50126` after incorrect credentials were entered. It was not an MFA failure and was not used as evidence for the successful sign-in.

## License boundary

Microsoft's SSPR licensing table includes a known-password change for a cloud-only user in Entra ID Free, but does not include a forgotten-password self-service reset in the Free column. The observed empty product list did not establish a beneficiary license for Jon. The forgotten-password SSPR scenario remains **BLOCKED BY LICENSE / NOT EXECUTED**. No premium trial was activated.

## Rollback and closure

The administrative reset produced a temporary password that was replaced on Jon's next sign-in. The temporary password should be deleted from local notes. Jon retains a working password and his registered Microsoft Authenticator method. Security defaults remained enabled. No policy rollback is needed.

The Free-tier scope of L04 is complete after the successful sign-ins and audit result above. The original curriculum's SSPR-forgotten-password objective remains unverified and must be run separately only if an eligible license is assigned to the test user.

## Evidence to retain privately

- Security defaults Enabled and the absence of eligible products in All products.
- Jon's method type and system-preferred method, with device detail redacted.
- Successful Jon sign-in showing the MFA requirement and Security Defaults; capture the authentication details separately and preserve their limits.
- Redacted `Reset password (by admin...)` audit row with Success and status reason.
- A short written record that Jon completed both new-password sign-ins.

## Sources

- [Microsoft Entra SSPR licensing](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-licensing)
- [Security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults)
