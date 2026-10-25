import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "outlineLight"
  | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-dark focus-visible:ring-brand-green",
  outline:
    "border border-brand-green text-brand-green bg-transparent hover:bg-brand-green/10 focus-visible:ring-brand-green",
  outlineLight:
    "border border-white/80 text-white bg-transparent hover:bg-white/10 focus-visible:ring-white",
  ghost:
    "bg-transparent text-white hover:text-brand-mint focus-visible:ring-brand-mint",
  secondary:
    "border border-brand-border bg-white text-brand-ink hover:bg-brand-surface/50 focus-visible:ring-brand-green",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60",
    variants[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
