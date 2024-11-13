import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { validatePromoCode } from '../../../../store/slices/promoSlice';
import { Text, Input, Button } from '../../../../components/atoms';

const PromoCodeInput = ({ onApply }) => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApply = async () => {
    if (!promoCode.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await dispatch(validatePromoCode(promoCode)).unwrap();
      onApply(result);
      setPromoCode('');
    } catch (err) {
      setError(err.message || 'Kode promo tidak valid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Text variant="h2" className="text-xl font-bold mb-6">
        Kode Promo
      </Text>

      <div className="flex gap-4">
        <Input
          placeholder="Masukkan kode promo"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          error={error}
        />
        <Button
          variant="primary"
          onClick={handleApply}
          disabled={loading || !promoCode.trim()}
        >
          {loading ? 'Memproses...' : 'Gunakan'}
        </Button>
      </div>
    </div>
  );
};

PromoCodeInput.propTypes = {
  onApply: PropTypes.func.isRequired
};

export default PromoCodeInput; 