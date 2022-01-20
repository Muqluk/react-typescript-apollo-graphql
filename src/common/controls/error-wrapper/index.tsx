/*
  eslint-disable
    class-methods-use-this,
*/
import React from 'react';
import styles from './error-wrapper.styles';

type TState = {
  hasError: boolean;
  error: Error | Error[] | null;
  errorInfo: any | any;
  showUnwind: boolean;
  showStack: boolean;
};

type TProps = {
  children: any; // React.ReactNode;
  displayInWrapper?: boolean;
};

const getParentInfo = (component: any) => {
  const { _owner } = component;
  if (_owner) {
    return {
      name: _owner.type.name,
      component: _owner,
    };
  }
  return null;
};

export default class ErrorWrapper extends React.Component<TProps, TState> {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
    showUnwind: false,
    showStack: false,
  };

  componentDidCatch(error: Error, info: any) {
    // Display fallback UI
    this.setState({ hasError: true, error, errorInfo: info });
    // send the error to the logging service.
    // this.logToApi(error, info);
  }

  // logToApi(err: Error) {
  //  consider refactoring to use a dispatch({action typeof}_FAILED)
  //  ErrApi.logError(err);
  // }

  userFriendlyDisplay() {
    return (
      <div>
        <div>Unexpected Error encountered.</div>
        <div>Please contact support.</div>
      </div>
    );
  }

  displayInWrapper(errMsg: string, errInfo: any) {
    const messageArr = errMsg.split('\n');
    const { showUnwind, showStack } = this.state;
    const { children } = this.props;
    const showUnwindStyle = !showUnwind ? { display: 'none' } : {};
    const showStackStyle = !showStack ? { display: 'none' } : {};
    const displayStack = errInfo.componentStack
      .split('\n').slice(0, 15)
      .filter((line: any) => line.length > 0)
      .map((line: any) => (`${line}\n`));

    if (children && children.type && children.type.name) {
      const errSrc = {
        component: children,
        name: children && children.type && children.type.name
          ? children.type.name.replace('$$1', '')
          : 'NAME_NOT_ACCESSIBLE',
      };

      const parent = getParentInfo(errSrc.component);

      return (
        <div style={{ overflow: 'auto' }}>
          {/* <div style={styles.title}>{messageArr[0]}</div> */}
          <div>{messageArr[0]}</div>
          <div style={styles.preContainer}>
            <pre style={{ ...styles.pre, fontSize: '14px', color: 'darkblue' }}>
              {messageArr[1]}
            </pre>
          </div>
          <div onClick={() => this.setState({ showUnwind: !showUnwind })}>
            Component trace
          </div>
          <div style={{ ...styles.preContainer, ...showUnwindStyle }}>
            <pre style={{ ...styles.componentUnwind, ...styles.pre }}>
              {`<${parent?.name}>\n`}
              {`   <${errSrc.name}/>\n`}
              {`<${parent?.name}>`}
            </pre>
          </div>
          <div onClick={() => this.setState({ showStack: !showStack })}>
            Stack trace:
          </div>
          <div style={{ ...styles.preContainer, ...showStackStyle }}>
            <pre>{displayStack}</pre>
          </div>
        </div>
      );
    }
    return (
      <div style={{ overflow: 'auto' }}>
        {/* <div style={styles.title}>{messageArr[0]}</div> */}
        <div>{messageArr[0]}</div>
        <div style={styles.preContainer}>
          <pre style={{ ...styles.pre, fontSize: '14px', color: 'darkblue' }}>
            {messageArr[1]}
          </pre>
        </div>
        <div onClick={() => this.setState({ showUnwind: !showUnwind })}>
          Component trace
        </div>
        <div style={{ ...styles.preContainer, ...showUnwindStyle }}>
          Component info not available.
        </div>
        <div onClick={() => this.setState({ showStack: !showStack })}>
          Stack trace:
        </div>
        <div style={{ ...styles.preContainer, ...showStackStyle }}>
          <pre>{displayStack}</pre>
        </div>
      </div>
    );
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, displayInWrapper } = this.props;

    if (hasError) {
      const errMsg = error ? error['message'] : ''; // eslint-disable-line
      const errInfo = errorInfo;
      // You can render any custom fallback UI
      return displayInWrapper
        ? this.displayInWrapper(errMsg, errInfo)
        : this.userFriendlyDisplay();
    }
    return children;
  }
}
