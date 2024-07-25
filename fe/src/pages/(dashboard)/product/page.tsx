import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import useMessage from "antd/es/message/useMessage";
import { Link } from "react-router-dom";

const ProductPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                return await instance.get(`/products`);
            } catch (error) {
                throw new Error("Call API that bai");
            }
        },
    });
    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            try {
                return await instance.delete(`/products/${id}`);
            } catch (error) {
                throw new Error("Xoa san pham that bai");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "San pham duoc xoa thanh cong",
            });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            messageApi.open({
                type: "success",
                content: error.message,
            })
        },
    });
    const dataSource = data?.data.map((product: IProduct) => ({
        key: product.id,
        ...product,
    }));
    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "imageUrl", // Adjust to match your actual field name
            key: "imageUrl",
            render: (text: string) => (
                <img
                    src={text}      
                    alt="product"
                    style={{ width: 50, height: 50 }}
                />
            ),
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            key: "action",
            render: (_: any, product: IProduct) => {
                return (
                    <div className="flex gap-2">
                        <Popconfirm
                            title="Xoa san pham"
                            description="Ban co chac chan muon xoa khong?"
                            onConfirm={() => mutate(product.id!)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                        <Button>
                            <Link to={`/admin/products/${product.id}/edit`}>
                                Cap nhat
                            </Link>
                        </Button>
                    </div>
                );
            },
        },
    ];
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {contextHolder}
            <div className="flex item-center justify-between mb-5">
                <h1 className="text-2xl">Quản lý sản phẩm</h1>
                <Button type="primary">
                    <Link to={"/admin/products/add"}>
                        <PlusCircleFilled />
                        Thêm sản phẩm
                    </Link>
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default ProductPage;
