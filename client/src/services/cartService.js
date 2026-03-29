
const CART_KEY = 'flowers_shop_cart';

export const cartService = {
  getCart: () => {
    const cartStr = localStorage.getItem(CART_KEY);
    return cartStr ? JSON.parse(cartStr) : { items: [], total: 0 };
  },

  addItem: (item) => {
    const cart = cartService.getCart();
    const existingItemIndex = cart.items.findIndex(
      i => i.id === item.id && i.type === item.type
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity || 1;
    } else {
      cart.items.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }

    cart.total = cartService.calculateTotal(cart.items);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  },

  updateQuantity: (itemId, quantity) => {
    const cart = cartService.getCart();
    const itemIndex = cart.items.findIndex(i => i.id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    cart.total = cartService.calculateTotal(cart.items);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  },

  removeItem: (itemId) => {
    const cart = cartService.getCart();
    cart.items = cart.items.filter(i => i.id !== itemId);
    cart.total = cartService.calculateTotal(cart.items);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return cart;
  },

  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    return { items: [], total: 0 };
  },

  calculateTotal: (items) => {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  },

  getItemCount: () => {
    const cart = cartService.getCart();
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  },
};

export default cartService;
