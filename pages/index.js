import "./index.scss";
import Layout from "../containers/Layout";
import axios from "axios";
import Error from "./_error";

class Index extends React.Component {
  static async getInitialProps() {
    let response, statusCode, data_json;
    try {
      response = await axios.get("https://jsonplaceholder.typicode.com/users");
      statusCode = response.status > 200 ? response.status : false;
      data_json = await response.data;
    } catch (error) {
      return { data: [], statusCode };
    }

    return { data: data_json, statusCode };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("Service  worker registration successul", registration);
        })
        .catch(error => {
          console.warn("service worker registration fail", error);
        });
    }
  }

  render() {
    const { data, statusCode } = this.props;
    if (statusCode) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <Layout statusCode={statusCode} title="sahmwanga">
        <div>
          <div>
            {data.map(user => (
              <div key={user.id}>
                <h2>
                  {user.id} - {user.username}
                </h2>
                <p className="text-muted">{JSON.stringify(user.address)}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Index;
