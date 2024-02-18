import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "antd";
import { getUsers } from "../../api/userService";
import './manage-user.css';

const FilterButton = ({ role, selectedFilter, filterUsers }) => (
  <Button
    className="uppercase"
    onClick={() => filterUsers(role)}
    type="primary"
    style={{ backgroundColor: selectedFilter === role ? "blue" : "#3281F7" }}
  >
    {role.charAt(0).toUpperCase() + role.slice(1)}
  </Button>
);

const ManageUsers = () => {
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(false)

  const userListColumn = [
    { title: "DisplayName", dataIndex: "displayName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Age", dataIndex: "age" },
    { title: "Phone Number", dataIndex: "phoneNumber" },
    { title: "Role", dataIndex: "role" },
    { title: "Start-time", dataIndex: "startTime" },
    { title: "End-time", dataIndex: "endTime" },
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { users } = await getUsers("/manage-users");
      setUserList(users);
      setFilteredList(users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = (role) => {
    setSelectedFilter(role);
    setFilteredList(role === "all" ? userList : userList.filter((user) => user.role === role));
  }

  return (
    <section className="container">
      <h1 className='text-[#FFB116] text-[30px] font-semibold uppercase'>Manage Users</h1>
      <Row className="my-6 w-1/6 flex justify-evenly" >
        {["all", "pt", "customer"].map(role => (
          <FilterButton key={role} role={role} selectedFilter={selectedFilter} filterUsers={filterUsers} />
        ))}
      </Row>
      <Table
        rowKey={"id"}
        columns={userListColumn}
        dataSource={filteredList}
        bordered={true}
        loading={loading}
        pagination={{
          showTotal: (total) => `Total ${total} Items`,
          total: filteredList.length,
          style: { color: "#E2B43F" },
        }}
      />
    </section>
  );
};

export default ManageUsers;