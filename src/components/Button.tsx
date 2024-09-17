import { twMerge } from "tailwind-merge"

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "secondary"
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
    const { children, className, ...rest } = props

    return (
        <button
            className={twMerge(
                `border-primary bg-primary [&:not(:disabled)]:hover:text-primary active:text-primary inline-block rounded-lg border
                text-sm font-medium text-white focus:outline-none focus:ring [&:not(:disabled)]:hover:bg-transparent`,
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
