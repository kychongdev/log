"use client";
import { urlAtom } from "@/components/app-sidebar";
import { PaginateTab } from "@/components/table/paginate-tab";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { provider, providerList } from "@/lib/provider";
import { IQueryActions, IQueryParams, useQueryParams } from "@/lib/queryParams";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleLetterXFilled,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import Big from "big.js";
import { format } from "date-fns";
import { useAtom } from "jotai";

type GameLog = {
  _id: string;
  request_id: string;
  body: string;
  headers: string;
  proxy_start_time: string;
  proxy_end_time: string;
  provider_code: string;
  stack: string;
  error_body: string;
  createdAt: string;
  updatedAt: string;
  statusCode: number;
  url: string;
  method: string;
  proxy_received_time: string;
  res_body: string;
};

function SpliceUntilDash(str: string) {
  return str.split("-")[0];
}

export const Route = createFileRoute("/game-log")({
  component: RouteComponent,
});

function DataTable({ data }: { data: GameLog[] }) {
  return (
    <div className="rounded-md border">
      <Table className="p-4">
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Time Taken</TableHead>
            <TableHead>Received On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((row) => {
              console.log(row);
              const timeTaken = Big(
                row.proxy_end_time === "" ? 0 : row.proxy_end_time,
              )
                .minus(row.proxy_start_time)
                .div(100000000)
                .round(4, Big.roundUp)
                .toNumber();
              return (
                <TableRow
                  key={row._id}
                  //data-state={row.getIsSelected() && 'selected'}
                >
                  <TableCell>
                    <TableCellViewer item={row.request_id} data={row} />
                  </TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="px-2 text-white bg-green-500 dark:fill-green-400"
                    >
                      {row.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-muted-foreground px-1.5"
                    >
                      {row.statusCode > 199 && row.statusCode < 300 ? (
                        <>
                          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                          {row.statusCode}
                        </>
                      ) : row.statusCode > 299 && row.statusCode < 400 ? (
                        <>
                          <IconAlertCircleFilled className="fill-yellow-500 dark:fill-yellow-400" />
                          {row.statusCode}
                        </>
                      ) : (
                        <>
                          <IconCircleCheckFilled className="fill-red-500 dark:fill-red-400" />
                          {row.statusCode}
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="px-1.5">
                      {provider(row.provider_code)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="px-1.5">
                      {timeTaken < 1 && timeTaken > 0 ? (
                        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                      ) : timeTaken < 0 ? (
                        <IconCircleLetterXFilled className="fill-red-500 dark:fill-red-400" />
                      ) : (
                        <IconCircleLetterXFilled className="fill-yellow-500 dark:fill-yello-400" />
                      )}
                      {timeTaken < 0 ? 0 : timeTaken}s
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(row.proxy_received_time, "yyyy-MM-dd:HH:mm:ss")}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function TableCellViewer({ item, data }: { item: string; data: GameLog }) {
  const isMobile = useIsMobile();
  console.log(data);
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left underline"
        >
          {SpliceUntilDash(item)}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item}</DrawerTitle>
          <DrawerDescription>Request ID</DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm pb-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Provider Header</AccordionTrigger>
              <AccordionContent>
                <Textarea
                  disabled
                  value={JSON.stringify(data.headers, null, "\t")}
                />
              </AccordionContent>
            </AccordionItem>
            {data.body ? (
              <AccordionItem value="item-2">
                <AccordionTrigger>Provider Body</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(JSON.parse(data.body), null, "\t")}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}
            {data.res_body ? (
              <AccordionItem value="item-3">
                <AccordionTrigger>Response Body</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(
                      JSON.parse(data.res_body),
                      null,
                      "\t",
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}

            {data.stack && data.stack !== "" ? (
              <AccordionItem value="item-4">
                <AccordionTrigger>Stack Trace</AccordionTrigger>
                <AccordionContent>
                  <Textarea disabled value={data.stack} />
                </AccordionContent>
              </AccordionItem>
            ) : null}

            {data.error_body && data.error_body !== "" ? (
              <AccordionItem value="item-5">
                <AccordionTrigger>Stack Trace</AccordionTrigger>
                <AccordionContent>
                  <Textarea disabled value={data.error_body} />
                </AccordionContent>
              </AccordionItem>
            ) : null}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SearchBar({ queryAction }: { queryAction: IQueryActions }) {
  return (
    <div className="flex mb-2">
      <Select
        value={""}
        onValueChange={(value) => {
          queryAction.setFilter({ provider_code: value });
        }}
      >
        <SelectTrigger size="sm" className="w-50" id="rows-per-page">
          <SelectValue placeholder={"Provider"} />
        </SelectTrigger>
        <SelectContent side="top">
          {providerList.map((p) => (
            <SelectItem key={p.code} value={p.code}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

const fetchData = async (props: IQueryParams, url: string) => {
  return (
    axios
      //.get("http://localhost:3003/api/log/game/index", {
      //.get("http://159.223.42.121:3003/api/log/game/index", {
      .get(url + "/api/log/game/index", {
        params: props,
      })
      .then((res) => res.data)
  );
};

function RouteComponent() {
  const { queryParams, queryParamsAction } = useQueryParams({
    defaultSorter: "-proxy_received_time",
    defaultLimit: 50,
  });
  const [url] = useAtom(urlAtom);
  const { data } = useQuery({
    queryKey: [
      "game-log",
      queryParams.page,
      queryParams.limit,
      queryParams.filter,
      queryParams.sorter,
      url,
    ],
    queryFn: () => fetchData(queryParams, url),
  });

  return (
    <div>
      {data && data.docs ? (
        <>
          <SearchBar queryAction={queryParamsAction} />
          <DataTable data={data.docs} />
          <PaginateTab props={data} queryAction={queryParamsAction} />
        </>
      ) : null}
    </div>
  );
}
