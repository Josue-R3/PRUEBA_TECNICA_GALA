import React, { useContext, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import CartContext from '../../context/CartContext';
import { TiShoppingCart } from 'react-icons/ti';
import { Tool } from '@/types/tools';
import confetti from 'canvas-confetti';

const CartModal: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { state, dispatch } = useContext(CartContext);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleRemoveFromCart = (toolId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: toolId });
  };

  const handlePurchase = () => {
    confetti();
    setShowCongrats(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.items.reduce((acc, item) => acc + item.tool.price * item.quantity, 0);
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="relative">
        <Button isIconOnly variant="light" className="hover:bg-white text-[#FEC300] hover:text-black" onPress={() => {onOpen(); console.log('Opening modal');}}>
          <TiShoppingCart className="w-6 h-6" />
        </Button>
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {itemCount}
          </span>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              {showCongrats ? (
                <>
                  <ModalHeader className="flex flex-col gap-1">¡Felicidades por su Compra!</ModalHeader>
                  <ModalBody>
                    <p>Gracias por su compra. Su pedido está en camino.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={() => {
                      setShowCongrats(false);
                      onClose();
                    }}>
                      Cerrar
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">Carrito de Compras</ModalHeader>
                  <ModalBody>
                    {state.items.length > 0 ? (
                      <div className="w-full">
                        <div className="grid grid-cols-12 gap-4 mb-2 font-semibold">
                          <div className="col-span-2 text-center">Cant</div>
                          <div className="col-span-6">Descripción</div>
                          <div className="col-span-2 text-right">Precio</div>
                          <div className="col-span-2 text-right"></div>
                        </div>
                        {state.items.map(({ tool, quantity }) => (
                          <div key={tool.id} className="grid grid-cols-12 gap-4 items-center my-2">
                            <div className="col-span-2 text-center">{quantity}</div>
                            <div className="col-span-6">
                              <p className="font-semibold">{tool.name}</p>
                            </div>
                            <div className="col-span-2 text-right">
                              <p className="text-gray-500">${(tool.price * quantity).toFixed(2)}</p>
                            </div>
                            <div className="col-span-2 text-right">
                              <Button color="danger" variant="light" onClick={() => handleRemoveFromCart(tool.id)}>
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No hay productos en el carrito</p>
                    )}
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-bold">Total</p>
                      <p className="font-bold">${total.toFixed(2)}</p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" onClick={handlePurchase}>
                      Comprar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CartModal;
