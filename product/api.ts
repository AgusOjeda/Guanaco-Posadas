/* eslint-disable import/no-anonymous-default-export */
import { Product } from "./types";
import axios from "axios";
import Papa from "papaparse";
export default {
	list: async (): Promise<Product[]> => {
		return axios
			.get(
				"https://docs.google.com/spreadsheets/d/e/2PACX-1vQv66NmjDa5rHkKlk2PBYNozjy65xxHkt8neonseLcf9DfNV2RET8Ni4KO1tXk47-BAnCxcJWNefUS1/pub?output=csv",
				{
					responseType: "blob",
				}
			)
			.then((response) => {
				return new Promise<Product[]>((resolve, reject) => {
					Papa.parse(response.data, {
						header: true,
						complete: (results) => {
							const products = results.data as Product[];
							resolve(products.map(product => ({
								...product,
								price: Number(product.price)
							})));
						},
						error: (error) => reject(error.message),
					});
				});
			});
	},
};
