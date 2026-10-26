import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CompareContext = createContext(null);

const STORAGE_KEY = "aurelia_compare";

const MAX_COMPARE = 3;

const getInitialCompare = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CompareProvider = ({ children }) => {
  const [compareIds, setCompareIds] = useState(
    getInitialCompare
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(compareIds)
    );
  }, [compareIds]);

  const isCompared = (id) => compareIds.includes(id);

  const toggleCompare = (id) => {
    const numericId = Number(id);

    if (compareIds.includes(numericId)) {
      setCompareIds((previous) =>
        previous.filter((item) => item !== numericId)
      );

      return;
    }

    if (compareIds.length >= MAX_COMPARE) {
      return;
    }

    setCompareIds((previous) => [
      ...previous,
      numericId,
    ]);
  };

  const removeCompare = (id) => {
    setCompareIds((previous) =>
      previous.filter((item) => item !== Number(id))
    );
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        compareCount: compareIds.length,
        maxCompare: MAX_COMPARE,
        isCompared,
        toggleCompare,
        removeCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
};