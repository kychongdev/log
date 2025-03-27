import { createFileRoute } from '@tanstack/react-router';
import data from './data.json';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
//import { atomWithStorage } from 'jotai/utils';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="px-2">
      <div className="pb-4">
        <SectionCards />
      </div>
      <div className="pb-4">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}
