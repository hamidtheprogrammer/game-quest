import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  AddProduct,
  DisplayUsers,
  GetProducts,
  Logout,
  adminNav,
  useAuthUI,
  UpdateProduct,
} from "../constants/Imports";
import { useMutation } from "react-query";
import * as adminApi from "../apiClient/adminApi";
import { customError } from "../apiClient/authApi";

const AdminDasboard: React.FC = () => {
  const [tab, setTab] = useState("users");
  const navigate = useNavigate();
  const { currentUser } = useAuthUI();
  const [users, setUsers] = useState([]);
  const [updateProductId, setUpdateProductId] = useState<string>("");

  const mutation = useMutation({
    mutationFn: adminApi.getAllusers,
    onSuccess: (data) => {
      setUsers(data);
    },
    onError: (error: customError) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (tab === "users") {
      mutation.mutate();
    }
  }, [tab]);
  return (
    <div className="flxBtw px-3 pt-8 header-margin">
      <section className="flxColStart px-5 border-[1px] rounded-lg border-black/30 pb-5">
        <h1 className="flxColStart py-6 gap-2">
          <span className="border-b-2 highlightBorderCol">Dashboard</span>
          <span className="font-[530] text-sm mt-5">
            Welcome, {currentUser?.username}
          </span>
          <Logout />
        </h1>
        <ul className="flxColStart gap-3">
          {adminNav.map((nav) => (
            <li
              onClick={() => {
                setTab(nav.tab);
              }}
              className={`text-sm pr-2 w-full cursor-pointer ${
                tab === nav.tab && "border-r-2 highlightBorderCol"
              }`}
              key={nav.name}
            >
              {nav.name}
            </li>
          ))}
        </ul>
      </section>
      <section className="w-[80%] border-[1px] rounded-lg border-black/30 px-4 pb-5">
        {tab === "users" ? (
          <DisplayUsers users={users} />
        ) : tab === "add-product" ? (
          <AddProduct />
        ) : tab === "get-products" ? (
          <GetProducts
            click={(productId: string) => {
              setUpdateProductId(productId);
              setTab("update-product");
            }}
          />
        ) : (
          tab === "update-product" && (
            <UpdateProduct productId={updateProductId} />
          )
        )}
      </section>
    </div>
  );
};

export default AdminDasboard;
