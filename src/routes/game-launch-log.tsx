import { urlAtom } from "@/components/app-sidebar";
import { PaginateTab } from "@/components/table/paginate-tab";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { provider } from "@/lib/provider";
import { IQueryParams, useQueryParams } from "@/lib/queryParams";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { format } from "date-fns";
import { useAtom } from "jotai";

type GameLaunchLog = {
  _id: string;
  body: string;
  createdAt: string;
  url: string;
  payload: string;
  id: string;
  provider_code: string;
  res_data: string;
  res_headers: string;
  res_message: string;
  res_request: string;
  res_status: string;
  res_status_text: string;
  updatedAt: string;
  game: string;
  player_id: string;
  game_id: string;
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
                <TableCell>{row._id}</TableCell>
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

const fetchData = async (props: IQueryParams, url: string) => {
  return (
    axios
      //.get("http://localhost:3003/api/log/game-launch/index", {
      //.get("http://159.223.42.121:3003/api/log/game-launch/index", {
      .get(url + "/api/log/game-launch/index", {
        params: props,
      })
      .then((res) => res.data)
  );
};
function RouteComponent() {
  const { queryParams, queryParamsAction } = useQueryParams({
    defaultSorter: "-createdAt",
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
          <DataTable data={data.docs} />
          <PaginateTab props={data} queryAction={queryParamsAction} />
        </>
      ) : null}
    </div>
  );
}
