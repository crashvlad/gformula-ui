'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { Button } from './button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder: string;
  columnSearch: string;
  actions?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  columnSearch,
  placeholder,
  actions,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder={placeholder}
          value={
            (table.getColumn(columnSearch)?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn(columnSearch)?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
      </div>

      <div className="flex gap-3">
        {actions && actions}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
