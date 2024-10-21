import { Input } from '../../shadcn-ui/input';

export default function ColumnFilter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const header = typeof column.columnDef.header === 'string'
    ? column.columnDef.header
    : column.columnDef.meta.header;

  const handleFilterChange = (event) => (
    column.setFilterValue(event.currentTarget.value)
  );

  return (
    <div className="flex items-center py-4">
      <Input
        className="max-w-sm"
        onChange={handleFilterChange}
        placeholder={`Filter ${header}`}
        value={(columnFilterValue ?? '')}
      />
    </div>
  );
}
