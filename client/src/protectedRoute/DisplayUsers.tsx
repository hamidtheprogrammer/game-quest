import React from "react";

interface IUsers {
  _id: string;
  username: string;
}

type DisplayUsersprops = {
  users: IUsers[];
};

const DisplayUsers: React.FC<DisplayUsersprops> = ({ users }) => {
  return (
    <section>
      <h1 className="flxColStart py-6 gap-2">All users</h1>
      {users.length ? (
        <>
          <div className="text-xs w-full flxRowStart px-5 mb-5">
            <span className="flex-1 ">index</span>
            <span className="flex-1 ">userId</span>
            <span className="flex-1 ">username</span>
          </div>
          <ul className="flxColStart gap-2">
            {users.map((user, index) => (
              <li
                className="text-xs w-full primaryBg text-white flxRowStart px-5"
                key={user._id}
              >
                <span className="flex-1 ">{index}</span>
                <span className="flex-1 ">{user._id}</span>
                <span className="flex-1 ">{user.username}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>No users found</div>
      )}
    </section>
  );
};

export default DisplayUsers;
