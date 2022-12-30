import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  isVisibleOnMobile: false,
};

export const ModalContext = createContext(INITIAL_STATE);

const ModalReducer = (state, action) => {
  switch (action.type) {
    case "openModal": {
      return {
        ...state,
        isVisibleOnMobile: true,
      };
    }
    case "closeModal": {
      return {
        ...state,
        isVisibleOnMobile: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const ModalContextProvider = ({ children }) => {
  const [modalCtx, modalDispatch] = useReducer(ModalReducer, INITIAL_STATE);

  return (
    <ModalContext.Provider value={{ modalCtx, modalDispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
