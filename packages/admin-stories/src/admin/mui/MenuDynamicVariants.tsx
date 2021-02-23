import { MasterLayout, Menu, MenuCollapsibleItem, MenuContext, MenuItemAnchorLink, MenuItemRouterLink, useWindowSize } from "@comet/admin";
import { Divider, Typography } from "@material-ui/core";
import { Dashboard, GitHub, Launch, List, Settings } from "@material-ui/icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { matchPath, Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import StoryRouter from "storybook-react-router";

const permanentMenuMinWidth = 1024;
const pathsToAlwaysUseTemporaryMenu = ["/foo3", "/foo4"];

const AppMenu: React.FC = () => {
    const { open, toggleOpen } = React.useContext(MenuContext);
    const windowSize = useWindowSize();
    const location = useLocation();

    let useTemporaryMenu: boolean = windowSize.width < permanentMenuMinWidth;

    if (matchPath(location.pathname, { path: pathsToAlwaysUseTemporaryMenu, strict: true })) {
        useTemporaryMenu = true;
    }

    // Open menu when changing to permanent variant and close when changing to temporary variant.
    React.useEffect(() => {
        if ((useTemporaryMenu && open) || (!useTemporaryMenu && !open)) {
            toggleOpen();
        }
        // useEffect dependencies must only include `location`, because the function should only be called once after changing the location.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <Menu variant={useTemporaryMenu ? "temporary" : "permanent"}>
            <MenuItemRouterLink primary="Dashboard" icon={<Dashboard />} to="/dashboard" />
            <MenuItemRouterLink primary="Settings" icon={<Settings />} to="/settings" />
            <MenuCollapsibleItem primary="More Items" icon={<List />}>
                <MenuItemRouterLink primary="Foo1" to="/foo1" />
                <MenuItemRouterLink primary="Foo2" to="/foo2" />
            </MenuCollapsibleItem>
            <MenuCollapsibleItem primary="Even More Items" secondary="Forcing temporary menu" icon={<List />}>
                <MenuItemRouterLink primary="Foo3" to="/foo3" />
                <MenuItemRouterLink primary="Foo4" to="/foo4" />
            </MenuCollapsibleItem>
            <MenuItemAnchorLink
                primary="Comet Admin"
                secondary="View on GitHub"
                target="_blank"
                href="https://github.com/vivid-planet/comet-admin"
                icon={<GitHub />}
                secondaryAction={<Launch />}
            />
        </Menu>
    );
};

const AppHeader: React.FC = () => (
    <Typography variant="h5" color="primary">
        Example
    </Typography>
);

const Content = ({ children }: { children: string }) => (
    <>
        <Typography variant={"h4"}>{children}</Typography>
        <br />
        <Typography>
            The menu is permanent by default and is temporary below {permanentMenuMinWidth}px and for the routes:{" "}
            {pathsToAlwaysUseTemporaryMenu.join(", ")}.
            <br />
            This is useful, when specific pages need some extra width.
        </Typography>
        <br />
        <Divider />
        <br />
        <Typography variant={"body2"}>Links for testing menu-behaviour when location changes without menu-interaction:</Typography>
        <ul>
            <li>
                <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
                <Link to={"/settings"}>Settings</Link>
            </li>
            <li>
                <Link to={"/foo1"}>Foo1</Link>
            </li>
            <li>
                <Link to={"/foo2"}>Foo2</Link>
            </li>
            <li>
                <Link to={"/foo3"}>Foo3</Link>
            </li>
            <li>
                <Link to={"/foo4"}>Foo4</Link>
            </li>
        </ul>
    </>
);

const Story: React.FC = () => (
    <MasterLayout headerComponent={AppHeader} menuComponent={AppMenu}>
        <Switch>
            <Route path="/" exact render={() => <Content>Root</Content>} />
            <Route path="/dashboard" render={() => <Content>Dashboard</Content>} />
            <Route path="/settings" render={() => <Content>Settings</Content>} />
            <Route path="/foo1" render={() => <Content>Foo 1</Content>} />
            <Route path="/foo2" render={() => <Content>Foo 2</Content>} />
            <Route path="/foo3" render={() => <Content>Foo 3</Content>} />
            <Route path="/foo4" render={() => <Content>Foo 4</Content>} />
        </Switch>
    </MasterLayout>
);

storiesOf("@comet/admin/mui", module)
    .addDecorator(StoryRouter())
    .add("Menu (dynamic variants)", () => <Story />);
