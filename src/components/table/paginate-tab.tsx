import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { PaginateTabProps } from "@/types/PaginateProps";
import { IQueryActions } from "@/lib/queryParams";

export function PaginateTab({
  props,
  queryAction,
}: {
  props: PaginateTabProps;
  queryAction: IQueryActions;
}) {
  const { hasNextPage, hasPrevPage, page, totalPages, totalDocs, limit } =
    props;
  const { setPage, setLimit } = queryAction;
  return (
    <div className="flex items-center justify-between px-4 pt-2">
      <div className="flex w-full items-center gap-8">
        <div className="text-muted-foreground flex-1 text-sm lg:flex">
          Total {totalDocs} rows
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              setLimit(Number(value));
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={50} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 30, 50, 70, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {page}
        </div>
        <div className="ml-0 flex items-center gap-2 ">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 lg:flex"
            onClick={() => setPage(1)}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            disabled={!hasPrevPage}
            onClick={() => setPage(page - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => setPage(page + 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="size-8 lg:flex"
            size="icon"
            onClick={() => setPage(totalPages)}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
