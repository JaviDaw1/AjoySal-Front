import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function Recipes() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await AuthService.isUserAdmin();
      setIsAdmin(adminStatus);
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin !== null) {
      if (isAdmin) {
        navigate('/recipeadmin');
      } else {
        navigate('/recipeclient');
      }
    }
  }, [isAdmin, navigate]);

  return null;
}

export default Recipes;
