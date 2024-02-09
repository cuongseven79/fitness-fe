import React, { useCallback, useEffect, useState } from "react";
import { Button, Popconfirm, Rate, Table } from "antd";
import './manage-coach.css';
import { getMyCoaches, updateRating } from "../../api/coachService";
import { message } from 'antd';

const ManageCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openRate, setOpenRate] = useState(false)
    const [newRating, setNewRating] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();


    const userSession = JSON.parse(sessionStorage.getItem('user'));
    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;

    const successMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Thanks you to our services!',
            duration: 3,
            style: { position: "relative", top: 70 }
        });
    };
    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Failed to update rating. Please try again.',
            duration: 2,
            style: { position: "relative", top: 70 }
        });
    };

    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const userListColumn = [
        { title: "Coach Name", dataIndex: "displayName" },
        { title: "Gender", dataIndex: "gender" },
        { title: "Birthday", dataIndex: "birthday" },
        { title: "Phone Number", dataIndex: "phoneNumber" },
        { title: "Field", dataIndex: "field" },
        { title: "Start-time", dataIndex: "startTime" },
        { title: "End-time", dataIndex: "endTime", },
        {
            title: "Rating",
            render: (_, record) => {
                const isRatingVisible = userSession?.rating !== true && currentDate == record.endTime;
                return (
                    <div className={isRatingVisible ? "" : "hidden"}>
                        <Button className={!openRate ? "bg-blue-500 text-white" : "hidden"} shape="round" onClick={() => setOpenRate((prev) => !prev)}>Rating to me</Button>
                        <Popconfirm title="Are you sure?" okText="Sure" okType="dashed" onCancel={() => setNewRating(0)} onConfirm={() => handleRating(record)} >
                            <Rate className={openRate ? "" : "hidden"} tooltips={desc} onChange={(rating) => setNewRating(rating)} value={newRating} />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    const handleRating = async (record) => { // handle updating and delete record coach
        const { statusCode } = await updateRating(newRating, record.coachId, userSession?.userId);
        if (statusCode === 200) {
            window.location.reload()
            successMessage();
        }
        else {
            errorMessage();
        }
        setNewRating(0);
    }

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const { statusCode, coachesData } = await getMyCoaches(userSession.userId);
            console.log("coachesData", coachesData)
            if (statusCode === 200) {
                setCoaches(coachesData);
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
            <h1 className='text-[#FFB116] pb-5 text-[30px] font-semibold uppercase'>Manage Coaches</h1>
            <Table
                rowKey={"id"}
                columns={userListColumn}
                dataSource={coaches}
                bordered={true}
                loading={loading}
                scroll={{ x: 140 }}
                pagination={{
                    showTotal: (total) => `Total ${total} Items`,
                    total: coaches?.length,
                    style: { color: "#E2B43F" },
                }}
            />
            {contextHolder}
        </section>
    );
};

export default ManageCoaches;