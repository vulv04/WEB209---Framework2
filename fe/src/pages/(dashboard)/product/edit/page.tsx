import instance from "@/configs/axios";
import { BackwardFilled, PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Link, useParams } from "react-router-dom";

type FieldType = {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
};

const ProductEditPage = () => {
    const { id } = useParams();
    console.log(id);
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            try {
                return await instance.get(`/products/${id}`);
            } catch (error) {
                throw new Error("Lay san pham that bai");
            }
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (product: FieldType) => {
            try {
                return await instance.put(`/products/${id}`, product);
            } catch (error) {
                throw new Error("Cap nhat san pham that bai");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Them san pham thanh cong",
            });
            queryClient.invalidateQueries({ queryKey: ["product"] });
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
                <h1 className="text-2xl">Cap nhat: {data?.data.name}</h1>
                <Button type="primary">
                    <Link to={"/admin/products"}>
                        <BackwardFilled />
                        Quay lại
                    </Link>
                </Button>
            </div>
            <div className="max-w-4xl mx-auto">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 688 }}
                    initialValues={{ ...data?.data }}
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
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ProductEditPage;
