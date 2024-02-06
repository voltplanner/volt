import { SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'

export const BackIcon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={48}
                d="M244 400L100 256l144-144M120 256h292"
            />
        </svg>
    )
}
