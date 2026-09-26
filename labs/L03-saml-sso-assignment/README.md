# L03 — SAML Single Sign-On and Application Assignment

## Objective

Configure Microsoft Entra ID as the SAML identity provider for a gallery enterprise application, verify a successful sign-in, and test how required application assignment blocks an unassigned user.

## Environment

- Microsoft Entra ID Free tenant
- Enterprise application: `LAB-Northstar-SAML`
- Gallery application: Microsoft Entra SAML Toolkit
- Assigned test user: Jon Ceau
- Unassigned, non-administrator test user: Ana

## Configuration

1. Added Microsoft Entra SAML Toolkit from the enterprise application gallery and named the application `LAB-Northstar-SAML`.
2. Selected **SAML** as the single sign-on method.
3. Configured the service provider with the Microsoft Entra Login URL, Microsoft Entra Identifier, Logout URL, and SAML signing certificate.
4. Set the application's Basic SAML Configuration in Microsoft Entra ID:

   | Setting                                    | Value                                                      |
   | ------------------------------------------ | ---------------------------------------------------------- |
   | Identifier (Entity ID)                     | `https://samltoolkit.azurewebsites.net`                    |
   | Reply URL (Assertion Consumer Service URL) | `https://samltoolkit.azurewebsites.net/SAML/Consume/22528` |
   | Sign on URL                                | `https://samltoolkit.azurewebsites.net/SAML/Login/22528`   |

5. Confirmed that the Name ID uses `user.userprincipalname` with the **Email address** format.
6. Assigned Jon directly to the enterprise application.
7. Confirmed **Assignment required? = Yes** in the enterprise application's properties.

## Verification

### Assigned user: successful sign-in

Jon started the sign-in from the service provider in a private browser window. Microsoft Entra ID authenticated him, and the service provider displayed a page welcoming his account. The enterprise application's sign-in logs recorded **Success** for Jon and `LAB-Northstar-SAML`.

### Unassigned user: access denied

Ana, a non-administrator without an assignment to the application, attempted the same sign-in. Microsoft Entra ID displayed **AADSTS50105**, stating that access was blocked because she was not assigned to the application. The sign-in log recorded **Failure**, error code **50105**, with the same assignment-related reason.

## What this demonstrates

Microsoft Entra ID acted as the SAML identity provider. The enterprise application stored the SAML configuration and controlled user access through application assignment. With assignment required, the assigned user could complete sign-in, while the unassigned user was blocked by Microsoft Entra ID.

## Scope and limitations

- Assignment was tested with individual users. Group-based application assignment was not tested.
- The SAML Toolkit was used as a test service provider; this lab did not test a production application.
- A separate attempt using **Test sign in** in the Microsoft Entra admin center displayed an error at the service provider. Its cause was not established, so the verified successful result is the service-provider-initiated sign-in by Jon.
