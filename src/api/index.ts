import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chatapi/chat-pet-medical',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/chatapi/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  return post<T>({
    url: '/chatapi/chat-pet-medical',
    data: { prompt: params.prompt, options: params.options },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/chatapi/session',
  })
}

// export function fetchVerify<T>(token: string) {
//   return post<T>({
//     url: '/userapi/api/token',
//     data: { token },
//   })
// }

export function fetchVerify<T = any>(
  data: {
    username: string
    password: string
  },
) {
  return post<T>({
    url: '/loginapi/api/chat/login/',
    data,
  })
}

export function saveChatLog<T = any>(
  data: {
    user_id: number
    message_id: string
    app_id: number
    chat_log: string
    ip: string
  },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chatapi/chat_logs',
    data,
    signal,
  })
}
