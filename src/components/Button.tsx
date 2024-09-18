import { twMerge } from "tailwind-merge"

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "secondary"
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
    const { children, className, ...rest } = props

    return (
        <button
            className={twMerge(
                `inline-block rounded-lg border border-primary bg-primary text-sm font-medium text-white transition active:text-primary
                [&:not(:disabled)]:hover:bg-transparent [&:not(:disabled)]:hover:text-primary`,
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
