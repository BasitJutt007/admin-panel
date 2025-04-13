'use client'
import clsx from 'clsx'
import { ButtonProps } from '@/types'

const Button: React.FC<ButtonProps> = ({ children, isLoading = false, disabled, className, ...props }) => {
    return (
        <button
            className={clsx(
                'bg-white text-[#1e3261] font-semibold px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all',
                (isLoading || disabled) && 'opacity-50 cursor-not-allowed',
                className
            )}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? 'Saving...' : children}
        </button>
    )
}

export default Button;