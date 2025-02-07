"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LastSixMonthsStats } from "@/types/interface";
import { useFetchPaymentDataQuery } from "@/lib/features/api/paymentApiSlice";

const chartConfig = {
  desktop: {
    label: "Desposits",
    color: "#3B82F6",
  },
  mobile: {
    label: "Withdraws",
    color: "#A855F7",
  },
} satisfies ChartConfig;

const Chart = () => {
  const { data: payment, isLoading } = useFetchPaymentDataQuery();
  const payload = payment?.payload;

  const chartData: Array<{ month: string; desktop: number; mobile: number }> =
    [];

  for (const key in payload) {
    chartData.push({
      month: key,
      desktop: payload[key as keyof LastSixMonthsStats].deposits,
      mobile: payload[key as keyof LastSixMonthsStats].withdrawals,
    });
  }
  console.log({ chartData });
  return (
    <>
      {payload && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Withdraws x Desposits</CardTitle>
            <CardDescription>
              Showing total comparison between Withdraws and Desposits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  {chartData[0].month} - {chartData[chartData.length - 1].month}{" "}
                  2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
export default Chart;
