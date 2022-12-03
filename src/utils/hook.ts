import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import {
  answerAtom,
  connectedAtom,
  currentWordAtom,
  resultsAtom,
  websocketAtom,
} from "@/utils/atom";
import { Message, messageType, Result } from "@/utils/type";
import { wordCheck } from "./util";

export const useSetWebsocketEventHandler = () => {};
