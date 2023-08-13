import { UseFetchOptions } from "nuxt/app"

export const useCustomFetch = <T = any>(path: string, options: UseFetchOptions<T> = {}) => {
    const config = useRuntimeConfig()

    return useFetch(path, {
        transform: (data: any) => data.drinks,
        ...options,
        baseURL: config.public.baseUrl
    })
}