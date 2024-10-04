function CartTotals({totalPrice,shippingCost,handleShippingChange}) {
    return (
        <div className="w-full lg:w-1/3 bg-white p-6 h-fit rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Cart totals</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping</p>
            <div>
              <label className="block">
                <input
                  type="radio"
                  name="shipping"
                  className="mr-2"
                  onChange={() => handleShippingChange(0)}
                />
                Free shipping
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="shipping"
                  className="mr-2"
                  onChange={() => handleShippingChange(10)}
                />
                Flat rate: $10.00
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="shipping"
                  className="mr-2"
                  onChange={() => handleShippingChange(5)}
                />
                Pickup: $5.00
              </label>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>${(totalPrice + shippingCost).toFixed(2)}</p>
          </div>
          <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors">
            Proceed to checkout
          </button>
        </div>
      </div>
    )
}

export default CartTotals