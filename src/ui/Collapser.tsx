import React, { useState, useMemo, useCallback, FunctionComponent } from 'react';

type Props = {
  value: any,
  renderHeader: (value: any) => React.ReactNode,
  children: (a: any) => React.ReactNode,
};

const useCollapse = (renderHeader: (value: any) => React.ReactNode, value: any) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleSwitch = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  const header = useMemo(() => {
    return (
      <thead onClick={handleSwitch}>
        {renderHeader(value)}
      </thead>
    );
  }, [handleSwitch]);

  return { header, collapsed };
};

export const Collapser: FunctionComponent<Props> = ({ renderHeader, value, children }) => {
  const { collapsed, header } = useCollapse(renderHeader, value);

  if (collapsed) {
    return (
      <>
        {header}
      </>
    );
  }

  return (
    <>
      {header}
      {children(value)}
    </>
  );
};
