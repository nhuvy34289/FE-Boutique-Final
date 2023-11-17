import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { Handles, Rail, Slider, Tracks } from "react-compound-slider";
import { useDispatch } from "react-redux";
import { filterProductByPrice } from "../../productSlice";
import {
  MuiHandle,
  MuiRail,
  MuiTrack,
} from "../RangSliderComponents/RangSliderComponents";
const RangSlider = () => {
  const dispatch = useDispatch();
  const initialValues = [0, 1500000];
  const [values, setValues] = useState([...initialValues]);
  const [update, setUpdate] = useState([...initialValues]);

  const onUpdate = (value) => {
    setUpdate(value);
  };

  const handleSortProduct = () => {
    dispatch(filterProductByPrice(update));
    setValues([...initialValues]);
    setUpdate([...initialValues]);
  };

  return (
    <>
      <Grid item xs={12}>
        <div className="py-2 px-4 bg-dark text-white mb-3">
          <strong className="small text-uppercase font-weight-bold">
            Price
          </strong>
        </div>
        <div style={{ marginBottom: "40px" }}>
          <Slider
            mode={2}
            step={100000}
            domain={initialValues}
            rootStyle={{
              position: "relative",
              width: "100%",
              marginBottom: "30px",
            }}
            onUpdate={onUpdate}
            values={values}
          >
            <Rail>
              {({ getRailProps }) => <MuiRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map((handle) => (
                    <MuiHandle
                      key={handle.id}
                      handle={handle}
                      domain={initialValues}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <MuiTrack
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </div>

        <Typography
          className="d-flex justify-content-center mb-3 mt-3"
          style={{ gap: "0 15px" }}
        >
          <span>
            {update[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
          <span>-</span>
          <span>
            {update[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </Typography>

        <button
          className="btn btn-sm btn-dark d-block w-100 mb-4"
          onClick={handleSortProduct}
        >
          Submit
        </button>
      </Grid>
    </>
  );
};

export default RangSlider;
