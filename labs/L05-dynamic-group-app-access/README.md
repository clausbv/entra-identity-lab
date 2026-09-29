# L05 — Dynamic Group Membership and Application Access

## Objective

This lab demonstrates how Microsoft Entra ID can automatically manage group membership and application access based on user attributes.

The lab validates the following:

- Dynamic user membership based on the `department` attribute
- Automatic addition and removal of users from a security group
- Group-based assignment to an Enterprise Application
- Automatic granting and removal of application access
- Verification through My Apps and Microsoft Entra audit logs

## Licensing and Tenant

This lab was completed in the `KaizenStarSrl.onmicrosoft.com` tenant using Microsoft Entra ID P2 trial licenses.

Dynamic group membership requires Microsoft Entra ID P1 or P2 licensing and was therefore not implemented in the original Microsoft Entra ID Free tenant.

## Lab Objects

| Object                 | Type                   | Purpose                                                  |
| ---------------------- | ---------------------- | -------------------------------------------------------- |
| `LAB-Dynamic-Support`  | Dynamic security group | Automatically includes users whose department is Support |
| `LAB-L05-Group-Access` | Enterprise Application | Application protected by group-based assignment          |
| `Jon Robot`            | Member user            | Used to test automatic access granting and removal       |
| `Ana Finance`          | Member user            | Used to test automatic access granting and removal       |

## Dynamic Membership Rule

The following rule was configured for `LAB-Dynamic-Support`:

```text
(user.department -eq "Support")
```

A user is automatically included in the group when the user's `department` attribute is set to `Support`.

If the attribute is changed to another value, Microsoft Entra ID automatically removes the user from the group.

## Initial Membership Validation

The rule validation tool confirmed the expected results:

- Jon Robot with `department = Support` was evaluated as **In group**.
- Ana Finance with `department = Finance` was evaluated as **Not in group**.

The actual group membership was also verified from the group's **Members** page.

## Enterprise Application Configuration

A non-gallery Enterprise Application named `LAB-L05-Group-Access` was created.

The following configuration was applied:

- `Assignment required?` was set to `Yes`.
- The dynamic group `LAB-Dynamic-Support` was assigned to the application.
- Users were not assigned individually.

This ensures that application access is controlled through group membership.

## Application Access Test

The initial access test produced the following results:

| User        | Department | Dynamic group membership | Application visible in My Apps |
| ----------- | ---------- | ------------------------ | ------------------------------ |
| Ana Finance | Support    | Yes                      | Yes                            |
| Jon Robot   | Finance    | No                       | No                             |

The department values were then reversed:

- Ana Finance: `Support` to `Finance`
- Jon Robot: `Finance` to `Support`

Microsoft Entra ID recalculated the dynamic group membership automatically.

The second access test produced the following results:

| User        | Department | Dynamic group membership | Application visible in My Apps |
| ----------- | ---------- | ------------------------ | ------------------------------ |
| Ana Finance | Finance    | No                       | No                             |
| Jon Robot   | Support    | Yes                      | Yes                            |

No manual changes were made to the group membership or application assignment.

## Propagation Behavior

Dynamic membership changes and Enterprise Application access were not reflected instantly in My Apps.

A short propagation delay was observed between:

1. Updating the user attribute
2. Recalculating dynamic group membership
3. Processing the group-based application assignment
4. Updating the My Apps portal

After propagation completed, the expected access state was confirmed.

## Audit Log Verification

Microsoft Entra audit logs were used to verify:

- `Update user` events for the department changes
- The affected users under **Target resources**
- The modified `department` property
- The `Add app role assignment to group` event
- The Enterprise Application and security group as target resources
- Successful completion of the operations

Object IDs uniquely identified the Service Principal, group, and users. The Correlation ID identified the specific operation for troubleshooting purposes.

## Key Concepts

### Dynamic group

A group whose membership is calculated automatically from rules based on user or device attributes.

### Enterprise Application

The Service Principal representation of an application inside a Microsoft Entra tenant.

### Group-based application assignment

An access-management method in which an application is assigned to a group rather than to individual users.

### Assignment required

A setting that restricts application access to users and groups explicitly assigned to the Enterprise Application.

### Object ID

A unique identifier for a specific object in a Microsoft Entra tenant.

### Correlation ID

An identifier used to trace and troubleshoot a specific request or operation across logs.

## Result

The lab successfully demonstrated attribute-driven identity and access management in Microsoft Entra ID.

Changing a user's department automatically changed:

1. Dynamic security group membership
2. Enterprise Application assignment eligibility
3. Application visibility in My Apps

This reduced the need for manual access administration and demonstrated a basic joiner, mover, and leaver access-management pattern.
