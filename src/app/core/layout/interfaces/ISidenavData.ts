export interface ISidenavData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: ISidenavData[]
}