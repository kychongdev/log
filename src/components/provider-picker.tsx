import { IQueryActions, IQueryParams } from "@/lib/qs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { providerList } from "@/lib/provider";

export function ProviderPicker({
  queryParams,
  queryAction,
}: {
  queryParams: IQueryParams;
  queryAction: IQueryActions;
}) {
  return (
    <div className="flex mb-2">
      <Select
        value={queryParams.filter.provider_code}
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
