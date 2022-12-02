import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../";

export interface QuestionData {
  question_no: string;
  question_id: string;
  match_no: string;
  match_id: string;
  question: string;
  options: string[];
  option_na: string;
  stats: string;
  category: string;
  sub_category: string;
  match: string;
  tournament: string;
  question_show_start_time: string;
  bid_start_time: string;
  bid_end_time: string;
  question_show_end_time: string;
  team_a: string;
  team_b: string;
  team_a_code: string;
  team_b_code: string;
  final_result: string;
}

export interface MatchData {
  match: any;
  match_id: string;
  question_show_start_time: string;
  bid_start_time: string;
  bid_end_time: string;
  question_show_end_time: string;
  questions: QuestionData[];
}

export interface QuestionBetData {
  id: string;
  ABetAmount: string;
  BBetAmount: string;
  totalAmount: string;
}

export interface UserBet {
  amount: string;
  claimed: boolean;
  position: string;
  question: {
    ABetAmount: string;
    BBetAmount: string;
    ended: boolean;
    id: string;
    position: string | null;
    totalAmount: string;
  };
}

export interface KeyValueType {
  [key: string]: string;
}

export interface QuestionMapping {
  [key: string]: QuestionData;
}

export interface QuestionBetDataMapping {
  [key: string]: QuestionBetData;
}

export interface UserBetMapping {
  [key: string]: UserBet;
}

const GASLESS_TOGGLE = process.env.REACT_APP_GASLESS_TOGGLE as string;

interface QuestionState {
  matchData: MatchData[] | undefined;
  footballData: MatchData[] | undefined;
  generalData: MatchData[] | undefined;
  cryptoData: MatchData[] | undefined;
  questionAddresses:  KeyValueType | undefined;
  teamLogos:  KeyValueType | undefined;
  questionMapping: QuestionMapping | undefined;
  questionBetDataMapping : QuestionBetDataMapping | undefined
  userBets : UserBet[] | undefined;
  userBetMapping : UserBetMapping | undefined
  explorerLink: string;
  gasLessToggle: boolean;
  currentPage: string;
}

const initialState: QuestionState = {
  matchData: undefined,
  footballData: undefined,
  generalData: undefined,
  cryptoData: undefined,
  questionAddresses: undefined,
  teamLogos: undefined,
  questionMapping: undefined,
  questionBetDataMapping: undefined,
  userBets: [],
  userBetMapping: undefined,
  explorerLink:"",
  gasLessToggle: GASLESS_TOGGLE==='true'?true:false,
  currentPage: "40"
};

export const questions = createSlice({
  name: "question",
  initialState,
  reducers: {
    setMatchData: (state, action: PayloadAction<MatchData[] | undefined>) => {
      state.matchData = action.payload;
    },
    setFootballData: (state, action: PayloadAction<MatchData[] | undefined>) => {
      state.footballData = action.payload;
    },
    setGeneralData: (state, action: PayloadAction<MatchData[] | undefined>) => {
      state.generalData = action.payload;
    },
    setCryptoData: (state, action: PayloadAction<MatchData[] | undefined>) => {
      state.cryptoData = action.payload;
    },
    setQuestionAddresses: (state, action: PayloadAction<KeyValueType | undefined>) => {
      state.questionAddresses = action.payload;
    },
    setTeamLogos: (state, action: PayloadAction<KeyValueType | undefined>) => {
      state.teamLogos = action.payload;
    },
    setQuestionMapping: (state, action: PayloadAction<QuestionMapping | undefined>) => {
      state.questionMapping = action.payload;
    },
    setQuestionBetDataMapping: (state, action: PayloadAction<QuestionBetDataMapping | undefined>) => {
      state.questionBetDataMapping = action.payload;
    },
    setUserBets: (state, action: PayloadAction<UserBet[] | undefined>) => {
      state.userBets = action.payload;
    },
    setUserBetMapping: (state, action: PayloadAction<UserBetMapping | undefined>) => {
      state.userBetMapping = action.payload;
    },
    setExplorerLink: (state, action: PayloadAction<string>) => {
      state.explorerLink = action.payload;
    },
    setGasLessToggle: (state, action: PayloadAction<boolean>) => {
      state.gasLessToggle = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string>)=>{
      state.currentPage = action.payload;
    }
  },
});

export const { setMatchData,setFootballData,setGeneralData, setCryptoData, setQuestionAddresses, setTeamLogos, setQuestionMapping, setQuestionBetDataMapping,setUserBets
  ,setUserBetMapping, setExplorerLink, setGasLessToggle,setCurrentPage } = questions.actions;

export const matchData = (state: RootState) => state.questions.matchData;
export const footballData = (state: RootState) => state.questions.footballData;
export const generalData = (state: RootState) => state.questions.generalData;
export const cryptoData = (state: RootState) => state.questions.cryptoData;
export const questionAddresses = (state: RootState) => state.questions.questionAddresses;
export const teamLogos = (state: RootState) => state.questions.teamLogos;
export const questionMapping = (state: RootState) => state.questions.questionMapping;
export const questionBetDataMapping = (state: RootState) => state.questions.questionBetDataMapping;
export const userBets = (state: RootState) => state.questions.userBets;
export const userBetMapping = (state: RootState) => state.questions.userBetMapping;
export const explorerLink = (state: RootState) => state.questions.explorerLink;
export const gasLessToggle = (state: RootState) => state.questions.gasLessToggle;
export const currentPage = (state: RootState) => state.questions.currentPage;

export default questions.reducer;
