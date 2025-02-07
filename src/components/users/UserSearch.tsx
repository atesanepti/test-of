"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersFilter } from "@/lib/store";
import { UserStatus } from "@/types/enum";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
const UserSearch = () => {
  const [search, setSearchValue] = useState("");

  const { setStatus, setSearch } = useUsersFilter((state) => state);

  return (
    <div className="mt-4 ">
      <div className="flex items-center gap-1 mb-2">
        <Input
          placeholder="Number or Email"
          type="text"
          value={search}
          className="w-full !m-0"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button size="sm"  onClick={() => setSearch(search)}>
          <Search className="w-4 h-4"></Search>
        </Button>
      </div>

      <Select
        onValueChange={(value: UserStatus | string) =>
          setStatus(value == "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="User Status" />
        </SelectTrigger>
        <SelectContent className="mt-2 w-full">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
          <SelectItem value={UserStatus.BANNED}>Banned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSearch;
