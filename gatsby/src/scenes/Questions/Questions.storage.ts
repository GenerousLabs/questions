import { State } from "./Questions.reducer"

const KEY_PREFIX = "__questions_"

const empty: State = {
  instances: [],
}

export default (slug: string) => {
  const key = `${KEY_PREFIX}${slug}`

  const get = (): State => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      const maybeJson = window.localStorage.getItem(key)
      if (typeof maybeJson === "string") {
        return JSON.parse(maybeJson) as State
      }
    }
    return empty
  }

  const save = (state: State): void => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }

  return { get, save }
}
