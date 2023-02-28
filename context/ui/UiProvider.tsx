import { useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
    isMenuOpen: boolean;
}

// useReducer utiliza este INITAL STATE
const UI_INITAL_STATE: UiState = {
    isMenuOpen: false,
};

export const UiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: "[UI] - ToggleMenu" });
    };

    return (
        <UiContext.Provider
            value={{
                ...state,

                // Methods
                toggleSideMenu,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};
