import { useState } from "react";
import { debounce, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debounceSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <TextField
      value={searchTerm || ""}
      label="Search products"
      variant="outlined"
      fullWidth
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debounceSearch(event);
      }}
    />
  );
}
