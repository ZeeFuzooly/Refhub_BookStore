import React from 'react';
import { SegmentedControl } from "@mantine/core";
import { FaTh, FaTable } from 'react-icons/fa'; 
import { ViewToggleProps } from "../types/types";

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
    <SegmentedControl
      value={view}
      onChange={setView}
      data={[
        { label: <FaTh size={14} />, value: "card" },
        { label: <FaTable size={14} />, value: "table" },
      ]}
      fullWidth={false}
      style={{ width: 'auto' }} 
    />
  </div>
);

export default ViewToggle;
