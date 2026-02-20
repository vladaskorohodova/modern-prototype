export const buttonProps = [
  {
    name: 'variant',
    type: '"solid" | "outline" | "ghost"',
    defaultValue: '"solid"',
    description: 'The visual style of the button',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the button is disabled',
  },
  {
    name: 'onClick',
    type: '(event: React.MouseEvent) => void',
    defaultValue: '',
    description: 'Click event handler',
  },
];
