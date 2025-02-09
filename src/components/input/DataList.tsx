"use client";
import React, { useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const DataList = ({ onChange }: { onChange: (value: string) => void }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const allowedValues = Array.from({ length: 50 }, (_, i) => ({
    value: (i + 1) * 500,
    label: (i + 1) * 500,
  }));

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="mb-2">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between !border-border text-muted hover:text-muted/90"
        >
          {value
            ? allowedValues.find(
                (allowedValue) => allowedValue.value.toString() == value
              )?.label
            : "Select Amount..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search amount..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {allowedValues.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value == framework.value.toString()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DataList;
