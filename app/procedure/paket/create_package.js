const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL create_package(?, ?, ?, ?, ?, ?)", [
      data.name_package,
      data.description,
      data.time_package,
      data.type_car,
      data.price,
      data.createdBy,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Create Package: ${error}`);
    return false;
  }
};
