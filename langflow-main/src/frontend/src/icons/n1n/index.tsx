import type React from "react";
import { forwardRef } from "react";
import SvgN1N from "./N1NIcon";

export const N1NIcon = forwardRef<
    SVGSVGElement,
    React.PropsWithChildren<{}>
>((props, ref) => {
    return <SvgN1N ref={ref} {...props} />;
});
