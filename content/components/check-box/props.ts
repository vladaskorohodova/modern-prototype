export const checkBoxProps = [
  {
    name: 'checked',
    type: 'boolean',
    description: 'Controlled checked state',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Initial checked state (uncontrolled)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether the checkbox is disabled',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '""',
    description: 'Text label shown next to the checkbox',
  },
  {
    name: 'onChange',
    type: '(checked: boolean) => void',
    defaultValue: '',
    description: 'Called when checked state changes',
  },
];
