"use client";
import Image from "next/image";
import React from "react";
import diamond from "@/../public/assets/lottery/diamond-icon.png";
import platinum from "@/../public/assets/lottery/platinum-icon.png";
import gold from "@/../public/assets/lottery/gold-icon.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { useTranslation } from "@/lib/store";

const images = [diamond, platinum, gold];

const LeaderBoard = () => {
  const lan = useTranslation((state) => state.lan);
  const seededRandom = (seed: number) => {
    let value = seed;
    return function () {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  const generateList = (seed: number) => {
    const length = 6; // Fixed length
    const random = seededRandom(seed);
    return Array.from({ length }, () => Math.floor(random() * 9) + 1); // Numbers from 1 to 9
  };

  const day = new Date().getDate();
  const users = generateList(day);

  return (
    <div className="mt-8 bg-primary shadow-sm border border-border rounded-lg px-4">
      <div className="flex items-center justify-between py-2">
        <h4 className="mb-2 text-white text-xs md:text-sm font-medium md:font-semibold">
          {lan == "BN" ? "লিডারবোর্ড" : "Leader Board"}
        </h4>
        <div className="px-2 py-2 rounded-lg flex gap-1">
          <span className="text-white text-xs ">
            {lan == "BN" ? "২০০+" : "200+"}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {lan == "BN" ? "গত সপ্তাহ" : "Last week"}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Table>
          <TableCaption className="text-[10px]">
            {lan == "BN"
              ? "আরও ১৯৩ জন ব্যবহারকারী পুরস্কার পেয়েছেন।"
              : "More 193 users got prize"}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{lan == "BN" ? "ব্যবহারকারী" : "User"}</TableHead>
              <TableHead>{lan == "BN" ? "পুরস্কার" : "Prize"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((num, i) => {
              if (i < 3) {
                return (
                  <TableRow key={i}>
                    <TableCell className="flex justify-between items-center  font-medium">
                      <span className="text-[10px] text-white">
                        01********{num}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Image
                          alt="diamond"
                          src={images[i]}
                          className="w-4 h-4"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
              return (
                <TableRow key={i}>
                  <TableCell className="flex justify-between items-center px-2 py-1">
                    <span className="text-[10px] text-white">
                      01********{num}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[10px] text-white">
                      {num % 2 == 0
                        ? `${lan == "BN" ? "৫০,০০০ টাকা" : "50,000 Taka"}`
                        : `${lan == "BN" ? "১,০০,০০০ টাকা" : "100,000 Taka"}`}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeaderBoard;
