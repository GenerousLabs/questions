import { State } from "./Questions.reducer"

const KEY_PREFIX = "__questions_"

const empty: State = {
  instances: [],
}

export default (slug: string) => {
  const key = `${KEY_PREFIX}${slug}`

  const get = (): State => {
    if (window && window.localStorage) {
      const maybeJson = localStorage.getItem(key)
      if (typeof maybeJson === "string") {
        return JSON.parse(maybeJson) as State
      }
    }
    return empty
  }

  const save = (state: State): void => {
    localStorage.setItem(key, JSON.stringify(state))
  }

  return { get, save }
}
