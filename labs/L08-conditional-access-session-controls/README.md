# L08 — Conditional Access: Browser Sign-in Frequency

## Objective

Configure and validate a Conditional Access session control for browser access to a lab application. Keep the policy in Report-only mode while testing its scope and evaluation.

## Configuration

| Setting         | Value                                                     |
| --------------- | --------------------------------------------------------- |
| Policy          | `LAB-L08-Browser-SignInFrequency`                         |
| Users           | `LAB-CA-Pilot` group                                      |
| Target resource | `LAB-L06-SAML-CA`                                         |
| Client apps     | Browser                                                   |
| Grant controls  | None                                                      |
| Session control | Sign-in frequency: periodic reauthentication every 1 hour |
| Policy state    | Report-only                                               |

## Validation

1. In **Conditional Access → What If**, tested Ana Finance, `LAB-L06-SAML-CA`, and Browser. The L08 policy appeared once under **Policies that will apply**, with state **Report-only**.
2. Changed the client app to **Mobile apps and desktop clients**. The L08 policy did not apply; the reported reason was **Client app**.
3. Signed in as Ana Finance through a browser and opened `LAB-L06-SAML-CA` from **My Apps**.
4. In **Sign-in logs**, the event showed **Application: LAB-L06-SAML-CA** and **Resource: Windows Azure Active Directory**. The policy details showed **Report-only: Success**, with Ana Finance and Browser matched.
5. Removed an accidental duplicate policy. The repeated **What If** test showed a single L08 policy.

## Result and limitation

The policy configuration and its scope were validated through **What If** and a real sign-in log. Because the policy remains **Report-only**, the one-hour reauthentication behavior has **not** been enforced or measured. No claim of an actual reauthentication prompt is made.

Do not switch the policy to **On** without a separate review of its scope and an explicit decision to test enforcement.
