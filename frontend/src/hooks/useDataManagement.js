// src/hooks/useDataManagement.js
import { useEffect, useState } from "react";

const useDataManagement = ({
  fetchFunction,
  createFunction,
  deleteFunction,
}) => {
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
        const fetchedData = await fetchFunction();
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
      const newItem = await createFunction(item);
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
      await deleteFunction(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setAlert({
        visible: true,
        messages: [`Item removed successfully.`],
        type: "success",
        title: "Success",
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
    addItem,
    removeItem,
    loading,
    alert,
    closeAlert,
  };
};

export default useDataManagement;
