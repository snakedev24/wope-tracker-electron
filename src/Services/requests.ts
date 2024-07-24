// const API_URL = process.env.REACT_APP_API_URL
const API_URL = "http://localhost:8000"
// const API_URL = "https://96b9-2405-201-5004-784e-1cfb-db04-1e9a-b594.ngrok-free.app/api"

export async function get(Uri) {
  try {
    const response = await fetch(`${API_URL}${Uri}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // if(response.status === 200){
    return response;
    // } 
  }
  catch (error) {
    console.log(error, "erorr")
  }
};

export async function post(Uri, fdata) {
  try {
    const response = await fetch(`${API_URL}${Uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(fdata)
    });

    return response;
  }
  catch (error) {
    console.log(error, "erorr")
  }
};
  