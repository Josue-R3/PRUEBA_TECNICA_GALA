import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { Tool } from '../types/tools';

interface CartItem {
  tool: Tool;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'SET_CART' | 'CLEAR_CART';
  payload?: Tool | number | CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.tool.id === (action.payload as Tool).id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.tool.id === (action.payload as Tool).id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { tool: action.payload as Tool, quantity: 1 }] };
    case 'REMOVE_FROM_CART':
      const updatedItems = state.items
        .map(item =>
          item.tool.id === (action.payload as number)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      return { ...state, items: updatedItems };
    case 'SET_CART':
      return { ...state, items: action.payload as CartItem[] };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(cartData) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
