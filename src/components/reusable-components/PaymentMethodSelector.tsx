import React from 'react';
import { SegmentedControl } from '@mantine/core';
import { IconCash, IconCreditCard } from '@tabler/icons-react';

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ value, onChange }) => (
  <SegmentedControl
    value={value}
    onChange={onChange}
    data={[
      { label: <><IconCash size={14} /> Cash On Delivery</>, value: "COD" },
      { label: <><IconCreditCard size={14} /> Card Payment</>, value: "Card Payment" },
    ]}
  />
);

export default PaymentMethodSelector;
