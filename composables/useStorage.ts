export const useStorage = () => {
    const set = (key: string, value: string | object) => {
        const _value = isObj(value) ? JSON.stringify(value) : value
        localStorage.setItem(key, _value as string)
    }

    const get = (key: string): object | string | null => {
        const item = localStorage.getItem(key)

        return !!item ? JSON.parse(item) : item
    }

    const remove = (key: string) => {
        localStorage.removeItem(key)
    }

    const isObj = (value: string | object): boolean => {
        return typeof value === 'object'
    }

    return {
        set,
        get,
        remove
    }
}