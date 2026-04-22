interface IconProps {
  fill?: string
  stroke?: string
  size?: number
}

const HeartIcon = ({ fill = 'none', stroke = 'currentColor', size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20.5s-6.5-4.35-8.75-8.2C1.23 8.9 3.02 5 6.91 5c2.16 0 3.44 1.2 4.09 2.24C11.65 6.2 12.93 5 15.09 5c3.89 0 5.68 3.9 3.66 7.3C18.5 16.15 12 20.5 12 20.5Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
)

const ShareIcon = ({ stroke = 'currentColor', size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14 5 19 5 19 10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14 19 5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 14v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const icons = {
  Heart: HeartIcon,
  Share: ShareIcon,
} as const

type IconName = keyof typeof icons

interface Props extends IconProps {
  icon: IconName
}

export const SvgIcon = ({ icon, ...props }: Props) => {
  const IconComponent = icons[icon]
  return <IconComponent {...props} />
}
