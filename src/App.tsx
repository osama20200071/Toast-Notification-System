import { Provider } from "react-redux";
import ToastList from "../components/Toast/ToastList";
import CreateToast from "../components/Toast/CreateToast";
import { store } from "../store/store";

function App() {
  return (
    <Provider store={store}>
      <main>
        <CreateToast />
        <ToastList />
      </main>
    </Provider>
  );
}

export default App;
