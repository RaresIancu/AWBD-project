import axiosClient from './axiosClient'

export const getProducts = async function (
    page,
    size,
    search,
    sortBy,
    direction
) {
    const params = {
        page: page,
        size: size,
        sortBy: sortBy,
        direction: direction,
    }

    if (search && search.trim() !== '') {
        params.search = search
    }

    const response = await axiosClient.get('/products', {
        params: params,
    })

    return response.data
}