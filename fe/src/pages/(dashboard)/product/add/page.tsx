import instance from "@/configs/axios";
import { BackwardFilled, PlusCircleFilled } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
    name?: string;
    price?: number;
    description?: string;
    imageUrl?: File;
};

const ProductPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const { mutate } = useMutation({
        mutationFn: async (product: FieldType) => {
            try {
                return await instance.post("/products");
            } catch (error) {
                throw new Error("Them san pham that bai");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Them san pham thanh cong",
            });
            form.resetFields();
        },
        onError: (error) => {
            messageApi.open({
                type: "success",
                content: error.message,
            });
        },
    });
    const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
        console.log("Success:", values);
        mutate(values);
    };
    return (
        <div>
            {contextHolder}
            <div className="flex item-center justify-between mb-5">
                <h1 className="text-2xl">Thêm sản phẩm</h1>
                <Button type="primary">
                    <Link to={"/admin/products"}>
                        <BackwardFilled />
                        Quay lại
                    </Link>
                </Button>
            </div>
            <div className="max-w-4xl mx-auto">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 688 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền tên sản phẩm",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        name="imageUrl"
                        valuePropName="file"
                        getValueFromEvent={(e) =>
                            Array.isArray(e) ? e : e?.file
                        }
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn hình ảnh sản phẩm",
                            },
                        ]}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button>Chọn hình ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Gia sản phẩm"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền gia sản phẩm",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mô tả sản phẩm" name="description">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusCircleFilled />}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProductPage;
