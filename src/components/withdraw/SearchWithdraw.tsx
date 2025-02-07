"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useWithdrawReqFilter } from "@/lib/store";
import { FileterButton } from "@/components/deposit/Filter";

const SearchDeposits = () => {
  const [search, setSearch] = useState("");

  const setSearchOnStore = useWithdrawReqFilter((state) => state.setSeach);

  useEffect(() => {
    if (search) {
      setSearchOnStore(search);
    }
  }, [search, setSearchOnStore]);

  return (
    <div className="flex items-center gap-1 py-2">
      <FileterButton />
      <Input
        placeholder="Search By Wallet Number"
        type="text"
        value={search}
        className="!m-0"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchDeposits;
