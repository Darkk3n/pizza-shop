import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const Icon = ({ children, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
};

export const MenuIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Icon>
  );
};

export const CloseIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
};

export const DashboardIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Icon>
  );
};

export const OrdersIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6" />
    </Icon>
  );
};

export const RecipesIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" />
      <path d="M4 19a2 2 0 012-2h13v4H6a2 2 0 01-2-2z" />
    </Icon>
  );
};

export const InventoryIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M21 8l-9-5-9 5 9 5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </Icon>
  );
};

export const AnalyticsIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </Icon>
  );
};

/** Brand mark: a pizza slice. */
export const BrandLogo = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="#ea580c" />
      <path d="M7 9c6-3 12-3 18 0L16 27 7 9z" fill="#fde68a" />
      <path d="M7 9c6-3 12-3 18 0" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="13" cy="13" r="1.8" fill="#dc2626" />
      <circle cx="19" cy="14" r="1.8" fill="#dc2626" />
      <circle cx="16" cy="19" r="1.6" fill="#dc2626" />
    </svg>
  );
};
