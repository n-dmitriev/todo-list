export const generateId = () => Math.random().toString(36).substr(2, 9)

export const setRejected = (state: any, action: any) => {
    state.error = action.payload
    state.isLoading = false
}

export const onEditObject = (object: { [key in string]: any }, key: string, value: any) => {
    object[key] = value
}
