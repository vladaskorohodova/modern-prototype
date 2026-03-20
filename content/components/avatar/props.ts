export const avatarProps = [
  {
    name: 'src',
    type: 'string',
    defaultValue: '""',
    description: 'Image URL',
  },
  {
    name: 'alt',
    type: 'string',
    defaultValue: '""',
    description: 'Alt text for the image',
  },
  {
    name: 'fallback',
    type: 'string',
    defaultValue: '""',
    description: 'Fallback text (e.g., initials) when no image is available',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: 'Avatar size',
  },
  {
    name: 'shape',
    type: '"circle" | "square"',
    defaultValue: '"circle"',
    description: 'Avatar shape',
  },
];
