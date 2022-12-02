import { useCallback} from 'react'
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from '../../hooks';
import { cryptoData, currentPage, explorerLink, footballData, gasLessToggle, generalData, KeyValueType, MatchData, matchData, questionAddresses, questionBetDataMapping, QuestionBetDataMapping, questionMapping, QuestionMapping, setCryptoData, setCurrentPage, setExplorerLink, setFootballData, setGasLessToggle, setGeneralData, setMatchData, setQuestionAddresses, setQuestionBetDataMapping, setQuestionMapping, setTeamLogos, setUserBetMapping, setUserBets, teamLogos, UserBet, userBetMapping, UserBetMapping, userBets } from './slice';

export function useMatchData(): [MatchData[] | undefined, (newMatchData:MatchData[] | undefined) => void] {

    const currentMatchData = useSelector(matchData)
    const dispatch = useDispatch()

    const setmatchData = useCallback((newMatchData: MatchData[] | undefined) => dispatch(setMatchData(newMatchData)),[dispatch])

    return [currentMatchData, setmatchData]
}

export function useFootballData(): [MatchData[] | undefined, (newMatchData:MatchData[] | undefined) => void] {

    const currentMatchData = useSelector(footballData)
    const dispatch = useDispatch()

    const setmatchData = useCallback((newMatchData: MatchData[] | undefined) => dispatch(setFootballData(newMatchData)),[dispatch])

    return [currentMatchData, setmatchData]
}

export function useGeneralData(): [MatchData[] | undefined, (newMatchData:MatchData[] | undefined) => void] {

    const currentMatchData = useSelector(generalData)
    const dispatch = useDispatch()

    const setmatchData = useCallback((newMatchData: MatchData[] | undefined) => dispatch(setGeneralData(newMatchData)),[dispatch])

    return [currentMatchData, setmatchData]
}

export function useCryptoData(): [MatchData[] | undefined, (newMatchData:MatchData[] | undefined) => void] {

    const currentMatchData = useSelector(cryptoData)
    const dispatch = useDispatch()

    const setmatchData = useCallback((newMatchData: MatchData[] | undefined) => dispatch(setCryptoData(newMatchData)),[dispatch])

    return [currentMatchData, setmatchData]
}

export function useQuestionAddresses(): [KeyValueType | undefined, (newQuestionAddresses:KeyValueType | undefined) => void] {

    const currentQuestionAddresses = useSelector(questionAddresses)
    const dispatch = useDispatch()

    const setCurrentQuestionAddresses = useCallback((newQuestionAddresses: KeyValueType | undefined) => dispatch(setQuestionAddresses(newQuestionAddresses)),[dispatch])

    return [currentQuestionAddresses, setCurrentQuestionAddresses]
}

export function useTeamLogos(): [KeyValueType | undefined, (newTeamLogos:KeyValueType | undefined) => void] {

    const currentTeamLogos = useSelector(teamLogos)
    const dispatch = useDispatch()

    const setCurrentTeamLogos = useCallback((newTeamLogos: KeyValueType | undefined) => dispatch(setTeamLogos(newTeamLogos)),[dispatch])

    return [currentTeamLogos, setCurrentTeamLogos]
}

export function useQuestionMapping(): [QuestionMapping | undefined, (newQuestionMapping:QuestionMapping | undefined) => void] {

    const currentQuestionMapping = useSelector(questionMapping)
    const dispatch = useDispatch()

    const setCurrentQuestionMapping = useCallback((newQuestionMapping: QuestionMapping | undefined) => dispatch(setQuestionMapping(newQuestionMapping)),[dispatch])

    return [currentQuestionMapping, setCurrentQuestionMapping]
}

export function useQuestionBetDataMapping(): [QuestionBetDataMapping | undefined, (newQuestionBetDataMapping:QuestionBetDataMapping | undefined) => void] {

    const currentQuestionBetDataMapping = useSelector(questionBetDataMapping)
    const dispatch = useDispatch()

    const setCurrentquestionBetDataMapping = useCallback((newQuestionBetDataMapping: QuestionBetDataMapping | undefined) => dispatch(setQuestionBetDataMapping(newQuestionBetDataMapping)),[dispatch])

    return [currentQuestionBetDataMapping, setCurrentquestionBetDataMapping]
}

export function useUserBets(): [UserBet[] | undefined, (newUserBet:UserBet[]  | undefined) => void] {

    const currentUserBets = useSelector(userBets)
    const dispatch = useDispatch()

    const setCurrentUserBets = useCallback((newUserBets: UserBet[]  | undefined) => dispatch(setUserBets(newUserBets)),[dispatch])

    return [currentUserBets, setCurrentUserBets]
}

export function useUserBetsMapping(): [UserBetMapping | undefined, (newUserBetMapping:UserBetMapping | undefined) => void] {

    const currentUserBetMapping = useSelector(userBetMapping)
    const dispatch = useDispatch()

    const setCurrentUserBetMapping = useCallback((newUserBetMapping: UserBetMapping | undefined) => dispatch(setUserBetMapping(newUserBetMapping)),[dispatch])

    return [currentUserBetMapping, setCurrentUserBetMapping]
}

export function useExplorerLink(): [string, (newExplorerLink:string) => void] {

    const currentExplorerLink = useSelector(explorerLink)
    const dispatch = useDispatch()

    const setCurrentExplorerLink = useCallback((newExplorerLink: string) => dispatch(setExplorerLink(newExplorerLink)),[dispatch])

    return [currentExplorerLink, setCurrentExplorerLink]
}
export function useCurrentPage(): [string, (currentPage:string) => void] {

    const currentCurrentPage = useSelector(currentPage)
    const dispatch = useDispatch()

    const setCurrentCurrentPage = useCallback((newCurrentPage: string) => dispatch(setCurrentPage(newCurrentPage)),[dispatch])

    return [currentCurrentPage, setCurrentCurrentPage]
}

export function useGasLessToggle(): [boolean, (newGasLessToggle:boolean) => void] {

    const currentGasLessToggle = useSelector(gasLessToggle)
    const dispatch = useDispatch()

    const setCurrentGasLessToggle = useCallback((newGasLessToggle: boolean) => dispatch(setGasLessToggle(newGasLessToggle)),[dispatch])

    return [currentGasLessToggle, setCurrentGasLessToggle]
}