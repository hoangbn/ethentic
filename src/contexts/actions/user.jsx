export const setUserSession = async (updateState, state, args) => {
    await updateState({ userSession: args.userSession });
};

export const setUserInfo = async (updateState, state, args) => {
    await updateState({ userInfo: args.userInfo });
};
