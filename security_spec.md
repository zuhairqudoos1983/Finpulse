# Security Specification for FinPulse

## Data Invariants
1. A transaction must belong to the authenticated user (`userId == request.auth.uid`).
2. A budget must belong to the authenticated user.
3. A goal must belong to the authenticated user.
4. An investment must belong to the authenticated user.
5. A bill reminder must belong to the authenticated user.
6. Users can only read and write their own data.
7. Document IDs must be valid strings.
8. Amounts must be numbers and within reasonable bounds.

## The Dirty Dozen Payloads

1. **Identity Spoofing (Transaction)**: Attempt to create a transaction for another user.
   ```json
   { "userId": "attacker_id", "amount": 100, "type": "expense", "category": "Food", "date": "2024-01-01T00:00:00Z", "currency": "USD" }
   ```
2. **Privilege Escalation (Update)**: Attempt to change the `userId` of an existing transaction.
   ```json
   { "userId": "new_owner_id" }
   ```
3. **Resource Poisoning (Long ID)**: Attempt to use a document ID that is too long (e.g., 2KB).
4. **Invalid Type (Amount)**: Attempt to set `amount` as a string.
   ```json
   { "amount": "one million" }
   ```
5. **State Shortcut (Budget)**: Attempt to set `spent` to a negative value.
   ```json
   { "spent": -1000 }
   ```
6. **Shadow Field Injection**: Attempt to add a field not defined in the schema (e.g., `isAdmin: true`).
   ```json
   { "userId": "my_id", "amount": 100, "type": "expense", "isAdmin": true, ... }
   ```
7. **Cross-User Read**: Attempt to list transactions without a `userId` filter matching the auth uid.
8. **Orphaned Write**: Attempt to create a transaction without a required field.
9. **Timestamp Spoofing**: Attempt to set a `date` far in the future or past on create.
10. **Admin Bypass**: Attempt to access a collection that doesn't exist or is for admins only.
11. **PII Leak**: Attempt to read user profile data of another user.
12. **Malicious Update**: Attempt to update a field that should be immutable (e.g., `createdAt`).

## Test Results
*Identity Spoofing* -> PERMISSION_DENIED
*Privilege Escalation* -> PERMISSION_DENIED
*Resource Poisoning* -> PERMISSION_DENIED
*Invalid Type* -> PERMISSION_DENIED
*State Shortcut* -> PERMISSION_DENIED
*Shadow Field Injection* -> PERMISSION_DENIED
*Cross-User Read* -> PERMISSION_DENIED
*Orphaned Write* -> PERMISSION_DENIED
*Timestamp Spoofing* -> PERMISSION_DENIED
*Admin Bypass* -> PERMISSION_DENIED
*PII Leak* -> PERMISSION_DENIED
*Malicious Update* -> PERMISSION_DENIED
