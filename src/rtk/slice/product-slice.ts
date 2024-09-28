import { createSlice } from "@reduxjs/toolkit";
import { CreateProductDto } from "../../dtos/request/product/create-product.request";

const initialState: CreateProductDto = {
    productName: '',
    regularPrice: 0,
    shopId: '',
    categories: [],
    brandId: '',
    city: '',
    thumbnailIndex: 0,
    images: [],
    attributesDto: [],
    variantsDto: [],
    description: '',
    tag: [],
}
export const createProductSlice = createSlice({
    name: 'createProduct',
    initialState,
    reducers: {
        setProductName: (state, action) => {
            state.productName = action.payload;
        },
        setRegularPrice: (state, action) => {
            state.regularPrice = action.payload;
        },
        setShopId: (state, action) => {
            state.shopId = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setBrandId: (state, action) => {
            state.brandId = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setThumbnailIndex: (state, action) => {
            state.thumbnailIndex = action.payload;
        },
        addImage: (state, action) => {
            state.images.push(action.payload);
        },
        setVideo: (state, action) => {
            state.video = action.payload;
        },
        addAttributeDto: (state, action) => {
            state.attributesDto[action.payload.index]=(action.payload.data);
        },
        setAttributeValue:(state,action) =>{
            const index = state.attributesDto.findIndex(item => item.attributeName === action.payload.attributeName);
            if(index!== -1){
                state.attributesDto[index] = action.payload;
            }
        },
        addVariantDto: (state, action) => {
            state.variantsDto.push(action.payload);
        },
        addTag: (state, action) => {
            state.tag?.push(action.payload);
        },
        // Remove reducers
        removeImage: (state, action) => {
            state.images = state.images.filter((_, index) => index !== action.payload);
        },
        removeAttributeDto: (state, action) => {
            state.attributesDto = state.attributesDto.filter((_, index) => index !== action.payload);
        },
        removeVariantDto: (state, action) => {
            state.variantsDto = state.variantsDto.filter((_, index) => index !== action.payload);
        },
        removeTag: (state, action) => {
            state.tag = state.tag?.filter((_, index) => index !== action.payload);
        },
    }
})
export const { setProductName, setRegularPrice,
    setShopId, setCategories, setBrandId, setCity,
    setThumbnailIndex, addImage, setVideo, setAttributeValue,
    addAttributeDto, addVariantDto, addTag,
    removeImage, removeAttributeDto, removeVariantDto, removeTag } = createProductSlice.actions
export default createProductSlice.reducer;