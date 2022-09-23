import { RowActions, Table } from "@comet/admin";
import { Archive, Copy, Cut, Delete, Edit, FavoriteAdd, LinkExternal, Master, MasterUnlock, ThreeDotSaving } from "@comet/admin-icons";
import { Box, Divider, Paper, SxProps, Theme, Typography } from "@mui/material";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { storyRouterDecorator } from "../../../story-router.decorator";

storiesOf("stories/components/Row Actions", module)
    .addDecorator(storyRouterDecorator())
    .add("Example in Table", () => {
        const [isDeleting, setIsDeleting] = React.useState(false);

        const data = [
            { id: 1, firstname: "Kady", lastname: "Wood", job: "Project Manager" },
            { id: 2, firstname: "Lewis", lastname: "Chan", job: "UI/UX Designer" },
            { id: 3, firstname: "Tom", lastname: "Weaver", job: "Frontend Developer" },
            { id: 4, firstname: "Mia", lastname: "Carroll", job: "Backend Developer" },
        ];

        return (
            <>
                <Table
                    data={data}
                    totalCount={data.length}
                    columns={[
                        {
                            name: "id",
                            header: "ID",
                        },
                        {
                            name: "name",
                            header: "Name",
                            render: (row) => `${row.firstname} ${row.lastname}`,
                        },
                        {
                            name: "job",
                            header: "Job",
                        },
                        {
                            name: "actions",
                            render: ({ firstname }) => {
                                return (
                                    <RowActions
                                        iconActions={[
                                            { icon: <Edit />, color: "primary", onClick: () => alert(`Editing ${firstname}`) },
                                            { icon: <FavoriteAdd />, onClick: () => alert(`Favourting ${firstname}`) },
                                        ]}
                                        menuActions={[
                                            {
                                                text: "Promote",
                                                icon: <Master />,
                                                onClick: (event, closeMenu) => {
                                                    closeMenu();
                                                    console.log(`Promoteing ${firstname}`);
                                                },
                                            },
                                            {
                                                text: "Demote",
                                                icon: <MasterUnlock />,
                                                onClick: (event, closeMenu) => {
                                                    closeMenu();
                                                    console.log(`Demoteing ${firstname}`);
                                                },
                                            },
                                            () => <Divider />,
                                            {
                                                text: isDeleting ? "Deleting..." : "Delete",
                                                icon: isDeleting ? <ThreeDotSaving /> : <Delete />,
                                                disabled: isDeleting,
                                                onClick: (event, closeMenu) => {
                                                    setIsDeleting(true);

                                                    setTimeout(() => {
                                                        closeMenu();
                                                        setIsDeleting(false);
                                                    }, 2000);
                                                },
                                            },
                                        ]}
                                    />
                                );
                            },
                        },
                    ]}
                />
            </>
        );
    })
    .add("Icons with space & hover styles", () => {
        const iconButtonStyles: SxProps<Theme> = ({ palette }) => ({ ":hover": { color: palette.primary.main } });
        const iconSpacer = <Box sx={{ width: 15 }} />;

        return (
            <Paper variant="outlined" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2 }}>
                <Typography>Icons with space & hover styles</Typography>
                <RowActions
                    iconActions={[
                        { icon: <Copy />, sx: iconButtonStyles },
                        { icon: <Cut />, sx: iconButtonStyles },
                        iconSpacer,
                        { icon: <Archive />, sx: iconButtonStyles },
                        { icon: <Delete />, sx: ({ palette }) => ({ ":hover": { color: palette.error.main } }) },
                        iconSpacer,
                    ]}
                    menuActions={[
                        {
                            text: "Do something",
                            icon: <LinkExternal />,
                        },
                    ]}
                />
            </Paper>
        );
    });
