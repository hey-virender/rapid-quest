// hooks/useAxios.js
import { useState, useCallback } from "react";
import axios from "axios";

export default function useAxios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [instance]);

  return { request, loading, error, data };
}
