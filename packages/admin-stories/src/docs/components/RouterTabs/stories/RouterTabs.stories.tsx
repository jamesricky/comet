import { RouterTab, RouterTabs } from "@comet/admin";
import { Paper } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useLocation } from "react-router";

import { storyRouterDecorator } from "../../../../story-router.decorator";

storiesOf("stories/components/RouterTabs/RouterTabs", module)
    .addDecorator(storyRouterDecorator())
    .add("RouterTabs", () => {
        const location = useLocation();

        return (
            <Paper>
                <p>Location: {location.pathname}</p>
                <RouterTabs>
                    <RouterTab path="" label="Tab 1">
                        <h1>Tab 1</h1>
                    </RouterTab>
                    <RouterTab path="/tab2" label="Tab 2">
                        <h1>Tab 2</h1>
                    </RouterTab>
                    {/*<RouterTab path="tab3" label="Tab 3">*/}
                    {/*    <h1>Tab 3</h1>*/}
                    {/*</RouterTab>*/}
                </RouterTabs>
            </Paper>
        );
    });
