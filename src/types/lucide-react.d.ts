declare module "lucide-react" {
  import { FC, SVGProps } from "react";

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = FC<IconProps>;

  export const Upload: Icon;
  export const Camera: Icon;
  export const Globe: Icon;
  export const CheckCircle: Icon;

  export const icons: Record<string, Icon>;
}
