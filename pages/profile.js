import Layout from "../containers/Layout";
import { getUserProfile } from "../lib/auth";

export default class Profile extends React.Component {
  state = { user: null };
  componentDidMount() {
    getUserProfile().then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <Layout>
        <h3 className="mt-5 text-center">User Profile</h3>
        <hr />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Layout>
    );
  }
}
