export const generateId = () => Math.random().toString(36).substr(2, 9)

export const defaultRejected = (state: any, action: any) => {
    console.log('da')
    state.error = action.payload
    state.isLoading = false
}

export const defaultPending = (state: any) => {
    console.log('da')
    state.error = null
    state.isLoading = true
}

export const defaultFulfilled = (state: any) => {
    console.log('da')
    state.isLoading = false
    state.isAuth = true
}

export const onEditObject = (object: { [key in string]: any }, key: string, value: any) => {
    object[key] = value
}
