'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  sortKey?: string;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
  filterKey?: keyof T;
  filterOptions?: { label: string; value: string }[];
  pageSize?: number;
  emptyState?: React.ReactNode;
  loading?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = "Search items...",
  searchKey,
  filterKey,
  filterOptions,
  pageSize = 5,
  emptyState,
  loading = false,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Filtering
  const filteredData = useMemo(() => {
    let result = [...data];

    if (filterKey && filterValue) {
      result = result.filter(item => {
        const val = item[filterKey];
        return String(val).toLowerCase() === filterValue.toLowerCase();
      });
    }

    if (searchKey && searchQuery) {
      result = result.filter(item => {
        const val = item[searchKey];
        return String(val).toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    return result;
  }, [data, searchQuery, searchKey, filterKey, filterValue]);

  // 2. Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const result = [...filteredData];
    result.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      // Handle function accessors if sortKey refers to a path
      if (typeof valA === 'object' || typeof valB === 'object') {
        return 0;
      }

      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }

      return sortDirection === 'asc'
        ? (valA > valB ? 1 : -1)
        : (valB > valA ? 1 : -1);
    });

    return result;
  }, [filteredData, sortKey, sortDirection]);

  // 3. Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Controls: Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {searchKey && (
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-muted-foreground">
              <Search size={16} strokeWidth={1.5} />
            </span>
            <input 
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border border-border/80 pl-11 pr-4 py-3 rounded-medium text-xs focus:outline-none focus:border-accent transition-all shadow-subtle placeholder:opacity-50"
            />
          </div>
        )}

        {filterKey && filterOptions && (
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-muted-foreground pointer-events-none">
              <SlidersHorizontal size={14} strokeWidth={1.5} />
            </span>
            <select
              value={filterValue}
              onChange={(e) => { setFilterValue(e.target.value); setCurrentPage(1); }}
              className="appearance-none bg-white border border-border/80 pl-11 pr-10 py-3 rounded-medium text-xs focus:outline-none focus:border-accent transition-all shadow-subtle min-w-[160px]"
            >
              <option value="">All Categories</option>
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-border/60 rounded-medium shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                {columns.map((col, idx) => (
                  <th 
                    key={idx} 
                    className={`px-8 py-5 select-none ${col.className || ''}`}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.sortKey || String(col.accessorKey))}
                        className="flex items-center gap-2 hover:text-foreground transition-colors group cursor-pointer"
                      >
                        {col.header}
                        <ArrowUpDown size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Loading Skeleton Rows
                Array.from({ length: pageSize }).map((_, rIdx) => (
                  <tr key={rIdx} className="border-b border-border/30 last:border-none">
                    {columns.map((_, cIdx) => (
                      <td key={cIdx} className="px-8 py-5">
                        <div className="h-4 bg-muted animate-pulse rounded-sm w-full max-w-[120px]" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={columns.length} className="px-8 py-16 text-center">
                    {emptyState ? emptyState : (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">No records found</p>
                        <p className="text-xs text-muted-foreground/60">Try adjusting your filters or search terms.</p>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                // Data Rows
                paginatedData.map((row, rIdx) => (
                  <tr 
                    key={rIdx} 
                    className="border-b border-border/30 last:border-none hover:bg-muted/10 transition-colors"
                  >
                    {columns.map((col, cIdx) => {
                      const content = typeof col.accessorKey === 'function'
                        ? col.accessorKey(row)
                        : row[col.accessorKey as string];
                      
                      return (
                        <td key={cIdx} className={`px-8 py-5 text-xs text-foreground/80 font-medium ${col.className || ''}`}>
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-8 py-4 border-t border-border/50 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
            <span>
              Page {currentPage} of {totalPages} ({sortedData.length} items)
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 border border-border/60 rounded-medium bg-white hover:bg-muted/20 disabled:opacity-30 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-2 border border-border/60 rounded-medium bg-white hover:bg-muted/20 disabled:opacity-30 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
