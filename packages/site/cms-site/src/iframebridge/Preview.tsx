import * as React from "react";
import scrollIntoView from "scroll-into-view-if-needed";

import { OverlayElementData, OverlayElementsContext } from "./IFrameBridge";
import { ComponentTitle, Root, Selection } from "./Preview.sc";
import { useIFrameBridge } from "./useIFrameBridge";
import { useUniqueId } from "./useUniqueId";

interface PreviewProps {
    adminRoute: string;
    type: string;
    enabledAutoScrolling?: boolean;
}

export const Preview: React.FunctionComponent<PreviewProps> = ({ adminRoute, type, children, enabledAutoScrolling = true }) => {
    const iFrameBridge = useIFrameBridge();
    const isSelected = adminRoute === iFrameBridge.selectedAdminRoute;
    const isHovered = adminRoute === iFrameBridge.hoveredAdminRoute;
    const rootEl = React.useRef<HTMLDivElement | null>(null);
    const { setElements, updateElement } = React.useContext(OverlayElementsContext);
    const previewId = useUniqueId("preview-");

    // scroll block into view when it gets selected
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (enabledAutoScrolling) {
                if (isHovered || isSelected) {
                    if (rootEl.current) {
                        scrollIntoView(rootEl.current, {
                            scrollMode: "if-needed",
                            block: "center",
                            inline: "nearest",
                            behavior: "smooth",
                        });
                    }
                }
            }
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
    }, [enabledAutoScrolling, isHovered, isSelected]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (rootEl.current) {
                const newData: OverlayElementData = {
                    id: previewId,
                    position: {
                        x: rootEl.current.offsetLeft,
                        y: rootEl.current.offsetTop,
                    },
                    size: {
                        width: rootEl.current.offsetWidth,
                        height: rootEl.current.offsetHeight,
                    },
                    name: type,
                    onClick: () => {
                        iFrameBridge.sendSelectComponent(adminRoute);
                    },
                };
                setElements((elements) => [...elements, newData]);
            }
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adminRoute, setElements, type]);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const newData: OverlayElementData = {
                id: previewId,
                position: {
                    x: (entries[0].target as HTMLElement).offsetLeft,
                    y: (entries[0].target as HTMLElement).offsetTop,
                },
                size: {
                    width: (entries[0].target as HTMLElement).offsetWidth,
                    height: (entries[0].target as HTMLElement).offsetHeight,
                },
                name: type,
                onClick: () => {
                    iFrameBridge.sendSelectComponent(adminRoute);
                },
            };
            updateElement(previewId, newData);
        });

        if (rootEl.current) {
            resizeObserver.observe(rootEl.current);
        }

        return () => {
            if (rootEl.current) {
                resizeObserver.unobserve(rootEl.current);
            }
        };
    }, []);

    return iFrameBridge.hasBridge ? (
        <Root ref={rootEl} isSelected={isSelected} isHovered={isHovered} showOutlines={iFrameBridge.showOutlines} data-preview-id={previewId}>
            <Selection
                data-test-123="123__"
                showOutlines={iFrameBridge.showOutlines}
                isSelected={isSelected}
                isHovered={isHovered}
                onClick={() => {
                    iFrameBridge.sendSelectComponent(adminRoute);
                }}
                onMouseEnter={() => {
                    iFrameBridge.sendHoverComponent(adminRoute);
                }}
                onMouseLeave={() => {
                    iFrameBridge.sendHoverComponent(null);
                }}
            >
                {isSelected && <ComponentTitle>{type}</ComponentTitle>}
            </Selection>
            {children}
        </Root>
    ) : (
        <>{children}</>
    );
};
