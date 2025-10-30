import * as React from "react"
import { SVGProps } from "react"

const MicrosoftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11.5 21H3V12.5h8.5zm0-9.5H3V3h8.5zM21 21h-8.5V12.5H21zm0-9.5h-8.5V3H21z"
    />
  </svg>
)
export default MicrosoftIcon
