"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface filterProps {
  [x: string]: any;
}

interface IUseQueryParams {
  defaultPage?: number;
  defaultLimit?: number;
  defaultFilter?: filterProps;
  defaultSorter?: string;
}

export interface IUseQueryParamsResult {
  qp: IQueryParams;
  qpAction: IQueryActions;
}

export interface IQueryParams {
  page: number;
  limit: number;
  filter: filterProps;
  sorter: string;
}

export interface IQueryActions {
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setSorter: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<filterProps>>;
}

export function useQp({
  defaultPage = 1,
  defaultLimit = 10,
  defaultFilter = {},
  defaultSorter = "",
}: IUseQueryParams): IUseQueryParamsResult {
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
  const [sorter, setSorter] = useState(defaultSorter);
  const [filter, setFilter] = useState(defaultFilter);

  return {
    qp: {
      page,
      limit,
      filter,
      sorter,
    },
    qpAction: {
      setPage,
      setLimit,
      setSorter,
      setFilter,
    },
  };
}
