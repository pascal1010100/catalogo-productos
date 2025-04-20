import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, 'El email es requerido'],
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  products: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true
    },
    quantity: { 
      type: Number, 
      required: true,
      min: [1, 'La cantidad mínima es 1']
    },
    price: { 
      type: Number, 
      required: true,
      min: [0, 'El precio no puede ser negativo']
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
