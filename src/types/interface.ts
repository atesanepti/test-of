import {
  DepositsStatus,
  BetResult,
  PaymentMethod,
  Prisma,
  WithdrawsStatus,
} from "@prisma/client";
import { DateRange, UserStatus } from "./enum";

/**
 * Props for Email Template
 */
export interface TemplateProps {
  name?: string;
  redirectURL?: string;
  token?: string;
}

export interface CreatePaymentGateway {
  method: PaymentMethod;
  pay_to: string[];
  isActive: boolean;
}

export interface UpdatePaymentGetway {
  method?: PaymentMethod;
  pay_to?: string[];
  depositRules?: string[];
  withdrawRules?: string[];
  isActive?: boolean;
}

export interface CreateDeposit {
  amount: number;
  transactionId: string;
  gatewayId: string;
  walletNumber: string;
}

export interface FetchDepositsFilter {
  filter: {
    status: DepositsStatus | string;
    method: PaymentMethod | string;
    date: string;
  };
}

export interface UpdateDepositStatus {
  status: DepositsStatus;
}
export interface UpdateWithdrawStatus {
  status: WithdrawsStatus;
}

export type ApiResponse = {
  success: boolean;
  message: string;
};

export interface FetchQueryError {
  data: ApiResponse;
  status: 500;
}

export interface CreateWithdraw {
  amount: number;
  pay_to: string;
  gateway_id: string;
}

export interface FetchDataInput {
  page: number;
  search: string;
  status: DepositsStatus | string;
  method: PaymentMethod | string;
  date: DateRange | string;
}

export interface WalletFetchPayload {
  mainWallet: Prisma.walletGetPayload<object>;
  bonusWallet: Prisma.walletGetPayload<object>;
}

export interface BetUpdateInput {
  operation: "INCREMENT" | "DECREMENT";
  amount: number;
  accountType?: "MAIN" | "BONUS";
}

export interface MultiplierHistoryInput {
  multiplier: number;
  base_amount: number;
  result: BetResult;
  profit?: number;
}

export interface DashboardStictisPayload {
  payload: {
    totalUsers: number;
    totalDespositsAmount: number;
    avgDespositsAmount: number;
    totalWithdrawAmount: number;
    avgWithdrawAmount: number;
    currentDespositAmount: number;
    netRevenue: number;
  };
}
export type DashboardStictis = ApiResponse & DashboardStictisPayload;

interface MonthlyTransactionStats {
  deposits: number;
  withdrawals: number;
}
type MonthNames =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type LastSixMonthsStats = Record<MonthNames, MonthlyTransactionStats>;

export type DashbordChartPayload = {
  payload: LastSixMonthsStats;
};

export type DashboardChart = ApiResponse & DashbordChartPayload;

export interface UsersFetchPayload {
  payload: {
    users: Prisma.usersGetPayload<object>[];
    totalFound: number;
    totalActiveUsersCount: number;
    totalBannedUsersCount: number;
  };
}

export type UsersFetchReturn = ApiResponse & UsersFetchPayload;

export interface FetchUsersInput {
  status: UserStatus | string;
  page: number;
  search: string;
}

interface UserFetchPayload {
  payload: {
    user: Prisma.usersGetPayload<{ include: { bonus: true; wallet: true } }>;
    totalWithdrawsAmount: number;
    totalDepositsAmount: number;
    currentWallet: number;
    profit: number;
  };
}

export type UserFetchReturn = ApiResponse & UserFetchPayload;

export interface FetchUserInput {
  id: string;
}

export interface UserUpdateInput {
  ban?: {
    status: "BAN" | "UNBAN";
  };

  walletTransfer?: boolean;
}

export interface SiteSettingInput {
  referBonus: number;
  depositBonusPercent: number;
  minDeposit: number;
  minWithdraw: number;
}

export interface SiteSettingPayload {
  payload: Prisma.siteSettingGetPayload<object>;
}

export type SiteSettingReturn = ApiResponse & SiteSettingPayload;

export type AgentsReturn = ApiResponse & {
  payload: Prisma.usersGetPayload<object>[];
};

export type UsersFAgetntFetchReturn = ApiResponse & {
  payload: Prisma.usersGetPayload<object>[];
};

export type LotteryTicketsReturn = ApiResponse & {
  payload: {
    tickets: Prisma.lotteryTicketsGetPayload<object>[];
    totalParticipation: number;
  };
};

export type LotteryTicketAdmiReturn = ApiResponse & {
  payload: {
    tickets: Prisma.lotteryTicketsGetPayload<object>[];
    totalCollection: number;
    totalParticipation: number;
  };
};

export interface LotteryResultInput {
  id: string;
  prize: number;
}

export type ContactInfoReturn = ApiResponse & {
  payload: Prisma.contactGetPayload<object>;
};

export interface ContactInfoCreate {
  whatsapp?: string;
  facebook?: string;
  telegram?: string;
}

export type SiteUpdateReturn = ApiResponse & {
  payload: Prisma.siteUpdateGetPayload<object>;
};

interface SectionTitle {
  casino_game: string;
  aviator_game: string;
  lottery: string;
  about_us: string;
  our_sponsore: string;
  content: string;
  navigation: string;
  Contacet: string;
}

interface SectionContent {
  aviator: string;
  content: {
    list: {
      live_sports: string;
      live_odds: string;
      casino_game: string;
      lucky_draw: string;
      gibway: string;
      refer_bonus: string;
      deposit_bonus: string;
      aviator: string;
      crash_game: string;
    };
  };
  navigation: {
    list: {
      lottery: string;
      sports: string;
      games: string;
    };
  };
  about_us: {
    list: {
      item: {
        h: string;
        p: string;
      }[];
    };
  };
  prizes: {
    "100000_taka": string;
    iphone: string;
    mac_book: string;
    apple_watch: string;
    "50000_taka": string;
  };
}

interface Footer {
  copyright: string;
}

interface Action {
  play: string;
  spand: string;
}

export interface Text {
  section_title: SectionTitle;
  section_content: SectionContent;
  footer: Footer;
  action: Action;
}

export interface SiteInfoInput {
  message?: string;
}

export type SiteInfoReturn = ApiResponse & { payload: Prisma.InfoGetPayload<object> };
