const moment = require("moment");
const formatDateIso = "YYYY-MM-DD";

module.exports = {
  verifyDate: (date) => {
    const inputDate = moment(date, formatDateIso);
    const currentDate = moment().format(formatDateIso);

    if (inputDate.day() === 0) {
      return false;
    }

    const maxAllowedDate = moment().add(4, "days").format(formatDateIso);

    if (
      inputDate.isSameOrAfter(currentDate) &&
      inputDate.isSameOrBefore(maxAllowedDate)
    ) {
      return true;
    } else {
      return false;
    }
  },
};
