import React, { useState } from 'react';

interface SearchOrdersProps {
  onSearch: (status: string) => void;
}

const SearchOrders: React.FC<SearchOrdersProps> = ({ onSearch }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const handleSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onSearch(status); 
  };

  return (
    <div className="search-orders">
      <label htmlFor="status-search">Filtrar por Status:</label>
      <select
        id="status-search"
        value={selectedStatus}
        onChange={handleSearchChange}
      >
        <option value="All">Todos</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default SearchOrders;
