import React, { useState, useMemo, useCallback, FunctionComponent } from 'react';

type Props = {
  renderHeader: () => React.ReactNode,
};

const useCollapse = (renderHeader: () => React.ReactNode) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleSwitch = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  const header = useMemo(() => {
    return (
      <tbody onClick={handleSwitch}>
        {renderHeader()}
      </tbody>
    );
  }, [handleSwitch]);

  return { header, collapsed };
};

export const Collapser: FunctionComponent<Props> = ({ renderHeader, children }) => {
  const { collapsed, header } = useCollapse(renderHeader);

  if (collapsed) {
    return (
      <>
        {header};
      </>
    );
  }

  return (
    <>
      {header}
      {children}
    </>
  );
};
