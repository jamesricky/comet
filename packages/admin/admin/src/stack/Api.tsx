import * as React from "react";

import { BreadcrumbItem, SwitchItem } from "./Stack";

export interface IStackApi {
    addBreadcrumb: (id: string, parentId: string, url: string, title: React.ReactNode) => void;
    updateBreadcrumb: (id: string, parentId: string, url: string, title: React.ReactNode) => void;
    removeBreadcrumb: (id: string) => void;
    goBack: () => void;
    goAllBack: () => void;

    addSwitchMeta: (id: string, options: { activePage: string; isInitialPageActive: boolean }) => void;
    removeSwitchMeta: (id: string) => void;
    switches: SwitchItem[];
    breadCrumbs: BreadcrumbItem[];
}
export const StackApiContext = React.createContext<IStackApi | undefined>(undefined);
export function useStackApi() {
    return React.useContext(StackApiContext);
    // DEBUG DATA
    // const ret = React.useContext(StackApiContext);

    // const [breadCrumbs, setBreadCrumbs] = React.useState<BreadcrumbItem[]>([
    //     {
    //         id: "1",
    //         parentId: "0",
    //         url: "1",
    //         title: "Breadcrumb One",
    //         invisible: false,
    //     },
    //     {
    //         id: "2",
    //         parentId: "1",
    //         url: "2",
    //         title: "Breadcrumb Two",
    //         invisible: false,
    //     },
    //     {
    //         id: "3",
    //         parentId: "2",
    //         url: "3",
    //         title: "Breadcrumb Three",
    //         invisible: false,
    //     },
    // ]);

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setBreadCrumbs([
    //             {
    //                 id: "1",
    //                 parentId: "0",
    //                 url: "1",
    //                 title: "Breadcrumb One",
    //                 invisible: false,
    //             },
    //             {
    //                 id: "2",
    //                 parentId: "1",
    //                 url: "2",
    //                 title: "Breadcrumb Two",
    //                 invisible: false,
    //             },
    //             {
    //                 id: "3",
    //                 parentId: "2",
    //                 url: "3",
    //                 title: "Breadcrumb Three",
    //                 invisible: false,
    //             },
    //             {
    //                 id: "4",
    //                 parentId: "3",
    //                 url: "4",
    //                 title: "Breadcrumb Four",
    //                 invisible: false,
    //             },
    //             {
    //                 id: "5",
    //                 parentId: "4",
    //                 url: "5",
    //                 title: "Breadcrumb Five",
    //                 invisible: false,
    //             },
    //         ]);
    //     }, 2000);
    // }, []);

    // return {
    //     ...ret,
    //     breadCrumbs,
    // };
}

/*
export function withStackApi(WrappedComponent: React.ComponentClass) {
    return React.forwardRef((props, ref) => {
        return (
            <StackApiContext.Consumer>
                {stackApi => <WrappedComponent {...props} stackApi={stackApi} ref={ref} />}
            </StackApiContext.Consumer>
        );
    });
}
*/
export interface IWithApiProps {
    stackApi?: IStackApi;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

// TODO implement ref forwarding with typescript
export const withStackApi =
    <P extends IWithApiProps>(WrappedComponent: React.ComponentType<P>): React.SFC<Subtract<P, IWithApiProps>> =>
    (props: any) =>
        <StackApiContext.Consumer>{(stackApi) => <WrappedComponent {...props} stackApi={stackApi} />}</StackApiContext.Consumer>;
