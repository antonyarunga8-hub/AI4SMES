import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('AI4SMEs ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0A0E17] flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Icon */}
            <div className="mx-auto w-20 h-20 rounded-2xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            {/* Message */}
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Something went wrong
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                The AI4SMEs Business OS encountered an unexpected error. 
                Your data is safely stored locally. Please try refreshing.
              </p>
            </div>

            {/* Error details (collapsible) */}
            {this.state.error && (
              <details className="text-left bg-slate-100 dark:bg-slate-900/80 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <summary className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                  Technical Details
                </summary>
                <pre className="mt-2 text-[10px] text-red-600 dark:text-red-400 overflow-auto max-h-32 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                Reload App
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>

            {/* Branding */}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              AI4SMEs Africa • Pan-African Business Operating System
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
