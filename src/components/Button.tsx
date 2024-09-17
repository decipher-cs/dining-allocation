import { twMerge } from "tailwind-merge"

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    variant?: "primary" | "secondary"
}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
    const { children, className, ...rest } = props

    return (
        <button
            className={twMerge(
                `border-primary bg-primary hover:text-primary active:text-primary inline-block rounded-lg border text-sm font-medium
                text-white hover:bg-transparent focus:outline-none focus:ring`,
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
