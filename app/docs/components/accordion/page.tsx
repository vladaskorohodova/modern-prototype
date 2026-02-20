import ComingSoon from '@/components/ComingSoon';

export default function AccordionPage() {
  return (
    <ComingSoon
      title="Accordion"
      description="The Accordion component allows users to expand and collapse sections of content with smooth animations and full keyboard support."
      plannedSections={[
        'Basic accordion usage',
        'Single vs multiple expansion',
        'Custom icons and styling',
        'Controlled vs uncontrolled',
        'Accessibility features',
      ]}
      overviewLink="/docs/components/button/overview"
    />
  );
}
