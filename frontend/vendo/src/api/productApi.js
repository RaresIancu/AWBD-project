import axiosClient from './axiosClient'

export const getProducts = async function (
    page,
    size,
    search,
    sortBy,
    direction
) {
    const response = await axiosClient.get('/products', {
        params: {
            page: page,
            size: size,
            search: search,
            sortBy: sortBy,
            direction: direction,
        },
    })

    return response.data
}