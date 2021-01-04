/**
 * This file was generated from ParallaxHeader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";

export interface ParallaxHeaderProps<Style> {
    name: string;
    style: Style[];
    headerArea: ReactNode;
    contentArea: ReactNode;
    uiStartCollapsed: boolean;
    uiMinHeight: number;
    uiMaxHeight: number;
}

export interface ParallaxHeaderPreviewProps {
    class: string;
    style: string;
    headerArea: { widgetCount: number; renderer: ComponentType };
    contentArea: { widgetCount: number; renderer: ComponentType };
    uiStartCollapsed: boolean;
    uiMinHeight: number | null;
    uiMaxHeight: number | null;
}
