import ComingSoon from '@/components/ComingSoon';

export default function SchedulerResolveOverlappingPage() {
  return (
    <ComingSoon
      title="Scheduler - Resolve Overlapping"
      description="Handle overlapping events with automatic conflict detection and resolution strategies."
      plannedSections={[
        'Detecting overlaps',
        'Visual indicators',
        'Conflict resolution strategies',
        'Custom overlap handlers',
        'User notifications',
      ]}
      overviewLink="/docs/scheduler/overview"
    />
  );
}
