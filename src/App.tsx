import { Admin, Resource } from 'react-admin';
import authProvider from './authProvider';
// import dataProvider from './dataProvider';
// import { UserCreate, UserEdit, UserList, UserShow } from "./users";

const App = () => {

  return (
    <Admin
      authProvider={authProvider}
      // dataProvider={dataProvider as any}
    >
      <Resource
        name="users"
        // list={UserList}
        // show={UserShow}
        // edit={UserEdit}
        // create={UserCreate}
      />
    </Admin>
  );
}

export default App;
