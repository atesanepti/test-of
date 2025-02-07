

const fetchData = async <T>(url: string, options?: RequestInit) : Promise<T>=> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw Error;
    }
    const result = response.json();
    return result;
  } catch (error: unknown) {
    throw error;
  }
};

export default fetchData;
