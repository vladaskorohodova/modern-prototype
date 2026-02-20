import ComingSoon from '@/components/ComingSoon';

export default function SchedulerBindDataPage() {
  return (
    <ComingSoon
      title="Scheduler - Bind Data"
      description="Learn how to bind event data to the Scheduler component from various sources including calendars, databases, and APIs."
      plannedSections={[
        'Event data structure',
        'Loading events from APIs',
        'Calendar integration',
        'Recurring events',
        'Time zones handling',
      ]}
      overviewLink="/docs/scheduler/overview"
    />
  );
}
