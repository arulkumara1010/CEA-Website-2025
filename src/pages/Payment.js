import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';

const UPIPayment = ({ amount, paymentType, onSuccess, onCancel }) => {
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast.error('Please enter the transaction ID');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would add your API call to verify the transaction
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Payment verified successfully!');
      onSuccess(transactionId);
      navigate('/portal/event');
    } catch (error) {
      toast.error('Failed to verify transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Complete Your Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Amount to Pay: ₹{amount}</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img 
              src="/api/placeholder/200/200"
              alt="UPI QR Code"
              className="mx-auto mb-4"
            />
            <p className="text-sm text-gray-600">Scan QR code using any UPI app</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your UPI transaction ID"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Payment'}
            </button>
          </div>
        </form>

        <div className="text-sm text-gray-500">
          <p>* Please make sure to keep the transaction ID safe</p>
          <p>* Payment verification might take a few minutes</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UPIPayment;
