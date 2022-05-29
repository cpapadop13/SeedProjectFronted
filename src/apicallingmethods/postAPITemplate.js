import axios from "axios";

export default async (params) => {
  try {
    const url = "http://localhost:9001/" + params.url;

    const res = await axios.post(url, params);

    if (res && res.data) {
      if (res.data.responsecode && res.data.responsecode === 1) {
        if (params.showMessage === "S") return res.data.data;
      } else if (res.data.responsecode && res.data.responsecode === 0) {
        if (params.showMessage === "S") return res.data.data;
      }
    } else {
      console.log("Something went Wrong,Try Again!");
    }
  } catch (err) {
    console.log(err);
  }
};
