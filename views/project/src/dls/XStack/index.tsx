import React from "react";
import { CSSProperties } from "react";
import { Props } from "./interface";

interface XStackProps extends Props {
  style?: CSSProperties;
}

export const XStack: React.FC<XStackProps> = ({ children, style }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
