// src/hooks/useDataManagement.js
import { useEffect, useState } from "react";
import ComAttApi from "../api";

/**
 * Custom hook for managing data with common CRUD operations.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string} [params.idKey="id"] - The key used to identify items by ID.
 * @param {string} params.endpoint - The API endpoint to perform operations on.
 * @returns {Object} The data management functions and state.
 */

const useDataManagement = ({ idKey = "id", endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    messages: "",
    type: "success",
    title: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await ComAttApi.getAll(endpoint);
        setData(fetchedData);
      } catch (error) {
        console.log(error);
        setAlert({
          visible: true,
          messages: [`There was an error fetching the data: ${error.message}`],
          type: "danger",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addItem = async (item) => {
    try {
      setLoading(true);
      const newItem = await ComAttApi.create(endpoint, item);
      setData((prevData) => [...prevData, newItem]);

      setAlert({
        visible: true,
        messages: [`Item added successfully.`],
        type: "success",
        title: "Success",
      });
    } catch (error) {
      setAlert({
        visible: true,
        messages: error,
        type: "danger",
        title: "Oh snap! You got an error!",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);
      await ComAttApi.remove(endpoint, id);
      setData((prevData) => prevData.filter((item) => item[idKey] !== id));
      setAlert({
        visible: true,
        messages: [`Item removed successfully.`],
        type: "info",
        title: "Info",
      });
    } catch (error) {
      setAlert({
        visible: true,
        messages: [`There was an error removing the item: ${error.message}`],
        type: "danger",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setAlert({
      ...alert,
      visible: false,
    });
  };

  return {
    data,
    setData,
    addItem,
    removeItem,
    setLoading,
    loading,
    alert,
    closeAlert,
    setAlert,
  };
};

export default useDataManagement;
