import Layout from "../containers/Layout";
import { LoginUser } from "../lib/auth";
import Router from "next/router";

class LoginForm extends React.Component {
  state = {
    email: "Shanna@melissa.tv",
    password: "anastasia.net",
    error: "",
    isLoading: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showError = err => {
    console.log(err.response);
    const error = (err.response && err.response.data) || err.message;
    this.setState({
      error,
      isLoading: false
    });
  };

  render() {
    const { email, password, error, isLoading } = this.state;
    return (
      <Layout>
        <div className="card mt-5">
          <div className="card-body">
            <h3 className="card-title">Login Form</h3>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.setState({ error: "", isLoading: true });
                LoginUser(email, password)
                  .then(() => {
                    Router.push("/profile");
                  })
                  .catch(this.showError);
              }}
            >
              <div className="">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="form-control"
                    placeholder="password"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary"
                >
                  {isLoading ? "Sending..." : "Login"}
                </button>
              </div>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </Layout>
    );
  }
}

export default LoginForm;
