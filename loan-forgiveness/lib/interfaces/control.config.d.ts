import { ToolTipConfig } from './tooltip.config';
export interface controlConfig {
    is_group: boolean;
    control_name: string;
    el_name: string;
    label: string;
    label_info?: string;
    placeholder?: string;
    showETran?: boolean;
    titleBold?: boolean;
    controls?: controlConfig[];
    tooltip?: ToolTipConfig;
    error_message?: string;
}
