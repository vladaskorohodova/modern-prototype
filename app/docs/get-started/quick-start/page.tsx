import ComingSoon from '@/components/ComingSoon';

export default function QuickStartPage() {
  return (
    <ComingSoon
      title="Quick Start"
      description="This guide will walk you through creating your first application with the Modern React Knowledge System in just a few minutes."
      plannedSections={[
        'Create a new Next.js project',
        'Install dependencies',
        'Add your first components',
        'Customize styling',
        'Deploy your app',
      ]}
      overviewLink="/docs/get-started/installation"
    />
  );
}
