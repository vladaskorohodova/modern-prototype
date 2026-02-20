import ComingSoon from '@/components/ComingSoon';

export default function SchedulerAPIReferencePage() {
  return (
    <ComingSoon
      title="Scheduler - API Reference"
      description="Complete API reference for the Scheduler component including all props, methods, and events."
      plannedSections={[
        'Props reference',
        'Methods and APIs',
        'Events and callbacks',
        'TypeScript types',
        'Advanced configuration',
      ]}
      overviewLink="/docs/scheduler/overview"
    />
  );
}
