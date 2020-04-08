export type Instance = {
  name: string
  startDate: string
}

export type State = {
  instances: Instance[]
}

export type InitAction = {
  type: "INIT"
  payload: State
}

export type CreateInstanceAction = {
  type: "CREATE_INSTANCE"
  payload: { name: string; startDate: string }
}

export type RemoveInstanceAction = {
  type: "REMOVE_INSTANCE"
  payload: { name: string }
}

export type SetInstanceDate = {
  type: "SET_INSTANCE_DATE"
  payload: { name: string; startDate: string }
}

export type Action =
  | InitAction
  | CreateInstanceAction
  | RemoveInstanceAction
  | SetInstanceDate

export const findInstance = (
  instances: Instance[],
  targetName: string
): Instance | undefined => {
  return instances.find(({ name }) => name === targetName)
}

export const reducer = (state: State, action: Action) => {
  const { instances } = state
  switch (action.type) {
    case "INIT": {
      return action.payload
    }

    case "CREATE_INSTANCE": {
      // Firstly, check this does not already exist
      if (findInstance(instances, action.payload.name)) {
        alert("Cannot save same name twice #ydPw3Q")
        return state
      }
      return {
        ...state,
        instances: instances.concat(action.payload),
      }
    }

    case "REMOVE_INSTANCE": {
      if (typeof findInstance(instances, action.payload.name) === "undefined") {
        alert("Cannot find instance to remove #p9gQ3t")
        return state
      }
      return {
        ...state,
        instances: instances.filter(({ name }) => name !== action.payload.name),
      }
    }

    case "SET_INSTANCE_DATE": {
      if (typeof findInstance(instances, action.payload.name) === "undefined") {
        alert("Cannot find instance to set date #FO9Kdk")
        return state
      }

      return {
        ...state,
        instances: instances.map(instance =>
          instance.name === action.payload.name
            ? { ...action.payload }
            : instance
        ),
      }
    }
  }

  return state
}
