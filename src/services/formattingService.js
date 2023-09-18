export const formattingService = {
  parseCurrency: (input) => {
    const nums = input.replace(/(,|\$|\s)/g, "").trim();
    if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
    return nums === "" ? null : Number.NaN;
  },
  formatCurrency: (value) => {
    if (value === null) return "";
    return `$ ${value.toLocaleString("en-US")}`;
  },
  formatTime: (hour) => {
    if (hour > 12) {
      return hour - 12;
    } else return hour;
  },
};
