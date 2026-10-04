# L11 — Identity Protection and Risk-Based Conditional Access

## Status

EXECUTAT — report inspection, policy configuration and sign-in log analysis.
SIMULAT — risk scenarios evaluated through What If.

## Objective

Understand sign-in risk versus user risk and evaluate a risk-based
Conditional Access policy without enforcing it.

## Initial state

- Risky users: no entries.
- Risky sign-ins: no entries.
- Risk detections: no entries.
- LAB-CA-Pilot contained Ana and Jon.

## Configuration

Policy: LAB-L11-SignInRisk-MFA-ReportOnly

- Included users: LAB-CA-Pilot.
- Excluded users: LAB-Emergency-01 and LAB-Emergency-02.
- Target resource: LAB-L06-SAML-CA.
- Client app: Browser.
- Sign-in risk: Medium and High.
- Grant control: Require multifactor authentication.
- Initial policy state: Report-only.
- User risk condition: not configured.

## What If tests — SIMULAT

| User             | Sign-in risk             | Observed result                          |
| ---------------- | ------------------------ | ---------------------------------------- |
| Jon              | High                     | Policy would apply                       |
| Jon              | Medium, after correction | Policy would apply                       |
| Jon              | Low                      | Policy would not apply: Sign-in risk     |
| LAB-Emergency-01 | High                     | Policy would not apply: Users and groups |

The emergency account was outside the included pilot group and explicitly
excluded. This test alone does not isolate the effect of the exclusion.

## Real sign-in — EXECUTAT

Jon successfully accessed LAB-L06-SAML-CA.

Policy evaluation showed:

- User: Matched.
- Client app: Browser — Matched.
- Sign-in risk: None — Not matched.
- Result: Report-only: Not applied.

The policy evaluation displayed the resource name
Windows Azure Active Directory. The saved target resource was separately
verified as LAB-L06-SAML-CA. The naming difference was not resolved.

## Troubleshooting

The Medium risk simulation initially returned:
Policy would not apply — Sign-in risk.

Inspection showed that only High was selected in the policy.
Medium was added, the policy was saved in Report-only, and the test
was repeated successfully.

## Limitations

- What If did not generate real risk detections or execute MFA.
- No MFA enforcement triggered by real sign-in risk was demonstrated.
- No users were marked compromised and no risk states were modified.

## Cleanup

The policy was changed to Off and its final state was confirmed.
The configuration was retained for documentation.
