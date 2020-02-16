import React, { Component } from "react";

export const GlobalContext = React.createContext({});

export const withGlobalContextProvider = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        updateState = (newState) => {
            return new Promise(resolve => {
                this.setState(
                    {
                        ...this.state,
                        ...newState
                    },
                    () => resolve(this.state)
                );
            });
        };

        dispatch = async (action, args) => {
            await action(this.updateState, this.state, args);
        };

        render() {
            return (
                <GlobalContext.Provider
                    value={{
                        updateState: this.updateState,
                        dispatch: this.dispatch,
                        state: this.state
                    }}
                >
                    <WrappedComponent {...this.props} />
                </GlobalContext.Provider>
            );
        }
    };
};

export const withGlobalContext = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <GlobalContext.Consumer>
                    {value => {
                        return <WrappedComponent globalContext={value} {...this.props} />;
                    }}
                </GlobalContext.Consumer>
            );
        }
    };
};
