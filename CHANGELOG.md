# V -> 1.0.0

## Added

- (Modules) :: Added module of login
- (Modules) :: Added module of home

## Changed

- (Modules/Home) :: Refactored Tailwind CSS class usage. Extracted all main element class names to a `className` constant, improving maintainability and clarity. All style class references in the Home module now use this centralized constant as reference.
- (Modules/Login) :: Applied the same pattern as Home module: migrated all main style classes to a `className` constant (now in `constants.ts`). Updated the component to use these references instead of in-place Tailwind classes.

## Improvements

- Adopted a consistent structure for style management across modules, with constants for class management in each module.
- Enhanced the scalability of the codebase by facilitating easier updates to UI styles and enforcing uniformity.