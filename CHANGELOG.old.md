## 2.2.1

_Oct 3, 2022_

### @comet/admin-rte

-   Fix a bug where `setEditorState` was incorrectly assumed to be a React state setter function

## 2.2.0

_Jun 30, 2022_

### @comet/admin

-   Display loading and error states of a contained form in `EditDialog` via its `SaveButton`
-   Close `EditDialog` when a contained form is submitted via `Enter` key press
-   Fix `FinalFormSelect` value generic to allow simple select values such as `string`

## 2.1.0

_Jun 20, 2022_

### Highlights

-   Add `FinalFormAutocomplete` component (see [story](https://comet-admin.netlify.app/?path=/story/comet-admin-form--autocomplete-async-select))

### @comet/admin

-   Add `useAsyncOptionsProps` hook to allow async loading of options in `FinalFormAutocomplete` and `FinalFormSelect`
-   Add support to pass options directly via props in `FinalFormSelect (they are rendered automatically)

### @comet/admin-rte

-   Add support for custom inline styles (see [story](https://comet-admin.netlify.app/?path=/story/comet-admin-rte--custom-inline-styles))
-   Show OS-specific shortcut tooltips on MacOS

## 2.0.0

_Nov 3, 2021_

### Highlights

-   Add package @comet/admin-icons
-   Add a standard `Toolbar` that can be used as an application-wide element with consistent styling containing navigation, action buttons, and filters
-   Add the ability to customize components, similar to Material UI components. Customization can be done either globally through theme [overrides](https://v4.mui.com/customization/globals/#css) and [props](https://v4.mui.com/customization/globals/#default-props) or individually with [classes](https://v4.mui.com/customization/components/#overriding-styles-with-class-names)
-   Start docs of components and general information about the development of Comet Admin
-   Implement [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) that catch errors in the component tree without crashing the application

### Migration Guide

1. Install jscodeshift in your project

    ```bash
    npm install --save-dev jscodeshift
    ```

2. Clone this repository into your project repository. If you have a monorepo, clone it into the correct subfolder
3. Run codemods depending on usage

    **Remove `renderButtons` and `components` from `FinalForm`**

    ```bash
    npx jscodeshift --extensions=ts,tsx --parser=tsx -t comet-admin/codemods/2.0.0/final-form-dissolve-final-form-save-cancel-buttons.ts src/
    ```

    **Remove `showBreadcrumbs` from `Stack`**

    ```bash
    npx jscodeshift --extensions=ts,tsx --parser=tsx -t comet-admin/codemods/2.0.0/stack-dissolve-breadcrumbs.ts src/
    ```

    **Remove `showBackButton` from `Stack`**

    ```bash
    npx jscodeshift --extensions=ts,tsx --parser=tsx -t comet-admin/codemods/2.0.0/stack-dissolve-backbutton.ts  src/
    ```

    **Update theme**

    ```bash
    npx jscodeshift --extensions=ts,tsx --parser=tsx -t comet-admin/codemods/2.0.0/update-theme.ts src/
    ```

See an example migration [here](https://github.com/vivid-planet/comet-admin-starter/pull/36).

### @comet/admin

#### Breaking changes

-   Remove `createMuiTheme` in favor of `createTheme` from `@material-ui/core`
-   Remove `VPAdminInputBase` and `getDefaultVPAdminInputStyles`, in favor of [InputBase](https://v4.mui.com/api/input-base/) from Material UI
-   Remove `renderButtons` and `components` props from `FinalForm` (handled by codemods)
-   Remove `FinalFormTextField` in favor of `FinalFormInput`. Material UI's [TextField](https://v4.mui.com/components/text-fields/#textfield) component should not be used in Comet Admin projects as its design is incompatible with the Comet CI
-   Remove `fieldContainer` prop from `Field` in favor of a new `variant` prop
-   Remove `FieldContainerLabelAbove` component in favor of the default `vertical` variant. Restore the previous default layout of `Field` by adding the following to the theme:
    ```js
    {
        props: {
            CometAdminFormFieldContainer: {
                variant: 'horizontal'
            }
        },
        overrides: {
            CometAdminFormFieldContainer: {
                horizontal: {
                    "& $label": {
                        width: `${100 / 3}%`
                    },
                    "& $inputContainer": {
                        width: `${200 / 3}%`
                    }
                }
            }
        }
    }
    ```
-   Remove default styling from `Menu` component in favor of styling the component via the theme
-   Remove `permanentMenuMinWidth` prop from `Menu` in favor of a new `variant` prop, which allows for more control. For instance, variant `temporary` can be used to give some pages more space
-   Remove `components.breadcrumbsContainer` prop form `Stack` in favor of a div that can be customized via the theme
-   Remove `FixedLeftRightLayout` component
-   Remove `FormPaper` component in favor of Material UI's [Card](https://v4.mui.com/components/cards/#card) component
-   Change default content spacing and header height of `MasterLayout`
-   Custom `headerComponent` of `MasterLayout` expects a component built using the `AppHeader` system (see [docs](https://comet-admin.netlify.app/?path=/story/docs-components-appheader--page))
-   Remove `hideToolbarMenuIcon` prop from `MasterLayout` as it is no longer necessary when building a custom header using the `AppHeader` system
-   Remove `<main>` HTML tag from `MasterLayout` in favor of new `MainContent` component
    ```js
    <MasterLayout headerComponent={AppHeader} menuComponent={AppMenu}>
        <Toolbar />
        <MainContent>/* Main content goes here */</MainContent>
    </MasterLayout>
    ```
-   Remove `AppBar` inside `Tabs`. Restore the previous appearance by overriding the `CometAdminTabs-root` class
-   Remove `tabLabel` prop from `Tabs`. Use `label` instead
-   `RouterTabs` do not inherit Material UI's [Tabs props](https://v4.mui.com/api/tabs/#props) anymore. Use `tabsProps` prop to set `Tabs` props
-   Remove `showBreadcrumbs` prop from `Stack`. `StackBreadcrumbs` has been added for compatibility. However, it is recommended to use the new `Toolbar` system (handled by codemods)

    ```js
    <Stack topLevelTitle="Stack Nested">
        <StackBreadcrumbs />
        <StackSwitch>
            <StackPage name="page1">
                <Page1 />
            </StackPage>
            <StackPage name="page2">page2-2</StackPage>
        </StackSwitch>
    </Stack>
    ```

-   Remove `showBackButton` prop from `Stack` (handled by codemods)
-   Remove alternating background color from body rows in `Table`. Restore the previous appearance by adding the following styles to `CometAdminTableBodyRow`:

    ```js
    odd: {
        backgroundColor: neutrals[50],
    }
    ```

-   Remove background color from table head in `Table`. Restore the previous appearance by adding the following styles to `MuiTableHead`:

    ```js
    root: {
        backgroundColor: neutrals[100],
    }
    ```

-   `TableDndOrder` requires new peer dependencies and a `DndProvider` setup in the application

    Install peer dependencies in your application

    ```bash
    npm install react-dnd@"~14" react-dnd-html5-backend@"~14"
    ```

    Wrap your application in a `DnDProvider`

    ```js
    import { DndProvider } from "react-dnd";
    import { HTML5Backend } from "react-dnd-html5-backend";

    export function App() {
        return <DndProvider backend={HTML5Backend}>...</DndProvider>;
    }
    ```

#### Changes

-   Add `ClearInputButton` component, which can be used as an `endAdornment` to clear inputs
-   Add `variant` prop to `Field` to control the positioning of label and input
-   Add `headerHeight` prop to `MasterLayout` which child components can use to position themselves
-   Add `onAfterSubmit` callback to `FinalForm`
-   Add `useStoredState` hook to store state in local storage or session storage
-   Add `FinalFormRangeInput` component
-   Add `SplitButton` component to combine buttons in a button group
-   Add `SaveButton` component, which handles and displays save state (idle, saving, success and error)
-   Add `SnackbarProvider`, `useSnackbarApi` hook and `UndoSnackbar`
-   Add `FinalFormSaveCancelButtonsLegacy` as drop-in replacement for removed cancel and save buttons in `FinalForm`
-   Add `PrettyBytes`  component for formatting byte values, for instance, file sizes
-   Add `validateWarning` validator to `Field` and `FinalForm`
-   Add `open` and `onOpenChange` props to `AppHeaderDropdown` to control the open state
-   Add `getTargetUrl()` to `StackSwitchApi`
-   Add `StackLink` component for navigating within a `Stack` via hyperlinks
-   Allow `boolean | undefined | null` as children of `RouterTabs`
-   Expose `selectionApi` through `useEditDialog`

### @comet/admin-color-picker

#### Breaking changes

-   Rename `VPAdminColorPicker` to `CometAdminColorPicker`
-   Remove `clearButton` and `clearIcon` theme classes from the color picker in favor of a new `ClearInputButton` component
-   The clear button is hidden by default

#### Changes

-   Allow custom icons/adornments for color input
-   The clear button is now optional (using the `showClearButton` prop)

### @comet/admin-react-select

#### Breaking changes

-   Rename theme key from `VPAdminSelect` to `CometAdminSelect`

### @comet/admin-rte

#### Breaking changes

-   Removed `rte` key from theme. RTE colors should be defined using by overriding `CometAdminRte` instead
    ```js
    {
        props: {
            CometAdminRte: {
                colors: {
                    // Colors go here
                }
            }
        }
    }
    ```

**Note: prior to 2.x, packages have been released independently, therefore having separate version numbers and changelogs**

## @comet/admin

### 1.3.0

_Mar 4, 2021_

This is a bugfix/maintenance release.

#### Bugfixes

-   Handle submit error in EditDialog (#209)
-   Pass `innerRef` from `TableBodyRow` to `sc.TableBodyRow`

#### Changes

-   The `styled-components` peer dependency has been changed to `^4.0.0 || ^5.0.0` to include v5.
-   The `graphql` peer dependency has been changed to `^14.0.0 || ^15.0.0` to include v14.

### 1.2.0

_Feb 23, 2021_

#### Highlights

-   RouterPrompt: comet-admin's [react-router Prompt Component](https://reactrouter.com/core/api/Prompt) Wrapper (that adds support for multiple Prompt instances) adds missing message callback parameters for full react-router compatibility

#### Changes

-   TotalCount of the tables Pagination is now formatted with FormattedNumber from react-intl.
-   Switch from Yarn to NPM v7 (updated all dependencies)

### 1.1.0 (re-release under new name)

_Jan 12, 2021_

This package has been renamed to @comet/admin

### 1.1.0

_Jan 11, 2021_

This is a bugfix/maintenance release.

#### Highlights

-   Added migration guide for 1.0 update https://github.com/vivid-planet/comet-admin/blob/master/CHANGELOG.md#migration-guide

#### Bugfixes

-   Render MenuItem in children of Route (#277)
-   Fix ability to open temporary menu (#279)
-   dependency-cleanup (#278)

### 1.0.0

_Dec 18, 2020_

This version is the first stable version.

#### Highlights

-   Renamed from react-admin to comet-admin (!!!)
-   Made comet-admin translatable with react-intl
-   Updated apollo

#### Incompatible Changes

-   Restructured packages:
    -   Consolidated react-admin-core, fetch-provider, file-icons, react-admin-final-form-material-ui, react-admin-form, react-admin-layout and react-admin-mui into comet-admin
    -   Moved react-select to own package comet-admin-react-select
-   Removed date-fns for date formatting in favor of react-intl
-   Removed exports for styled and css, use styled-components directly
-   FinalForm wrappers (e.g. Checkbox, Input, ...) are now prefixed with FinalForm

#### Changes

-   Switched form TSLint to ESLint

#### Migration Guide

Clone this repository into your project repository. If you have a monorepo, you have to clone it into the right subfolder.

An example can be found [here](https://github.com/vivid-planet/comet-admin-starter/pull/36).

**Package Renaming**

Automatic migrations using codeshift are available (use -d for dry-run):

```
npx jscodeshift --extensions=ts --parser=ts -t comet-admin/codemods/1.0.0/package-renames.ts src/
npx jscodeshift --extensions=tsx --parser=tsx -t comet-admin/codemods/1.0.0/package-renames.ts src/
```

**Styled Components**

Automatic migrations using codeshift are available (use -d for dry-run):

```
npx jscodeshift --extensions=ts --parser=ts -t comet-admin/codemods/1.0.0/styled-components.ts src/
npx jscodeshift --extensions=tsx --parser=tsx -t comet-admin/codemods/1.0.0/styled-components.ts src/
```

**Apollo-Client**

Detailed instructions can be found [here](https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration). Automatic migrations using codeshift are available (use -d for dry-run):

```
git clone https://github.com/apollographql/apollo-client.git
npx jscodeshift -t apollo-client/scripts/codemods/ac2-to-ac3/imports.js --extensions ts --parser ts src/
npx jscodeshift -t apollo-client/scripts/codemods/ac2-to-ac3/imports.js --extensions tsx --parser tsx src/
```

**Component-Renames**

FinalForm fields are now prefixed with FinalForm. Automatic migrations using codeshift are available (use -d for dry-run):

```
npx jscodeshift --extensions=ts --parser=ts -t comet-admin/codemods/1.0.0/component-renames.ts src/
npx jscodeshift --extensions=tsx --parser=tsx -t comet-admin/codemods/1.0.0/component-renames.ts src/
```

**FormatLocalized**

`FormatLocalized` has been removed in favor of `FormattedDate` and `FormattedTime` of react-intl. An example migration can look like this:

Before:

```
<FormatLocalized date={parseISO(publishDate)} format="dd.MM.yyyy - HH:mm" />
```

After:

```
<FormattedDate value={date} day="2-digit" month="2-digit" year="numeric" />
{" - "}
<FormattedTime value={date} />
```

As an alternative, FormatLocalized can be created inside the project by using:

```
import { format } from "date-fns";
import * as React from "react";
import { useIntl } from "react-intl";

interface IProps {
    format: string;
    date: Date | number;
}
export const FormatLocalized: React.FunctionComponent<IProps> = ({ date, format: formatString }) => {
    const intl = useIntl();
    const locale = intl.locale;
    return <>{format(date, formatString, { locale })}</>;
};
```

However, imports need to be adjusted manually.

**Internationalization**

Strings are now prepared for internationalization. The default language is switched from German to English. A sample setup can be found [here](https://github.com/vivid-planet/comet-admin-starter/pull/36).

**Fix Eslint Errors**

```
npx eslint --ext .ts,.tsx,.js,.jsx,.json,.md --fix src/
```

## @comet/admin-color-picker

### 1.0.2

_Feb 23, 2021_

use fixed version of react-color
Switch from Yarn to NPM v7 (updated all dependencies)

### 1.0.1 (re-release under new name)

_Jan 12, 2021_

This package has been renamed to @comet/admin-color-picker

### 1.0.1

_Jan 11, 2021_

This is a bugfix/maintenance release

### 1.0.0

_Dec 18, 2020_

This version is the first stable version.

## @comet/admin-date-picker

### 1.0.2

_Feb 23, 2021_

Switch from Yarn to NPM v7 (updated all dependencies)

### 1.0.1 (re-release under new name)

_Jan 12, 2021_

This package has been renamed to @comet/admin-date-picker

### 1.0.1

_Jan 11, 2021_

This is a bugfix/maintenance release

### 1.0.0

_Dec 18, 2020_

This version is the first stable version.

## @comet/admin-react-select

### 1.0.2

_Feb 23, 2021_

Switch from Yarn to NPM v7 (updated all dependencies)

### 1.0.1 (re-release under new name)

_Jan 12, 2021_

This package has been renamed to @comet/admin-react-select

### 1.0.1

_Jan 11, 2021_

This is a bugfix/maintenance release

### 1.0.0

_Dec 18, 2020_

This version is the first stable version.

## @comet/admin-rte

### 1.2.1

_Feb 23, 2021_

#### Bugfixes

-   Make controls for RTE sticky
-   Use mui-grey-palette for default colors
-   Remove min-width of link buttons (MuiButtonGroup)

#### Changes

-   Switch from Yarn to NPM v7 (updated all dependencies)

### 1.2.0

_Jan 22, 2021_

#### Highlights

-   Add default styles (MUI) to built-in blocktypes
-   Make built-in blocktypes styleable
-   Supports disabled-attribute

#### Changes

-   Rename prop-name "customBlockMap" to "blocktypeMap", deprecate prop-name "customBlockMap"
-   Rename prop-name "Icon" to "icon", deprecate prop-name "Icon"

### 1.1.1 (re-release under new name)

_Jan 12, 2021_

This package has been renamed to @comet/admin-rte

### 1.1.1

_Jan 11, 2021_

This is a bugfix/maintenance release

### 1.1.0

_Dec 22, 2020_

#### Changes

-   Add `blockquote` support

### 1.0.0

_Dec 18, 2020_

This version is the first stable version.
