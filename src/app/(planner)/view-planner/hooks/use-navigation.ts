export const useNavigation = () => {
  const scrollToDay = (dayIndex: number) => {
    document
      .getElementById(`day-${dayIndex}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  return { scrollToDay };
};