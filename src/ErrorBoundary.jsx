import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#222', color: '#ff4444', height: '100vh', fontFamily: 'monospace' }}>
          <h2>Application Crashed!</h2>
          <p>Please send this exact error to the AI:</p>
          <hr />
          <b style={{color: 'white'}}>{this.state.error && this.state.error.toString()}</b>
          <br /><br />
          <pre style={{ fontSize: '12px', color: '#ccc', whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <br />
          <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', background: 'white', color: 'black', border: 'none', cursor: 'pointer' }}>
              Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
