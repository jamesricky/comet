import { MoreVertical } from "@comet/admin-icons";
import {
    IconButton,
    IconButtonProps,
    ListItemIcon,
    ListItemIconProps,
    ListItemText,
    ListItemTextProps,
    Menu,
    MenuItem,
    MenuItemProps,
    MenuProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";

export interface RowActionsIconItemProps extends Omit<IconButtonProps, "children"> {
    icon: React.ReactNode;
}

export interface RowActionsMenuItemComponentsProps {
    listItemIcon?: Omit<ListItemIconProps, "children">;
    listItemText?: Omit<ListItemTextProps, "primary">;
}

export interface RowActionsMenuItemProps extends Omit<MenuItemProps, "children" | "onClick"> {
    icon?: React.ReactNode;
    text: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>, closeMenu: () => void) => void;
    componentsProps?: RowActionsMenuItemComponentsProps;
}

export interface RowActionsComponentsProps {
    menu?: Omit<MenuProps, "open" | "onClick">;
    menuIconButton?: Omit<IconButtonProps, "ref" | "onClick">;
}

export type RowActionsIconItem = RowActionsIconItemProps | React.ReactChild;
export type RowActionsMenuItem = RowActionsMenuItemProps | React.ReactChild | ((closeMenu: () => void) => RowActionsMenuItemProps | React.ReactChild);

export interface RowActionsProps {
    iconActions?: RowActionsIconItem[];
    menuActions?: RowActionsMenuItem[];
    moreMenuIcon?: React.ReactNode;
    componentsProps?: RowActionsComponentsProps;
}

export const RowActions = ({
    iconActions,
    menuActions,
    moreMenuIcon = <MoreVertical />,
    componentsProps = {},
}: RowActionsProps): React.ReactElement => {
    const { menu: menuProps, menuIconButton: menuIconButtonProps } = componentsProps;
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const menuButtonRef = React.useRef<HTMLButtonElement>(null);

    return (
        <Root>
            {iconActions && (
                <>
                    {iconActions.map((action, index) => {
                        if (React.isValidElement(action) || typeof action === "string" || typeof action === "number") {
                            return action;
                        }

                        const { icon, ...restIconButtonProps } = action;
                        return (
                            <IconButton key={index} {...restIconButtonProps}>
                                {icon}
                            </IconButton>
                        );
                    })}
                </>
            )}
            {menuActions && (
                <>
                    <IconButton {...menuIconButtonProps} ref={menuButtonRef} onClick={() => setShowMenu(true)}>
                        {moreMenuIcon}
                    </IconButton>
                    <Menu anchorEl={menuButtonRef.current} open={showMenu} onClose={() => setShowMenu(false)} {...menuProps}>
                        {menuActions.map((action, index) => {
                            const executedAction = typeof action === "function" ? action(() => setShowMenu(false)) : action;

                            if (React.isValidElement(executedAction) || typeof executedAction === "string" || typeof executedAction === "number") {
                                return executedAction;
                            }

                            const { text, icon, onClick, componentsProps = {}, ...restMenuItemProps } = executedAction;
                            const { listItemIcon: listItemIconProps, listItemText: listItemTextProps } = componentsProps;

                            return (
                                <MenuItem key={index} {...restMenuItemProps} onClick={(e) => onClick?.(e, () => setShowMenu(false))}>
                                    {icon && <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>}
                                    <ListItemText primary={text} {...listItemTextProps} />
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </>
            )}
        </Root>
    );
};

const Root = styled("div")`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
