import { IQueryParams, useQueryParams } from "@/lib/queryParams";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/game-launch-log")({
  component: RouteComponent,
});

const fetchUsers = async (props: IQueryParams) => {
  return (
    axios
      //.get("http://localhost:3003/api/log/game-launch/index", {
      //.get('http://159.223.42.121:3003/api/log/game-launch/index', {
      .get("https://api.lucky88vip.one/api/log/game-launch/index", {
        params: props,
      })
      .then((res) => res.data)
  );
};
function RouteComponent() {
  const { queryParams, queryParamsAction } = useQueryParams({});
  const { data } = useQuery({
    queryKey: [
      "game-log",
      queryParams.page,
      queryParams.limit,
      queryParams.filter,
      queryParams.sorter,
    ],
    queryFn: () => fetchUsers(queryParams),
  });
  console.log(data);
  return <div>Hello "/game-launch-log"!</div>;
}
