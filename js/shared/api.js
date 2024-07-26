const base_url = "https://dummyjson.com";

export async function handleRemoteRequest(
  endPoint,
  success,
  error,
  startLoading,
  stopLoading
) {
  startLoading();
  try {
    const res = await fetch(`${base_url}/${endPoint}`);
    if (res.ok) {
      const data = await res.json();
      success(data);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    error(err);
    console.log(err);
  } finally {
    stopLoading();
  }
}

export const handleRemoteRequestPromise = (
  endPoint,
  startLoading,
  stopLoading
) => {
  return new Promise((resolve, reject) => {
    handleRemoteRequest(endPoint, resolve, reject, startLoading, stopLoading);
  });
};
