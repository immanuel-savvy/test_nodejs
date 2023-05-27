import GDS from "generalised-datastore";

let gds, USERS;

const ds_conn = () => {
  gds = new GDS("test_nodejs").sync();

  USERS = gds.folder("users");

  console.log("Datastore is running...");
};

export default ds_conn;
export { gds, USERS };
