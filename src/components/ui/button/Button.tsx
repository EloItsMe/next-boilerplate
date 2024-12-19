import { cva, VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link, { LinkProps } from "next/link";

const ButtonVariants = cva(
  "relative inline-flex h-8 items-center justify-center rounded-md px-4 font-medium disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-950 text-neutral-50 hover:bg-neutral-800 disabled:bg-neutral-400",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export function Button({
  children,
  className,
  variant,
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonVariants> & { loading?: boolean }) {
  return (
    <button className={ButtonVariants({ variant, className })} {...props}>
      <AnimatePresence initial={false}>
        <motion.span
          animate={{
            opacity: loading ? 0 : 1,
            y: loading ? "-100%" : "0%",
          }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm"
        >
          {children}
        </motion.span>
        {loading && (
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute"
          >
            <LoaderCircle className="animate-spin" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ButtonAsLink({
  children,
  className,
  variant,
  ...props
}: LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof ButtonVariants>) {
  return (
    <Link className={ButtonVariants({ variant, className })} {...props}>
      {children}
    </Link>
  );
}
