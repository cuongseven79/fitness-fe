import React, { useEffect, useState } from "react";
import { Table } from "antd";
import './manage-coach.css';
import { getMyCoaches } from "../../api/trainerService";


const ManageCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(false)
    const userSession = JSON.parse(sessionStorage.getItem('user'));
    const userListColumn = [
        { title: "Coach Name", dataIndex: "displayName" },
        { title: "Gender", dataIndex: "gender" },
        { title: "Birthday", dataIndex: "birthday" },
        { title: "Phone Number", dataIndex: "phoneNumber" },
        { title: "Field", dataIndex: "field" },
        { title: "Start-time", dataIndex: "startTime" },
        { title: "End-time", dataIndex: "endTime" },
    ];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { statusCode, coachesData } = await getMyCoaches(userSession.userId);
            if (statusCode === 200) {
                setCoaches(coachesData);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section className="container">
            <h1 className='text-[#FFB116] pb-5 text-[30px] font-semibold uppercase'>Manage Coaches</h1>
            <Table
                rowKey={"id"}
                columns={userListColumn}
                dataSource={coaches}
                bordered={true}
                loading={loading}
                pagination={{
                    showTotal: (total) => `Total ${total} Items`,
                    total: coaches?.length,
                    style: { color: "#E2B43F" },
                }}
            />
        </section>
    );
};

export default ManageCoaches;