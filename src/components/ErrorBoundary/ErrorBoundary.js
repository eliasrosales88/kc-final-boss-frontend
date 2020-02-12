import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error.message);
    console.log(error.stack);
    console.log(errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <React.Fragment>
          <Container>
            <main className="Home">
              <h1>Se ha producido un error incontrolado en la aplicación.</h1>
              <h2>Contacte con el administrador de la app.</h2>
            </main>
          </Container>
        </React.Fragment>
      );
    } else {
      return this.props.children;
    }
  }
}
