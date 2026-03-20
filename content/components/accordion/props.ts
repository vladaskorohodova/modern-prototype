export const accordionProps = [
  {
    name: 'items',
    type: 'Array<{ id: string; title: string; content: React.ReactNode }>',
    defaultValue: '[]',
    description: 'Accordion items to render',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Whether multiple items can be expanded at the same time',
  },
  {
    name: 'defaultExpandedIds',
    type: 'string[]',
    defaultValue: '[]',
    description: 'Item ids expanded initially (uncontrolled)',
  },
  {
    name: 'expandedIds',
    type: 'string[]',
    defaultValue: '',
    description: 'Controlled expanded item ids',
  },
  {
    name: 'onExpandedChange',
    type: '(expandedIds: string[]) => void',
    defaultValue: '',
    description: 'Called when the expanded set changes',
  },
];
