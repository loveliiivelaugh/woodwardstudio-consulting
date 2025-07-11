import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { encode } from 'js-base64';

const { VITE_WORDPRESS_URL }: any = import.meta.env;
// const authHeader = 'Basic ' + encode(WORDPRESS_BASIC as string);
const wordpressClient = axios.create({
    baseURL: VITE_WORDPRESS_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': authHeader,
    }
});

const useWordpressCategoriesQuery = () => {
    const wordpressCategoriesQuery = useQuery({
        queryKey: ["wordpressCategories"],
        queryFn: () => wordpressClient.get("/wp-json/wp/v2/categories"),
    })
    // const wordpressCategories = wordpressCategoriesQuery.data;
    return wordpressCategoriesQuery;
}



export { wordpressClient, useWordpressCategoriesQuery };