/* eslint-disable react/no-direct-mutation-state */
import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ErrorBoundaryText, ErrorBoundaryWrapper } from "./errorBoundary.styled";
import { Button } from "@/components/button/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  resetError = () => {
    this.state = { hasError: false };
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryWrapper>
          <ErrorBoundaryText>Ooops. Something went wrong.</ErrorBoundaryText>
          <Button onClick={this.resetError}>
            <Link to="/">Go back home page</Link>
          </Button>
        </ErrorBoundaryWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
