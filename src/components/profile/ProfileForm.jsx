import React, { useEffect, useState, memo } from "react";
import { updateProfile } from "../../api/profileService";
import { ptRole, userSession } from "../../utils/checkRole";
import { message, Button, Input, Form, InputNumber, Select } from 'antd';
import { useAuth } from "../../context/AuthContext";

export const ProfileForm = memo(({ profile, id, setDisabledSwitch }) => {
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const [loading, setLoading] = useState(false); // set loading button save when clicked
    const [disabledBtn, setDisableBtn] = useState(true); // disabled button save
    const { setCurrentUser } = useAuth();
    const [formData, setFormData] = useState({});


    /* Using: Handle form values change */
    useEffect(() => {
        form.validateFields().then(() => {
            setDisableBtn(false);

            //Biện pháp tạm thời để fix lỗi không active button status coach khi đã điền đủ thông tin
            if (profile.price) {
                setDisabledSwitch(false);
            }
        }).catch(() => {
            setDisableBtn(true);

            //Save lại để validation form data.
            setFormData(values);
        });
    }, [values]); //Form data
    const handleSubmit = async () => {
        setLoading(true);
        try {
            validFormValues(values);
            await updateProfile(values, id);
            setDisabledSwitch(false);


            //Set Form data lưu tạm vào state để set displayName vào SessionStorage ở <NavBar/>.
            setCurrentUser(values)
            message.success('Update profile successfully!')
        } catch (error) {
            if (error instanceof Error) {
                message.error('Error Submit !')
            }
        } finally {
            setLoading(false);
        }
    }
    const validFormValues = (values) => {
        if (values.yearsOfExp >= values.age) {
            return message.error('Years Of experience is invalid! please check again!');
        }
    }
    // console.log("formData", formData.age)
    return (
        <Form form={form} name="validateOnly" layout="row" autoComplete="off" variant="filled" onFinish={handleSubmit} >
            <Form.Item name='email' label="Email" rules={[{ required: true },]} initialValue={profile.email}>
                <Input disabled />
            </Form.Item>
            <Form.Item name="displayName" validateTrigger="onBlur" hasFeedback label="Display Name" rules={[{ required: true, message: 'Please input your display name!' },]} initialValue={profile.displayName} >
                <Input name="displayName" />
            </Form.Item>
            <Form.Item name="gender" label="Gender" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: "Please input your gender!" },]} initialValue={profile.gender} >
                <Select name="gender" >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name='age' label="Age" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: 'Please input your age!', type: "number", min: 0, max: 99 }]} initialValue={profile.age}>
                <InputNumber name="age" className="w-full" />
            </Form.Item>
            {ptRole && <Form.Item name="yearsOfExp" label="Year of Experiences" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: 'Please input your yearsOfExpe!', type: "number", min: 0, max: 99 },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('age') > value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Years of experience Invalid!'));
                },
            }),]} initialValue={profile.yearsOfExp}>
                <InputNumber name="yearsOfExp" className="w-full" />
            </Form.Item>}
            {
                ptRole && <Form.Item name="field" label="Field" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: 'Please input your field!', },]} initialValue={profile.field}>
                    <Select name="field" >
                        <Select.Option value="gym">Gym</Select.Option>
                        <Select.Option value="yoga">Yoga</Select.Option>
                        <Select.Option value="aerobics">Aerobics</Select.Option>
                        <Select.Option value="basketball">Basketball</Select.Option>
                        <Select.Option value="taekwondo">Taekwondo</Select.Option>
                        <Select.Option value="boxing">Boxing</Select.Option>
                    </Select>
                </Form.Item>
            }
            <Form.Item name="phoneNumber" label="Phone Number" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: 'Please input your phone!', },]} initialValue={profile.phoneNumber}>
                <Input name="phoneNumber" />
            </Form.Item>
            <Form.Item name="address" label="Address" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: 'Please input your address!', },]} initialValue={profile.address}>
                <Input name="address" />
            </Form.Item>
            {
                ptRole && <Form.Item name="price" label="Price" validateTrigger="onBlur" hasFeedback rules={[{ required: true, message: 'Please input your price!', },]} initialValue={profile.price}>
                    <Input name="price" />
                </Form.Item>
            }
            <Form.Item className="flex justify-center ">
                <Button className="rounded-3xl px-20  bg-blue-400 text-white" htmlType="submit" type="primary" loading={loading} disabled={disabledBtn}>Save</Button>
            </Form.Item>
        </Form >
    );
});