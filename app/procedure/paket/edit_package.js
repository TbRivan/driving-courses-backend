const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL edit_package(?, ?, ?, ?, ?, ?, ?)", [
      data.id_package,
      data.name_package,
      data.description,
      data.time_package,
      data.type_car,
      data.price,
      data.updatedBy,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Edit Package: ${error}`);
    return false;
  }
};
