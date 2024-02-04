import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getOrder } from '../../api/orderService';
import './orderManagement.css';
import loadingGIF from "../../images/loading.gif";

const formatDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const ManageOrders = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    if (loading) return;

    const filterStartDate = startDate ? startDate.getTime() / 1000 : null;
    const filterEndDate = endDate ? endDate.getTime() / 1000 : null;

    try {
      setLoading(true);
      const { statusCode, ordersData } = await getOrder();
      if (ordersData && statusCode === 200) {
        const sortedOrders = ordersData.sort((a, b) => a.date._seconds - b.date._seconds);
        setAllOrders(sortedOrders);
        setFilteredOrders(sortedOrders.filter(order => {
          const orderTimestamp = order.date._seconds;
          if (filterStartDate && orderTimestamp < filterStartDate) return false;
          if (filterEndDate && orderTimestamp > filterEndDate) return false;
          return true;
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredOrders(allOrders);
    setCurrentPage(1);
  };

  useEffect(() => {
    document.title = 'Manage Orders';
    handleFilter();
  }, []);

  const totalMoney = filteredOrders.reduce((total, order) => total + parseFloat(order.paid_money), 0);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = page => setCurrentPage(page);

  return (
    <section>
      <span className='manage_order_title'>Manage Orders</span>
      <div className="container">
        <div className="date-filter">
          <div className="margin-right-50">
            <label>From: </label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className='font-sans cursor-pointer'
            />
          </div>
          <div className="margin-right-50">
            <label>To: </label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className='font-sans cursor-pointer'
            />
          </div>
          <div className='px-3 gap-6'>
            <button className="mr-3 rounded-lg py-2 px-6 text-white bg-[#3281F7] hover:bg-blue-600" onClick={handleFilter}>Filter</button>
            <button className="rounded-lg py-2 px-6 text-white bg-[#9da9bb] hover:bg-[#5a5e64]" onClick={handleResetFilter}>Reset</button>
          </div>
        </div>
        <div className="total-money">
          <p>Total Money: <span className="total-amount">${totalMoney.toFixed()}</span></p>
        </div>
        {loading && (
          <div className="loading-container">
            <img src={loadingGIF} alt="Loading" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto' }} />
          </div>
        )}
        {!loading && (
          <>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Display Name</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Service Type</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Paid Money</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order.orderId}>
                    <td>{startIndex + index + 1}</td>
                    <td>{order.displayName}</td>
                    <td>{formatDate(order.date._seconds)}</td>
                    <td>{order.orderId}</td>
                    <td>{order.service_type}</td>
                    <td>{formatDate(order.start_time._seconds)}</td>
                    <td>{formatDate(order.end_time._seconds)}</td>
                    <td>{order.paid_money}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {visiblePageNumbers.map(pageNumber => (
                <button
                  key={pageNumber}
                  className={`pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ManageOrders;