import { IProduct } from '@/common/types/product'
import instance from '@/configs/axios'
import { AxiosResponse } from 'axios'
// import { IProduct } from '@/common/types/product'
// const userDataString = localStorage.getItem('user');
// let token = '';
// if (userDataString) {
//     try {
//         const userData = JSON.parse(userDataString);
//         token = userData.token || '';
//     } catch (error) {
//         console.error('Không thể phân tích dữ liệu từ localStorage:', error);
//     }
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProducts = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get('/products', { params })
        return response // []
    } catch (error) {
        return {
            data: [],
            status: 500,
            statusText: 'error',
            config: {} as any,
            headers: {} as any,
            request: {} as any,
        }
    }
}
// export const getProductById = async (id: number | string) => {
//     try {
//         const response = await instance.get(`/products/${id}`)
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }
export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products`, product, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        })
        return response.data
    } catch (error) {
        throw new Error('Error adding product');
    }
}
export const removeProduct = async (product: IProduct): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.delete(`/products/${product.id}/123`, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        })
        return response
    } catch (error: any) {
        throw new Error('Error deleting product');
    }
}
export const editProduct = async (product: IProduct) => {
    try {
        const response = await instance.put(`/products/${product.id}`, product, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer " + token ? token : ''
            // },
        })
        return response
    } catch (error) {
        throw new Error('Không kết nối được API. Vui lòng thử lại sau!')
    }
}

