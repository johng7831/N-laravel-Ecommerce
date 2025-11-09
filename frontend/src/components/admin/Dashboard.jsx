import React, { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

const Dashboard = () => {
  const { logout } = useContext(AdminAuthContext);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <ul>
            <li>
                <a  href ="#">DashBoard</a>        
            </li>
            <li>
                <a  href ="#">categories</a>  
            </li>
            <li>    
                <a  href ="#">Brands</a>  
            </li>

              <li>    
                <a  href ="#">Produtcs</a>  
            </li>
             <li>    
                <a  href ="#">Orders</a>  
            </li>
             <li>    
                <a  href ="#">Uers</a>  
            </li>
               <li>    
                <a  href ="#">Shipping</a>  
            </li>
                <li>    
                 <a  href ="#">Change Speed</a> 
            </li>
            <li>
                <a  href ="#">logout</a>
            </li>

        </ul>
        <div class ="card-show">
            <div class="card-single">
                  <div class="card-single">
                <div>
                    <h1>0</h1>
                    <span>Users</span>
                </div>
            </div>
                <div>
                    <h1>0</h1>
                    <span>Products</span>
                </div>
            </div>

            <div class="card-single">
                <div>
                    <h1>0</h1>
                    <span>Orders</span>
                </div>
            </div>

          


        </div>



      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
