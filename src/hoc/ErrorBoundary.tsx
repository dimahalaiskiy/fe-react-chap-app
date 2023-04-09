import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryWrapper } from './styles/ErrorBoundary.styles';
import { Button } from '../components/button/Button';
import { Link } from 'react-router-dom';

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
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryWrapper>
          {/* <Typography>Something went wrong.</Typography> */}
          <Button>
            <Link to='/home'>Go back to the home page</Link>
          </Button>
        </ErrorBoundaryWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
