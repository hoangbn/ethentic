export const setUserSession = async (updateState, state, args) => {
    await updateState({ userSession: args.userSession });
};
