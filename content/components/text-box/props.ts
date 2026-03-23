export const textBoxProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Controlled value',
  },
  {
    name: 'defaultValue',
    type: 'string',
    defaultValue: '""',
    description: 'Initial value (uncontrolled)',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '""',
    description: 'Placeholder text shown when empty',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the input is disabled',
  },
  {
    name: 'error',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether to show an error state',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    defaultValue: '',
    description: 'Called when the value changes',
  },
];
