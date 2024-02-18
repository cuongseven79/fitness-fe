import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import './manage-customer.css';
import { getMyCustomers } from "../../api/customerService";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false)
  const userSession = JSON.parse(sessionStorage.getItem('user'));
  const userListColumn = [
    { title: "Customer Name", dataIndex: "displayName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Age", dataIndex: "age" },
    { title: "Phone Number", dataIndex: "phoneNumber" },
    { title: "Start-time", dataIndex: "startTime" },
    { title: "End-time", dataIndex: "endTime" },
  ];

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { statusCode, customersData } = await getMyCustomers(userSession.userId);
      if (statusCode === 200) {
        setCustomers(customersData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [userSession.userId])

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className="container">
      <h1 className='text-[#FFB116] pb-5 text-[30px] font-semibold uppercase'>Manage customers</h1>
      <Table
        rowKey={"id"}
        columns={userListColumn}
        dataSource={customers}
        bordered={true}
        loading={loading}
        pagination={{
          showTotal: (total) => `Total ${total} Items`,
          total: customers?.length,
          style: { color: "#E2B43F" },
        }}
      />
    </section>
  );
};

export default ManageCustomers;