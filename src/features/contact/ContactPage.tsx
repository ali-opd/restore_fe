// import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Typography } from "@mui/material";
// import { CounterState, decrement, increment } from "./counterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { increment, decrement } from "./counterSlice";

export default function ContactPage() {
  // const { data, title } = useSelector((state: CounterState) => state);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">The data is: {data}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment(1))} color="primary">
          Increase data
        </Button>
        <Button onClick={() => dispatch(increment(10))} color="primary">
          Increase data
        </Button>
        <Button onClick={() => dispatch(decrement(1))} color="secondary">
          Decrease data
        </Button>
      </ButtonGroup>
    </>
  );
}
