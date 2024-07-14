import { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import

const useAdminData = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            const token = localStorage.getItem("adminToken");
            if (token) {
                const { admin_id, role } = jwtDecode(token);

                const url = `http://127.0.0.1:8000/admin/${admin_id}/${role}`;

                try {
                    const response = await axios.get(url);
                    if (response.status === 200) {
                        setAdminData(response.data);
                    } else {
                        console.log("Error fetching data");
                        setError("Error fetching data");
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    return { adminData, loading, error };
};

export default useAdminData;
