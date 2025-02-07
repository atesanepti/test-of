import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./features/api/apiSlice";
import { create } from "zustand";
import { DepositsStatus, PaymentMethod } from "@prisma/client";
import { Coin, DateRange, UserStatus } from "@/types/enum";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

setupListeners(makeStore().dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

interface DepositFilteringProps {
  isVisible: boolean;
  date: DateRange | string;
  status: DepositsStatus | string;
  method: PaymentMethod | string;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSeach: (search: string) => void;
  setFilter: ({
    date,
    status,
    method,
  }: {
    date?: DateRange;
    status?: DepositsStatus | string;
    method?: PaymentMethod | string;
  }) => void;
  setToggleVisible: () => void;
  clearState: () => void;
}

export const useDepositsReqFilter = create<DepositFilteringProps>((set) => ({
  isVisible: false,
  date: "",
  method: "",
  status: "",
  setFilter: ({ status, date, method }) =>
    set((stata) => {
      const newState: typeof stata = { ...stata };
      newState.status = status == "" ? status! : status! || stata.status;
      if (date) {
        newState.date = date;
      }
      if (method) {
        newState.method = method;
      }

      return newState;
    }),
  setToggleVisible: () =>
    set((state) => ({ ...state, isVisible: !state.isVisible })),
  clearState: () =>
    set((state) => ({ ...state, date: "", method: "", status: "" })),
  page: 1,
  search: "",
  setPage: (newPage: number) => set((state) => ({ ...state, page: newPage })),
  setSeach: (newSearch: string) =>
    set((state) => ({ ...state, search: newSearch })),
}));

interface WithdrawFilteringProps {
  isVisible: boolean;
  date: DateRange | string;
  status: DepositsStatus | string;
  method: PaymentMethod | string;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSeach: (search: string) => void;
  setFilter: ({
    date,
    status,
    method,
  }: {
    date?: DateRange;
    status?: DepositsStatus | string;
    method?: PaymentMethod | string;
  }) => void;
  setToggleVisible: () => void;
  clearState: () => void;
}

export const useWithdrawReqFilter = create<WithdrawFilteringProps>((set) => ({
  isVisible: false,
  date: "",
  method: "",
  status: "",
  setFilter: ({ status, date, method }) =>
    set((stata) => {
      const newState: typeof stata = { ...stata };
      newState.status = status == "" ? status! : status! || stata.status;
      if (date) {
        newState.date = date;
      }
      if (method) {
        newState.method = method;
      }

      return newState;
    }),
  setToggleVisible: () =>
    set((state) => ({ ...state, isVisible: !state.isVisible })),
  clearState: () =>
    set((state) => ({ ...state, date: "", method: "", status: "" })),
  page: 1,
  search: "",
  setPage: (newPage: number) => set((state) => ({ ...state, page: newPage })),
  setSeach: (newSearch: string) =>
    set((state) => ({ ...state, search: newSearch })),
}));

interface TabMenuSelectProps {
  path: "HOME" | "SPORTS" | "GAMES" | "MYBETS" | "WALLET";
  setPath: (payh: "HOME" | "SPORTS" | "GAMES" | "MYBETS" | "WALLET") => void;
}
export const useTabMenuSelect = create<TabMenuSelectProps>((set) => ({
  path: "HOME",
  setPath: (newPath) => set(() => ({ path: newPath })),
}));

interface CrickeEvent {
  event: string;
  setEvent: (matceventhStatus: string) => void;
}

export const useCrickeEvent = create<CrickeEvent>((set) => ({
  event: "all",
  setEvent: (event) => set(() => ({ event })),
}));

export enum SlotGameState {
  INACTIVE = "inactive",
  ACTIVE = "active",
  LOST = "lost",
  WIN = "win",
}

interface SlotState {
  start: number;
  end: number;
  winnerSlot?: number;
  selectedSlot?: number;
  validsSlots?: number[];
}
interface SlotGameProps {
  betAmount: number;
  profitAmount: number;
  gameState: SlotGameState;
  slotState: SlotState;
  wallet: number;
  prevSlotState: SlotState[];

  setBetAmount: (betAmount: number) => void;
  setProfitAmount: (profitAmount: number) => void;
  setGamState: (gameState: SlotGameState) => void;
  setSlotState: (slotState: {
    start: number;
    end: number;
    winingSlot?: number;
    selectedSlot?: number;
  }) => void;
  setPrevSlotState: (prevSlotState?: SlotState) => void;
  setWallet: (wallet: number) => void;
  resetGame: () => void;
}

export const useSlot = create<SlotGameProps>((set) => ({
  betAmount: 0,
  profitAmount: 0,
  gameState: SlotGameState.INACTIVE,
  slotState: {
    start: 12,
    end: 15,
  },
  wallet: 0,
  prevSlotState: [],

  setBetAmount: (betAmount) => set((state) => ({ ...state, betAmount })),
  setGamState: (gameState) => set((state) => ({ ...state, gameState })),
  setSlotState: (slotState) => set((state) => ({ ...state, slotState })),
  setPrevSlotState: (prevSlotState) =>
    set((state) => ({
      ...state,
      prevSlotState: prevSlotState
        ? [...state.prevSlotState, prevSlotState]
        : [],
    })),
  setProfitAmount: (profitAmount) =>
    set((state) => ({ ...state, profitAmount })),

  setWallet: (wallet) => set((state) => ({ ...state, wallet })),
  resetGame: () => {
    setTimeout(() => {
      set((state) => ({
        ...state,
        betAmount: 0,
        profitAmount: 0,
        gameState: SlotGameState.INACTIVE,
        slotState: { start: 12, end: 15 },
        prevSlotState: [],
      }));
    }, 5000);
  },
}));

interface WheelProps {
  wallet: number;
  betAmount: number;
  setWallet: (wallet: number) => void;
  setBetAmount: (betAmount: number) => void;
}

export const useWheel = create<WheelProps>((set) => ({
  wallet: 0,
  betAmount: 0,
  setWallet: (wallet) => set((state) => ({ ...state, wallet })),
  setBetAmount: (betAmount) => set((state) => ({ ...state, betAmount })),
}));

interface UsersFilterProps {
  page: number;
  search: string;
  status: UserStatus | string;

  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatus: (status: UserStatus | string) => void;
}

export const useUsersFilter = create<UsersFilterProps>((set) => ({
  page: 1,
  search: "",
  status: "",

  setPage: (page) => set((state) => ({ ...state, page })),
  setSearch: (search) => set((state) => ({ ...state, search })),
  setStatus: (status) => set((state) => ({ ...state, status })),
}));

interface TossProps {
  wallet: number;
  betAmount: number;
  selectedCoin: Coin | null;
  setSelectedCoin: (selectedCoin: Coin) => void;
  setWallet: (wallet: number) => void;
  setBetAmount: (betAmount: number) => void;
}
export const useToss = create<TossProps>((set) => ({
  wallet: 0,
  betAmount: 0,
  selectedCoin: null,
  setWallet: (wallet) => set((state) => ({ ...state, wallet })),
  setBetAmount: (betAmount) => set((state) => ({ ...state, betAmount })),
  setSelectedCoin: (selectedCoin) =>
    set((state) => ({ ...state, selectedCoin })),
}));

interface DiceProps {
  wallet: number;
  betAmount: number;
  setWallet: (wallet: number) => void;
  setBetAmount: (betAmount: number) => void;
}
export const useDice = create<DiceProps>((set) => ({
  wallet: 0,
  betAmount: 0,
  setWallet: (wallet) => set((state) => ({ ...state, wallet })),
  setBetAmount: (betAmount) => set((state) => ({ ...state, betAmount })),
}));

export const useLottery = create<{
  totalParticipation: number;
  setTotalParticipation: (totalParticipation: number) => void;
}>((set) => ({
  totalParticipation: 0,
  setTotalParticipation: (totalParticipation) =>
    set((state) => ({ ...state, totalParticipation })),
}));
