import ComingSoon from '@/components/ComingSoon';

export default function SchedulerOverviewPage() {
  return (
    <ComingSoon
      title="Scheduler Overview"
      description="The Scheduler component helps you display and manage time-based events with drag-and-drop, recurring events, and conflict resolution."
      plannedSections={[
        'Basic scheduler setup',
        'Views (day, week, month)',
        'Styling and customization',
        'Accessibility features',
        'Performance tips',
      ]}
      overviewLink="/docs/components/button/overview"
    />
  );
}
