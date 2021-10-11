export const generateId = () => Math.random().toString(36).substr(2, 9)

export const setRejected = (state: any, action: any) => {
    state.error = action.payload
    state.isLoading = false
}
