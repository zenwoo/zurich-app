import {
  ArrowUpNarrowWide,
  ArrowDownNarrowWide
} from 'lucide-react';
import { Button } from '../../shadcn-ui/button';

export default function ColumnSort({ column, header }) {
  const handleSort = () => (
    column.toggleSorting(column.getIsSorted() === 'asc')
  );

  return (
    <Button
      className="p-0"
      variant="ghost"
      onClick={handleSort}
    >
      {header}
      {
        column.getIsSorted() === 'asc' ? (
          <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDownNarrowWide className="ml-2 h-4 w-4" />
        )
      }
    </Button>
  );
}
