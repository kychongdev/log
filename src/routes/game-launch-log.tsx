import { urlAtom } from "@/components/app-sidebar";
import { DateTimePicker24h } from "@/components/datetime24h-picker";
import { ProviderPicker } from "@/components/provider-picker";
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
import { Label } from "@/components/ui/label";
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
import { provider } from "@/lib/provider";
import { IQueryActions, qsAtom } from "@/lib/qs";
import { IQueryParams, useQueryParams } from "@/lib/qs";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { format } from "date-fns";
import { useAtom } from "jotai";
import { useImmerAtom } from "jotai-immer";

type GameLaunchLog = {
  _id: string;
  url: string;
  payload: string;
  game: string;
  body: string;
  res_headers: string;
  res_data: string;
  res_status: string;
  res_status_text: string;
  res_request: string;
  res_message: string;
  provider_code: string;
  player_id: string;
  game_id: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export const Route = createFileRoute("/game-launch-log")({
  component: RouteComponent,
});

function DataTable({ data }: { data: GameLaunchLog[] }) {
  return (
    <div className="rounded-md border">
      <Table className="p-4">
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Player ID</TableHead>
            <TableHead>Game ID</TableHead>
            <TableHead>Launch On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((row) => (
              <TableRow>
                <TableCell>
                  <TableCellViewer item={row._id} data={row} />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="px-1.5">
                    {provider(row.provider_code)}
                  </Badge>
                </TableCell>
                <TableCell>{row.player_id}</TableCell>
                <TableCell>{row.game_id}</TableCell>
                <TableCell>
                  {format(row.createdAt, "yyyy-MM-dd:HH:mm:ss")}{" "}
                </TableCell>
              </TableRow>
            ))
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

function TableCellViewer({
  item,
  data,
}: {
  item: string;
  data: GameLaunchLog;
}) {
  const isMobile = useIsMobile();

  //game: string;
  //body: string;
  //res_headers: string;
  //res_data: string;
  //res_status: string;
  //res_status_text: string;
  //res_request: string;
  //res_message: string;
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left underline"
        >
          {item}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item}</DrawerTitle>
          <DrawerDescription>Request ID</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm pb-4">
          <Textarea disabled>{data.url}</Textarea>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm pb-4">
          <Accordion type="single" collapsible className="w-full">
            {data.payload && data.payload !== "" ? (
              <AccordionItem value="item-1">
                <AccordionTrigger>Player Payload</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(JSON.parse(data.payload), null, "\t")}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}
            <AccordionItem value="item-2">
              <AccordionTrigger>Response Header</AccordionTrigger>
              <AccordionContent>
                <Textarea
                  disabled
                  value={JSON.stringify(
                    JSON.parse(data.res_headers),
                    null,
                    "\t",
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            {data.body && data.body !== "" ? (
              <AccordionItem value="item-3">
                <AccordionTrigger>Our Request Body</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(JSON.parse(data.body), null, "\t")}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}
            {data.res_data && data.res_data !== "" ? (
              <AccordionItem value="item-4">
                <AccordionTrigger>Provider Response</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(
                      JSON.parse(data.res_data),
                      null,
                      "\t",
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}

            {data.res_request && data.res_request !== "" ? (
              <AccordionItem value="item-4">
                <AccordionTrigger>Stack Trace</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(
                      JSON.parse(data.res_request),
                      null,
                      "\t",
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}

            {data.res_message && data.res_message !== "" ? (
              <AccordionItem value="item-5">
                <AccordionTrigger>Stack Trace</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={JSON.stringify(
                      JSON.parse(data.res_request),
                      null,
                      "\t",
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            ) : null}
          </Accordion>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const fetchData = async (props: IQueryParams, url: string) => {
  return axios
    .get(url + "/api/log/game-launch/index", {
      params: props,
    })
    .then((res) => res.data);
};

function GameLaunchLog({
  queryParams,
  queryParamsAction,
}: {
  queryParams: IQueryParams;
  queryParamsAction: IQueryActions;
}) {
  const [url] = useAtom(urlAtom);
  const { data } = useQuery({
    queryKey: ["game-launch-log", queryParams, url],
    queryFn: () => fetchData(queryParams, url),
  });
  return (
    <div>
      {data && data.docs ? (
        <>
          <DataTable data={data.docs} />
          <PaginateTab props={data} queryAction={queryParamsAction} />
        </>
      ) : null}
    </div>
  );
}

function RouteComponent() {
  const { queryParams, queryParamsAction } = useQueryParams({
    defaultSorter: "-createdAt",
    defaultLimit: 50,
  });

  function handleStartDateChange(date: Date) {
    queryParamsAction.setFilter((prev) => ({
      ...prev,
      startDate: date,
    }));
  }

  function handleEndDateChange(date: Date) {
    queryParamsAction.setFilter((prev) => ({
      ...prev,
      endDate: date,
    }));
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-2 sm:grid-cols-2 ">
        <div>
          <Label className="mx-2 mb-1">Start Date</Label>
          <DateTimePicker24h
            value={queryParams.filter.startDate}
            setValue={handleStartDateChange}
          />
        </div>
        <div>
          <Label className="mx-2 mb-1">End Date</Label>
          <DateTimePicker24h
            value={queryParams.filter.endDate}
            setValue={handleEndDateChange}
          />
        </div>
      </div>
      <ProviderPicker
        queryParams={queryParams}
        queryAction={queryParamsAction}
      />
      <GameLaunchLog
        queryParams={queryParams}
        queryParamsAction={queryParamsAction}
      />
    </>
  );
}
